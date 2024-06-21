import Button from './Button.js';

const ChatBar = () => {
  return (
    <div className="bg-slate-800 p-4 flex gap-3">
      <input type="text" className="w-full p-2 rounded-lg" />
      <Button variant="primary" onClick={() => {}}>
        Send
      </Button>
    </div>
  );
};

export default ChatBar;
