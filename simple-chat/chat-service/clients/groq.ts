import Groq from "groq-sdk";
import { AiClient } from "./types.js";

export type GroqAI = typeof Groq;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

class GroqClient implements AiClient {
  private client = groq;

  async stream(message: string) {
    const messages = message.split("|");
    const stream = await this.client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "you are a helpful assistant.",
        },
        {
          role: "user",
          content: messages[messages.length - 2],
        },
        {
          role: "user",
          content: messages[messages.length - 1],
        },
      ],
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stop: ", 6",
      stream: true,
    });

    return stream;
  }
}

export default GroqClient;
