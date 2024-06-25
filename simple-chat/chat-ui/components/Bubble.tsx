import Markdown from './Markdown.js';
import { User } from '../types.js';

type BubbleProps = {
  innerRef?: React.RefObject<HTMLDivElement>;
  message: string;
  user: User;
  hidden?: boolean;
};

const Bubble = (props: BubbleProps) => {
  const { message, user } = props;
  const fromMe = user === 'user';

  const cls = {
    user: 'bg-slate-800',
    system: 'bg-none',
    invalid: 'bg-gray-600 text-gray-800',
  };

  const userClass = {
    user: 'bg-red-700',
    system: 'bg-gray-700',
  };

  const containerClass = fromMe
    ? 'max-w-[65%] place-self-end'
    : 'max-w-[90%] place-self-start';

  const bubbleMessage =
    message.trim() || "Message unavailable. The server didn't send anything.";

  return (
    <div
      title={user}
      className={`${containerClass} ${
        props.hidden ? 'hidden' : ''
      } flex gap-3 ${fromMe ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`pointer-events-none flex-1 bg  shadow-md shadow-[#000000ce] items-center justify-center flex rounded-full p-2 h-10 min-w-10 text-white ${
          userClass[user] ?? userClass.system
        }`}
      >
        <span className="pointer-events-none">{fromMe ? 'U' : 'B'}</span>
      </div>
      <div
        className={`rounded-md overflow-x-scroll bg p-2 shadow-[black] ${
          message ? cls[user] : cls.invalid
        }`}
        ref={props.innerRef}
      >
        <span className="text-slate-400">
          <Markdown content={bubbleMessage}></Markdown>
        </span>
      </div>
    </div>
  );
};

export default Bubble;
