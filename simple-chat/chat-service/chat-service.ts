import { groqClient, openAiClient, redisClient } from "./clients/index.js";
import { AiClient, CacheMachine } from "./clients/types.js";
/**
 * chat service
 */
export class ChatService {
  constructor(
    private readonly client: AiClient,
    private readonly cacheMachine: CacheMachine
  ) {
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
  async sendMessage(sessionId: string, message: string) {
    const cacheId = sessionId;
    const cache = (await this.cacheMachine.get(cacheId)) ?? "";
    const cachedMessage = [cache, message].join("|");

    await this.cacheMachine.set(cacheId, cachedMessage);

    return this.client.stream(cachedMessage);
  }

  /**
   * create a new instance of a chat service.
   */
  static from() {
    return new ChatService(groqClient, redisClient);
  }

  static fromOpenAI() {
    return new ChatService(openAiClient, redisClient);
  }
}
