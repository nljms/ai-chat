import { useState } from 'react';

import Bubble from '../components/Bubble.js';
import ChatBar from '../components/ChatBar.js';
import Container from '../components/Container.js';

const Home = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const onSend = (message: string) => {
    if (!message) return;
    console.log('Sending message:', message);
    setChatHistory([...chatHistory, { message }]);
  };

  return (
    <Container>
      <div className="flex flex-col gap-4 p-4">
        {chatHistory.map((chat, i) => (
          <Bubble
            key={i}
            message={chat.message}
            sender={i % 2 === 0 ? 'me' : 'other'}
          />
        ))}
      </div>
      <div className="fixed bottom-0 w-full">
        <ChatBar onChat={onSend} />
      </div>
    </Container>
  );
};

export default Home;
