import { v4 as uuidV4 } from "uuid";

import { ChatHistoryModel } from "../models/chat-history.js";

export const ChatHistoryService = {
  async getChatHistory(sessionId: string) {
    return ChatHistoryModel.findOne({ room: sessionId });
  },

  async saveMessage(
    sessionId: string,
    message: {
      user: string;
      message: string;
    }
  ) {
    const chatHistory = await ChatHistoryModel.findOne({ room: sessionId });

    if (chatHistory) {
      chatHistory.messages.push({
        user: message.user,
        message: message.message.trim(),
        timestamp: new Date(),
        id: uuidV4(),
      });

      await chatHistory.save();
    } else {
      await ChatHistoryModel.create({
        room: sessionId,
        messages: [
          {
            id: uuidV4(),
            user: message.user,
            message: message.message.trim(),
            timestamp: new Date(),
          },
        ],
      });
    }
  },
};
