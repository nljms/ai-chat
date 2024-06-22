import express, { Response, Request } from "express";
import dotenv from "dotenv";

dotenv.config();

import { ChatService } from "./chat-service.js";
import { SseHeaders } from "./constants/headers.js";

export function run() {
  const app = express();
  const chatService = ChatService.from();
  const port = process.env.PORT || 3000;

  /**
   * learn more on the express docs:
   * https://expressjs.com/en/starter/hello-world.html
   */
  app.get("/", async (_, res: Response) => {
    const greeting = await chatService.getHello();
    res.send(greeting);
  });

  /**
   * Establishes a server-sent event (SSE) connection with the client
   */
  app.get("/chat", async (req: Request, res: Response) => {
    Object.entries(SseHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    // flush the headers to establish SSE with client
    res.flushHeaders();

    const message = req.query.message ?? "";
    const stream = await chatService.sendMessage(message as string);

    for await (const chunk of stream) {
      res.write(chunk.choices[0]?.delta?.content ?? "");
    }

    let timeoutId = setTimeout(() => {
      res.end(); // terminates SSE session
      return;
    }, 2000);

    res.on("close", () => {
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
