import { useEffect } from 'react';
import { useChatStore } from '../contexts/chat.context.js';
import { getChats } from '../api/chatApi.js';
import { ChatHistory } from '../types.js';

const useGetChats = () => {
  const store = useChatStore();

  useEffect(() => {
    const fetchChats = async () => {
      if (!store.chatSessionId) return;
      // TODO: change the URL to config URL
      const response: ChatHistory = await getChats(store.chatSessionId).catch(
        (error) => {
          console.error('Failed to fetch chat history', error);
          store.setError(true);
          return error;
        }
      );

      store.updateChatHistory(response.messages);
    };

    fetchChats();
  }, [store.chatSessionId]);

  return store.chatHistory;
};

export default useGetChats;
