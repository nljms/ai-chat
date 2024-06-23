import { forwardRef } from 'react';
import { User } from '../types.js';

type BubbleProps = {
  innerRef?: React.ForwardedRef<HTMLDivElement>;
  message: string;
  user: User;
};

const Bubble = (props: BubbleProps) => {
  const { message, user } = props;
  const fromMe = user === 'user';

  const cls = {
    user: 'bg-sky-400',
    system: 'bg-sky-700',
    invalid: 'bg-gray-500',
  };

  const userClass = {
    user: 'bg-red-700',
    system: 'bg-gray-700',
  };

  const containerClass = fromMe
    ? 'max-w-[65%] place-self-end'
    : 'max-w-[65%] place-self-start';

  return (
    <div
      title={user}
      className={`${containerClass} flex gap-3 ${
        fromMe ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`pointer-events-none flex-1 shadow-lg shadow-[black] items-center justify-center flex rounded-full p-2 h-10 min-w-10 text-white ${
          userClass[user] ?? userClass.system
        }`}
      >
        <span className="pointer-events-none">{fromMe ? 'U' : 'B'}</span>
      </div>
      <div
        className={`rounded-md p-2 shadow-lg shadow-[black] ${
          message ? cls[user] : cls.invalid
        }`}
        ref={props.innerRef}
      >
        {message ? (
          message
        ) : (
          <span>
            Message unavailable. The server didn&apos;t send anything.
          </span>
        )}
      </div>
    </div>
  );
};

export default forwardRef<HTMLDivElement, BubbleProps>((props, ref) => (
  <Bubble {...props} innerRef={ref} />
));
