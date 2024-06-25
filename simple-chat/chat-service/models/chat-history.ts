import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

export type ChatHistory = {
  room: string;
  messages: [
    {
      id?: string;
      user: string;
      message: string;
      timestamp: Date;
    }
  ];
};

const ChatHistorySchema = new Schema<ChatHistory>({
  /**
   * Room id is the chat sesion id for the chat history
   */
  room: String,
  messages: [
    {
      id: {
        type: String,
        default: uuidV4,
      },
      user: String,
      message: String,
      timestamp: Date,
    },
  ],
});

ChatHistorySchema.index({ room: 1 });

ChatHistorySchema.pre("save", function (next) {
  this.messages = this.messages.sort((a, b) => {
    return a.timestamp.getTime() - b.timestamp.getTime();
  });
  next();
});

export const ChatHistoryModel = model<ChatHistory>(
  "ChatHistory",
  ChatHistorySchema
);

export type ChatHistoryModelType = typeof ChatHistoryModel;

export default ChatHistorySchema;
