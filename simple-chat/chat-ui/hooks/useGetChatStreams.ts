import { getChatStreams } from '../api/chatApi.js';
import { useChatStore } from '../contexts/chat.context.js';

const useGetChatStreams = async () => {
  const store = useChatStore();

  const streams = await getChatStreams(store.chatSessionId, '');

  return streams;
};

export default useGetChatStreams;
