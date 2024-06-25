import { Request, Response } from "express";

import { SseHeaders } from "../constants/headers.js";
import { ChatService } from "../services/chat.service.js";
import { ClientStream } from "../clients/types.js";

class ChatsController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * Private handlers
   */

  /**
   * Sets up the headers for the SSE response
   * @param res
   */
  private setupSseHeaders = (res: Response) => {
    Object.entries(SseHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.flushHeaders();
  };

  private handleStream = async (res: Response, stream: ClientStream) => {
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      res.write(content);
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
  };

  /**
   * End of private handlers
   */

  /**
   * POST: /chats
   * Sends a message to a chat session
   * @param req Express.Request
   * @param res Express.Response
   */

  public streamChat = async (req: Request, res: Response) => {
    {
      const { chatSessionId, message } = req.body;

      this.setupSseHeaders(res);
      const stream = await this.chatService.sendMessage(chatSessionId, message);
      this.handleStream(res, stream);
    }
  };

  public getChatHistory = async (req: Request, res: Response) => {
    const chatSessionId = req.params.chatSessionId;

    if (!chatSessionId) {
      res.status(400).send("Invalid chat session id");
      return;
    }

    const chatHistory = await this.chatService.getChatHistory(chatSessionId);

    if (!chatHistory) {
      res.json({
        room: chatSessionId,
        messages: [],
      });
      return;
    }

    res.json(chatHistory);
  };

  public getChatSessions = async (_: Request, res: Response) => {
    const chatSessions = await this.chatService.getChatSessions();
    res.json(chatSessions);
  };
}

export default ChatsController;
