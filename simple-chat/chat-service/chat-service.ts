
/**
 * chat service
 */
export class ChatService {
  
  /**
   * say hello.
   */
  async getHello() {
    return 'Hello World!';
  }

  /**
   * create a new instance of a chat service.
   */
  static from() {
    return new ChatService();
  }
}
