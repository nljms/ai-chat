import { EventEmitter } from "events";
import { ChatHistoryService } from "../services/chat-history.service.js";

export type Message = {
  chatSessionId: string;
  message: string;
  user: string;
};
export const eventEmitter = new EventEmitter();

const messageHandler = async (message: Message) => {
  ChatHistoryService.saveMessage(message.chatSessionId, {
    user: message.user,
    message: message.message,
  });
};

eventEmitter.on<Message>("receive_message", messageHandler);

eventEmitter.on<Message>("reply_message", messageHandler);
