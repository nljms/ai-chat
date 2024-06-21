import { useState } from 'react';

type Message = {
  text: string;
  sender: 'me' | 'other';
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message) {
      setMessages([...messages, { text: message, sender: 'me' }]);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <span>{msg.sender}</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
