import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import { v4 as uuidv4, validate } from 'uuid';

import { getChatStreams, getChats } from '../api/chatApi.js';
import { Bubble, ChatBar, Container } from '../components/index.js';
import { ChatMessage, User } from '../types.js';
import ErrorPage from './error.page.js';

type FormValues = {
  message: string;
  user: User;
};

const Home = (props) => {
  console.log('Home props:', props);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [reply, setReply] = useState('...');
  const chatContainerRef = useRef<HTMLDivElement>();

  const [error, setError] = useState(false);

  const [searchParams, setSearchParam] = useSearchParams();
  const chatSessionId = searchParams.get('chatSessionId');

  const isNetworkError = (response) => {
    if (response instanceof Error) {
      setError(true);
    }
    return response;
  };

  useEffect(() => {
    const fetchChats = async (sessionId) => {
      const response = await getChats(sessionId).catch(isNetworkError);

      setChatHistory(response.messages);
    };

    if (!validate(chatSessionId)) {
      const sessionId = uuidv4();
      setSearchParam({ chatSessionId: sessionId });
      return;
    }

    fetchChats(chatSessionId);

    return () => {
      console.log('Home unmounted.');
    };
  }, []);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [reply, chatSessionId]);

  if (error) {
    return <ErrorPage />;
  }

  const onSend = async (
    values: FormValues,
    helpers?: FormikHelpers<FormValues>
  ) => {
    const cleanMessage = values.message.trim();

    if (!cleanMessage) return;

    const history = [
      ...chatHistory,
      { message: values.message, user: 'user' as any },
    ];
    const messages = await getChatStreams(chatSessionId, cleanMessage).catch(
      isNetworkError
    );

    setChatHistory(history);
    helpers.setSubmitting(true);

    let response = '';

    for await (const message of messages) {
      response += message;
      setReply(response);
    }

    if (!response) return;
    history.push({ message: response.trim(), user: 'system' });
    helpers.setSubmitting(false);
    setReply('...');
    setChatHistory(history);
  };

  return (
    <Formik
      initialValues={{
        message: '',
        user: '',
      }}
      onSubmit={onSend}
    >
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
        <Container>
          <div
            className="flex h-full flex-1 flex-col gap-4 p-4 overflow-y-scroll"
            ref={chatContainerRef}
          >
            {chatHistory.map((history) => (
              <Bubble
                key={history.id}
                message={history.message}
                user={history.user}
              />
            ))}
            {isSubmitting && (
              <Bubble key={chatSessionId} message={reply} user="system" />
            )}
          </div>
          <div className="w-full">
            <ChatBar
              placeholder="Please enter a message"
              value={values.message}
              setFieldValue={setFieldValue}
              onSendMessage={handleSubmit}
              disabled={isSubmitting}
            />
          </div>
        </Container>
      )}
    </Formik>
  );
};

export default Home;
