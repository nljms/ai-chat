export type ChatMessage = {
  id?: string;
  user: 'user' | 'system';
  message: string;
  timestamp?: Date;
};

export type ChatHistory = {
  room: string;
  messages: ChatMessage[];
};
