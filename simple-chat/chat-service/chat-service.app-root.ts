import express, { Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { rateLimit } from "express-rate-limit";

dotenv.config();

import { ChatService } from "./chat-service.js";
import { SseHeaders } from "./constants/headers.js";
import { redisClient, mongooseClient } from "./clients/index.js";
import { Message, eventEmitter } from "./events/messages.js";
import { ChatHistoryService } from "./services/chat-history.service.js";

export async function run() {
  const app = express();
  const chatService = ChatService.from();
  const port = process.env.PORT || 3000;

  await Promise.all(
    [redisClient, mongooseClient].map(async (client) => {
      await client.connect();
    })
  );

  const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 2 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  });

  app.use(express.json());
  app.use(cors());
  app.use(limiter);

  /**
   * learn more on the express docs:
   * https://expressjs.com/en/starter/hello-world.html
   */
  app.get("/", async (_, res: Response) => {
    const greeting = await chatService.getHello();
    res.send(greeting);
  });

  app.get("/health", (_, res: Response) => {
    res.send("OK");
  });

  app.get("/chat/:chatSessionId", async (req: Request, res: Response) => {
    const chatSessionId = req.params.chatSessionId;

    if (!chatSessionId) {
      res.status(400).send("Invalid chat session id");
      return;
    }

    const chatHistory = await ChatHistoryService.getChatHistory(chatSessionId);

    if (!chatHistory) {
      res.status(404).send("Chat history not found");
      return;
    }

    res.json(chatHistory);
  });

  /**
   * Establishes a server-sent event (SSE) connection with the client
   */
  app.post("/chat", async (req: Request, res: Response) => {
    const { chatSessionId, message } = req.body;

    Object.entries(SseHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    // flush the headers to establish SSE with client
    res.flushHeaders();

    eventEmitter.emit<Message>("receive_message", {
      chatSessionId,
      message: message,
      user: "user",
    });

    const stream = await chatService.sendMessage(
      chatSessionId,
      message as string
    );

    let words = "";

    for await (const chunk of stream) {
      words += chunk.choices[0]?.delta?.content ?? "";
      res.write(chunk.choices[0]?.delta?.content ?? "");
    }

    let timeoutId = setTimeout(() => {
      res.end(); // terminates SSE session
      return;
    }, 2000);

    res.on("close", () => {
      eventEmitter.emit("reply_message", {
        chatSessionId,
        message: words,
        user: "system",
      });
      clearTimeout(timeoutId);
      console.log("Connection closed");
      res.end();
    });
  });

  const server = app.listen(port, () => {
    console.log(`🚀  Server ready at: http://localhost:${port}`);
  });

  return {
    port,
    // implement stop to support HMR.
    stop: async () => {
      server.closeAllConnections();
      server.close();
    },
  };
}
