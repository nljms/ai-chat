import { useEffect, useRef } from 'react';
import { Formik, FormikHelpers } from 'formik';

import { Bubble, ChatBar, Container } from '../components/index.js';
import { User } from '../types.js';
import ErrorPage from './error.page.js';
import Empty from '../components/Empty.js';
import ChatSessionDrawer from '../features/ChatSessionDrawer.js';
import { AppContainer, ChatSessionContainer } from '../components/Container.js';

import { useChatStore } from '../contexts/chat.context.js';

type FormValues = {
  message: string;
  user: User;
};

const Home = (props) => {
  console.log('Home props:', props);

  const chatContainerRef = useRef<HTMLDivElement>();

  const store = useChatStore();

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [store.loading]);

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
    await store.getChatStreams(cleanMessage);
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
          <div className="flex">
            <ChatSessionContainer>
              <ChatSessionDrawer />
            </ChatSessionContainer>
            <Container>
              <div
                className="flex h-full flex-1 flex-col gap-4 p-4 overflow-y-scroll"
                ref={chatContainerRef}
              >
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
                  message="..."
                  user="system"
                  innerRef={store.typingRef}
                />
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
          </div>
        </AppContainer>
      )}
    </Formik>
  );
};

export default Home;
