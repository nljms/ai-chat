import { useEffect, useState } from 'react';
import { ChatSession } from '../types.js';

const useGetChatSessions = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    const fetchChatSessions = async () => {
      const response = await fetch('http://localhost:5001/chats', {
        method: 'GET',
      });

      if (!response.ok) {
        console.error('Failed to fetch chat sessions', response.statusText);
        throw new Error('Failed to fetch chat sessions');
      }
      const data = await response.json();
      setChatSessions(data);
    };

    fetchChatSessions();
  }, []);

  return chatSessions;
};

export default useGetChatSessions;
