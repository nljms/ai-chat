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

export const getChatMessages = async (message: string) => {
  const response = await fetch(`http://localhost:5001/chat?message=${message}`);

  const stream = response.body;

  return iterableStream(stream);
};
