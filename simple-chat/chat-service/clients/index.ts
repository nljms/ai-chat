import { createClient } from "redis";

import GroqClient from "./groq.js";
import OpenAiClient from "./openai.js";
import RedisClient from "./redis.js";

export const groqClient = new GroqClient();
export const openAiClient = new OpenAiClient();
export const redisClient = new RedisClient(createClient());
