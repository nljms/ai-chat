import { useState } from 'react';
import { Formik } from 'formik';

import Bubble from '../components/Bubble.js';
import ChatBar from '../components/ChatBar.js';
import Container from '../components/Container.js';
import { getChatMessages } from '../api/chatApi.js';

type FormValues = {
  message: string;
  sender: string;
};

const Home = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const onSend = async (values: FormValues) => {
    console.log('values:', values);
    if (!values.message) return;
    console.log('Sending message:', values.message);
    const history = [...chatHistory, { message: values.message, sender: 'me' }];

    setChatHistory([...chatHistory, { message: values.message, sender: 'me' }]);

    const messages = await getChatMessages(values.message);

    let response = '';
    for await (const message of messages) {
      console.log('message:', message);
      response += message;
    }

    if (!response) return;
    history.push({ message: response, sender: 'other' });

    setChatHistory(history);
  };

  return (
    <Container>
      <div className="flex flex-col gap-4 p-4">
        {chatHistory.map((chat, i) => (
          <Bubble key={i} message={chat.message} sender={chat.sender} />
        ))}
      </div>
      <div className="fixed bottom-0 w-full">
        <Formik
          initialValues={{
            message: '',
            sender: '',
          }}
          // enableReinitialize
          onSubmit={onSend}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <ChatBar
              placeholder="Please enter a message"
              value={values.message}
              setFieldValue={setFieldValue}
              onSendMessage={handleSubmit}
            />
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Home;
