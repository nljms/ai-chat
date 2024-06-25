import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSearchParams, SetURLSearchParams } from 'react-router-dom';
import { validate, v4 as uuidv4 } from 'uuid';

import { ChatMessage, ChatSession } from '../types.js';
import * as api from '../api/chatApi.js';

export type Model = {
  [key: string]: {
    values: string;
  };
};

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
  getChatStreams: (
    sentMessage: string,
    callback?: (message: string) => void
  ) => Promise<void>;
  typingRef: React.MutableRefObject<HTMLDivElement>;
  model: Model;
  selectModel: (key: string, value: string) => void;
  selectedModel: string;
  setSearchParam: SetURLSearchParams;
  models: string[];
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
  const [searchParams, setSearchParam] = useSearchParams();

  const [model, setModel] = useState({});
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const typingRef = useRef<HTMLDivElement>();

  let timeoutId;

  /**
   * Get all the chats for a session
   * @param sessionId
   */
  const getChats = async (sessionId: string) => {
    setLoading(true);
    const chats = await api.getChats(sessionId);

    timeoutId = setTimeout(() => {
      setChatHistory(chats.messages);
      setLoading(false);
    }, 3000);
  };

  const getModels = async () => {
    const aiModels = await api.getModels();
    setModels(aiModels);
  };

  /**
   * Fetches event sent streams
   * @param sentMessage
   */
  const getChatStreams = async (
    sentMessage: string,
    callback?: (message: string) => void
  ) => {
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
      if (callback) {
        callback(reply);
      }
    }

    cHistory.push({ message: reply.trim(), user: 'system' });

    setChatHistory(cHistory);
    setLoading(false);
  };

  const handleSelectModel = (key: string, value: string) => {
    setModel({ [key]: { values: value } });
    setSelectedModel(value);
  };

  useEffect(() => {
    const sessionId = searchParams.get('chatSessionId');
    const sessionIdValid = validate(sessionId);
    if (!sessionIdValid) {
      setSearchParam({ chatSessionId: uuidv4() });
      return;
    }
    if (sessionId) {
      setChatSessionId(sessionId);
      getChats(sessionId);
      getModels();
    }

    return () => {
      clearTimeout(timeoutId);
    };
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
        model,
        selectModel: handleSelectModel,
        selectedModel,
        setSearchParam,
        models,
      }}
    >
      {props.children}
    </ChatStoreContext.Provider>
  );
};
