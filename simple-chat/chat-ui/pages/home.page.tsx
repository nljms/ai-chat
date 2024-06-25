import { useEffect, useRef, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';

import { Bubble, ChatBar, Container, Dropdown } from '../components/index.js';
import { User } from '../types.js';
import ErrorPage from './error.page.js';
import Empty from '../components/Empty.js';
import { AppContainer, StickyNavContainer } from '../components/Container.js';

import { useChatStore } from '../contexts/chat.context.js';

type FormValues = {
  message: string;
  user: User;
};

const Home = (props) => {
  console.log('Home props:', props);

  const chatContainerRef = useRef<HTMLDivElement>();

  const [typingMessage, setTypingMessage] = useState<string>('...');

  const store = useChatStore();

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [store.loading, typingMessage]);

  if (store.error) {
    return <ErrorPage />;
  }

  const onSend = async (
    values: FormValues,
    helpers?: FormikHelpers<FormValues>
  ) => {
    const cleanMessage = values.message.trim();

    if (!cleanMessage) return;

    helpers.setSubmitting(true);
    await store.getChatStreams(cleanMessage, setTypingMessage);
    helpers.setSubmitting(false);
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
        <AppContainer>
          <StickyNavContainer animating={store.loading}>
            <div className="flex flex-col gap-4 p-4 text-slate-200">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Chat</h1>
                <div>
                  <Dropdown
                    optionList={{ groq: store.models }}
                    selected={store.selectedModel}
                    onChange={store.selectModel}
                  ></Dropdown>
                </div>
              </div>
            </div>
          </StickyNavContainer>
          <Container innerRef={chatContainerRef}>
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
              {!store.chatHistory.length && <Empty />}
              {store.chatHistory.map((history) => (
                <Bubble
                  key={history.id}
                  message={history.message}
                  user={history.user}
                />
              ))}
              <Bubble
                hidden={!isSubmitting}
                key={store.chatSessionId}
                message={typingMessage}
                user="system"
              />
            </div>
          </Container>
          <div className="w-full">
            <ChatBar
              placeholder="Please enter a message"
              value={values.message}
              setFieldValue={setFieldValue}
              onSendMessage={handleSubmit}
              disabled={isSubmitting}
            />
          </div>
        </AppContainer>
      )}
    </Formik>
  );
};

export default Home;
