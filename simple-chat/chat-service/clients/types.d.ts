import { Stream } from "groq-sdk/lib/streaming";
import { Chat } from "groq-sdk/resources/index";

import { Stream as OpenAIStream } from "openai/streaming";
import { ChatCompletionChunk } from "openai/resources/index";

type ClientStream =
  | Stream<Chat.ChatCompletionChunk>
  | OpenAIStream<ChatCompletionChunk>;

export type AiClient = {
  stream: (message: string) => Promise<ClientStream>;
  getModels: () => Promise<string[]>;
};

export type Event = "receive_message" | "reply_message";

export type CacheMachine = {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<void>;
  getOrSet: (key: string, value: string) => Promise<string>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  on: (event: Event, callback: (message: T) => void) => void;
  emit: (event: Event, message: T) => void;
};

export type Storage = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};
