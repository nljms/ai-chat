import express, { Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { rateLimit } from "express-rate-limit";

dotenv.config();

import { redisClient, mongooseClient } from "./clients/index.js";
import { chatsControllerInstance } from "./controllers/index.js";

export async function run() {
  const app = express();

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
    res.send({});
  });
  app.get("/health", (_, res: Response) => {
    res.send("OK");
  });
  app.get("/chats", chatsControllerInstance.getChatSessions);
  app.get("/chats/:chatSessionId", chatsControllerInstance.getChatHistory);

  /**
   * Establishes a server-sent event (SSE) connection with the client
   */
  app.post("/chat", chatsControllerInstance.streamChat);

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
