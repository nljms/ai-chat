import { useState } from 'react';

import Button from './Button.js';

type ChatBarProps = {
  placeholder?: string;
  value?: string;
  setFieldValue?: (field: string, value: string) => void;
  onSendMessage?: (...args) => void;
};

const ChatBar = (props: ChatBarProps) => {
  const [message, setMessage] = useState('');

  return (
    <form
      className="bg-slate-800 p-4 flex gap-3"
      onSubmit={(values) => {
        setMessage('');
        props.onSendMessage(values);
      }}
    >
      <input
        placeholder={props.placeholder ?? 'Please enter a message'}
        value={message}
        type="text"
        className="w-full p-2 rounded-lg"
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          props.setFieldValue('message', value);
        }}
      />
      <Button variant="primary" type="submit">
        Send
      </Button>
    </form>
  );
};

export default ChatBar;
