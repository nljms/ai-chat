import Groq from "groq-sdk";
import { AiClient } from "./types.js";

export type GroqAI = typeof Groq;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

class GroqClient implements AiClient {
  private client = groq;

  async stream(message: string) {
    // TODO: fix typing
    const messages = message
      .split("|")
      .map((content) => ({ role: "user", content })) as any;

    return this.client.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "system",
          content: "you are a helpful assistant.",
        },
        ...messages,
      ],
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stop: ", 6",
      stream: true,
    });
  }
}

export default GroqClient;
