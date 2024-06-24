export type User = 'user' | 'system';

export type ChatMessage = {
  id?: string;
  user: User;
  message: string;
  timestamp?: Date;
};

export type ChatHistory = {
  room: string;
  messages: ChatMessage[];
};

export type ChatSession = {
  sessionId: string;
  message: string;
};
