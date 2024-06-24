import { useEffect } from 'react';
import { useChatStore } from '../contexts/chat.context.js';

const useGetChatSessions = () => {
  const store = useChatStore();

  useEffect(() => {
    const fetchChatSessions = async () => {
      const response = await fetch('http://localhost:5001/chats', {
        method: 'GET',
      });

      if (!response.ok) {
        console.error('Failed to fetch chat sessions', response.statusText);
        store.setError(true);
        throw new Error('Failed to fetch chat sessions');
      }
      const data = await response.json();
      store.updateChatSessions(data);
    };

    fetchChatSessions();
  }, []);

  return store.chatSessions;
};

export default useGetChatSessions;
