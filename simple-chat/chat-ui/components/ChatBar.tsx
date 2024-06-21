import { useRef } from 'react';
import Button from './Button.js';

type ChatBarProps = {
  onChat: (message: string) => void;
  placeholder?: string;
};

const ChatBar = (props: ChatBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-slate-800 p-4 flex gap-3">
      <input
        placeholder={props.placeholder ?? 'Please enter a message'}
        ref={inputRef}
        type="text"
        className="w-full p-2 rounded-lg"
      />
      <Button
        variant="primary"
        onClick={() => props.onChat(inputRef?.current.value)}
      >
        Send
      </Button>
    </div>
  );
};

export default ChatBar;
