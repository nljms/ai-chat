import { useState } from 'react';

import { Input } from './index.js';

type ChatBarProps = {
  placeholder?: string;
  value?: string;
  setFieldValue?: (field: string, value: string) => void;
  onSendMessage?: (...args) => void;
  disabled?: boolean;
};

const ChatBar = (props: ChatBarProps) => {
  const [message, setMessage] = useState('');

  return (
    <form
      className="w-[inherit] flex items-center justify-center p-4"
      onSubmit={(values) => {
        setMessage('');
        props.onSendMessage(values);
      }}
    >
      <div
        className="rounded-md bg-slate-700 p-2 focus-within:outline focus-within:outline-blue-100"
        tabIndex={0}
        autoFocus
      >
        <Input.Text
          placeholder={props.placeholder ?? 'Please enter a message'}
          autoFocus={!props.disabled}
          value={message}
          type="text"
          variant="transparent"
          onChange={(e) => {
            const { value } = e.target;
            setMessage(value);
            props.setFieldValue('message', value);
          }}
        />
        <Input.Button variant="primary" type="submit" disabled={props.disabled}>
          Send
        </Input.Button>
      </div>
      <div>{/* <Input.Dropdown></Input.Dropdown> */}</div>
    </form>
  );
};

export default ChatBar;
