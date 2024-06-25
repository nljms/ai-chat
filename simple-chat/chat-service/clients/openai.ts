import OpenAI from "openai";
import { AiClient } from "./types.js";

console.log("OpenAI API Key: ", process.env.OPENAI_API_KEY);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class OpenAiClient implements AiClient {
  private client = client;

  async stream(message: string) {
    const clientStream = await this.client.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo-16k",
      stream: true,
    });

    return clientStream;
  }

  async getModels() {
    const models = await this.client.models.list();

    return models.data.map((model) => model.id);
  }
}

export default OpenAiClient;
