import { ChatHistory, ChatHistoryModelType } from "../models/chat-history.js";

export type ChatRepository = {
  getChatHistory: (sessionId: string) => Promise<ChatHistory>;
  saveMessage: (
    sessionId: string,
    message: { user: string; message: string }
  ) => Promise<void>;

  saveMessages: (
    sessionId: string,
    message: { user: string; message: string }[]
  ) => Promise<void>;
  getChatSessions: () => Promise<{ sessionId: string; message: string }[]>;
};

class ChatRepo implements ChatRepository {
  constructor(private readonly model: ChatHistoryModelType) {}

  /**
   *
   * @param sessionId
   * @param message
   */
  async saveMessage(
    sessionId: string,
    message: { user: string; message: string }
  ) {
    const chatHistory = await this.model.findOne({ room: sessionId });

    if (chatHistory) {
      chatHistory.messages.push({
        user: message.user,
        message: message.message.trim(),
        timestamp: new Date(),
      });

      await chatHistory.save();
    } else {
      await this.model.create({
        room: sessionId,
        messages: [
          {
            user: message.user,
            message: message.message.trim(),
            timestamp: new Date(),
          },
        ],
      });
    }
  }

  /**
   *
   * @param sessionId
   * @param messages
   */
  async saveMessages(
    sessionId: string,
    messages: { user: string; message: string }[]
  ) {
    const chatHistory = await this.model.findOne({ room: sessionId });

    if (chatHistory) {
      chatHistory.messages.push(
        ...messages.map((message) => ({
          user: message.user,
          message: message.message.trim(),
          timestamp: new Date(),
        }))
      );

      await chatHistory.save();
    } else {
      await this.model.create({
        room: sessionId,
        messages: messages.map((message) => ({
          user: message.user,
          message: message.message.trim(),
          timestamp: new Date(),
        })),
      });
    }
  }

  /**
   * get all chats
   */
  async getChatHistory(sessionId: string) {
    return this.model.findOne({
      room: sessionId,
    });
  }

  /**
   * get all chat sessions
   */
  async getChatSessions() {
    const sessions = await this.model.find();

    return sessions.map((session) => ({
      sessionId: session.room,
      message: session.messages[0].message,
    }));
  }
}

export default ChatRepo;
