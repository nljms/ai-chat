import { ChatService } from "./chat.service.js";

export const groqChatService = ChatService.fromGroq();
export const openAiChatService = ChatService.fromOpenAI();
