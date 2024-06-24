export const AppContainer = (props: React.PropsWithChildren) => {
  return (
    <div className="h-screen w-screen bg-slate-900 shadow-inner shadow-black">
      {props.children}
    </div>
  );
};

export const ChatSessionContainer = (props: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col m-5">{props.children}</div>
    </div>
  );
};

const ChatContainer = (props: React.PropsWithChildren) => {
  return <div className="h-screen flex flex-col w-full">{props.children}</div>;
};

export default ChatContainer;
