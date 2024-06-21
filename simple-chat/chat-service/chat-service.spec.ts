import { ChatService } from './chat-service.js';

describe('chat service', () => {
  it('should say hello', async () => {
    const chatService = ChatService.from();
    const greeting = await chatService.getHello();
    expect(greeting).toEqual('Hello World!');
  })
});
    