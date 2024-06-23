import { Schema, model } from "mongoose";

export type ChatHistory = {
  room: string;
  messages: [
    {
      id: string;
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
      id: String,
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

export default ChatHistorySchema;
