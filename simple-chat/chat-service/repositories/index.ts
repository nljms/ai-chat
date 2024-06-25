import { ChatHistoryModel } from "../models/chat-history.js";
import ChatRepo from "./chats.repository.js";

export const chatRepository = new ChatRepo(ChatHistoryModel);
