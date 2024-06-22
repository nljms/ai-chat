import { groqClient, openAiClient } from "./clients/index.js";
import { AiClient } from "./clients/types.js";
/**
 * chat service
 */
export class ChatService {
  constructor(private readonly client: AiClient) {
    console.log("Chat service created.");
  }

  /**
   * say hello.
   */
  async getHello() {
    return "Hello World!";
  }

  /**
   * send a message.
   */
  async sendMessage(message: string) {
    return this.client.stream(message);
  }

  /**
   * create a new instance of a chat service.
   */
  static from() {
    return new ChatService(groqClient);
  }

  static fromOpenAI() {
    return new ChatService(openAiClient);
  }
}
