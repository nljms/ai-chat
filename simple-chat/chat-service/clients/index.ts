import { createClient } from "redis";

import GroqClient from "./groq.js";
import OpenAiClient from "./openai.js";
import RedisClient from "./redis.js";
import MongooseClient from "./mongoose.js";

export const redisClient = new RedisClient(createClient());
export const groqClient = new GroqClient();
export const openAiClient = new OpenAiClient();
export const mongooseClient = new MongooseClient();
