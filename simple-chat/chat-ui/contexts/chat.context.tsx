import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChatMessage, ChatSession } from '../types.js';
import * as api from '../api/chatApi.js';

type ChatStore = {
  chatSessionId: string;
  chatHistory: ChatMessage[];
  chatSessions: ChatSession[];
  updateChatHistory: (data: ChatMessage[]) => void;
  updateChatSessions: (data: ChatSession[]) => void;
  updatedChatSessionId: (data: string) => void;
  error: boolean;
  setError: (data: boolean) => void;
  loading: boolean;
  setLoading: (data: boolean) => void;
  getChatStreams: (sentMessage: string) => Promise<void>;
  typingRef: React.MutableRefObject<HTMLDivElement>;
};

const ChatStoreContext = createContext<ChatStore | null>(null);

/**
 * Custom hook to use chat store
 * @returns
 */
export const useChatStore = () => {
  const store = useContext(ChatStoreContext);

  if (!store) {
    throw new Error('useChatStore must be used within a ChatStoreProvider');
  }
  return store;
};

/**
 * Store provider for chat data
 * in local storage
 * @param props
 * @returns
 */
export const ChatStoreProvider = (props: React.PropsWithChildren) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [error, setError] = useState(false);
  const [chatSessionId, setChatSessionId] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParam] = useSearchParams();
  const typingRef = useRef<HTMLDivElement>();

  /**
   * Get all the chats for a session
   * @param sessionId
   */
  const getChats = async (sessionId: string) => {
    const chats = await api.getChats(sessionId);
    setChatHistory(chats.messages);
  };

  /**
   * Fetches event sent streams
   * @param sentMessage
   */
  const getChatStreams = async (sentMessage: string) => {
    const cHistory: ChatMessage[] = [
      ...chatHistory,
      { message: sentMessage, user: 'user' },
    ];
    setLoading(true);
    setChatHistory(cHistory);
    const streamedReply = await api.getChatStreams(chatSessionId, sentMessage);

    let reply = '';
    for await (const message of streamedReply) {
      reply += message;
    }
    cHistory.push({ message: reply.trim(), user: 'system' });

    setChatHistory(cHistory);
    setLoading(false);
  };

  useEffect(() => {
    const sessionId = searchParams.get('chatSessionId');
    if (sessionId) {
      setChatSessionId(sessionId);
      getChats(sessionId);
    }
  }, [chatSessionId]);

  return (
    <ChatStoreContext.Provider
      value={{
        chatSessionId,
        chatHistory,
        chatSessions,
        updateChatHistory: setChatHistory,
        updateChatSessions: setChatSessions,
        updatedChatSessionId: setChatSessionId,
        error,
        setError,
        loading,
        setLoading,
        getChatStreams,
        typingRef,
      }}
    >
      {props.children}
    </ChatStoreContext.Provider>
  );
};
