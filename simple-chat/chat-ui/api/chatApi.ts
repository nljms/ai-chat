import { ChatHistory } from '../types.js';

async function* iterableStream(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }
    const decodedChunk = decoder.decode(value, { stream: true });
    yield decodedChunk;
  }
}

/**
 * Get chats by chat session id
 * @param chatSessionId
 * @returns
 */
export const getChats = async (chatSessionId: string): Promise<ChatHistory> => {
  // TODO: Use config for base url
  const response = await fetch(`http://localhost:5001/chats/${chatSessionId}`, {
    method: 'get',
  });

  return response.json();
};

export const getChatStreams = async (
  chatSessionId: string,
  message: string,
  model?: string
) => {
  const response = await fetch('http://localhost:5001/chat', {
    method: 'POST',
    body: JSON.stringify({ chatSessionId, message, model }),
    headers: { 'Content-Type': 'application/json' },
  });

  const stream = response.body;

  return iterableStream(stream);
};

export const getChatSessions = async () => {
  const response = await fetch('http://localhost:5001/chats', {
    method: 'get',
  });

  return response.json();
};

export const getModels = async (): Promise<string[]> => {
  const response = await fetch('http://localhost:5001/chats/models', {
    method: 'get',
  });

  return response.json();
};
