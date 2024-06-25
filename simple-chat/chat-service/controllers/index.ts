import { groqChatService } from "../services/index.js";
import { default as ChatsController } from "./chats.controller.js";

export const chatsControllerInstance = new ChatsController(groqChatService);
