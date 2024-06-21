type BubbleProps = {
  message: string;
  sender: 'me' | 'other';
};

const Bubble = (props: BubbleProps) => {
  const { message, sender } = props;

  const fromMe = sender === 'me';

  return (
    <div className={`max-w-[65%] place-self-${fromMe ? 'end' : 'start'}`}>
      <div className={`rounded-md p-2 ${fromMe ? 'bg-sky-400' : 'bg-sky-700'}`}>
        {message}
      </div>
    </div>
  );
};

export default Bubble;
