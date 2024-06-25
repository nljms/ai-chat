import { animatedBackground } from '../constants/styles.js';

export const AppContainer = (props: React.PropsWithChildren) => {
  return (
    <div className="h-screen w-screen bg-slate-900 shadow-inner shadow-black flex flex-col">
      {props.children}
    </div>
  );
};

type StickyNavContainerProps = {
  children: React.ReactNode;
  animating?: boolean;
};

export const StickyNavContainer = (props: StickyNavContainerProps) => {
  return (
    <div
      className={`${
        props.animating && animatedBackground
      } flex-row-reverse flex justify-between items-center pb-[4px] sticky top-0 shadow-2xl`}
    >
      <div className="bg-slate-900 w-full">{props.children}</div>
    </div>
  );
};

export const ChatSessionContainer = (props: React.PropsWithChildren) => {
  return (
    <div className="flex-col justify-center lg:flex hidden">
      <div className="flex flex-col m-5">{props.children}</div>
    </div>
  );
};

type ChatContainerProps = {
  children: React.ReactNode;
  innerRef: React.RefObject<HTMLDivElement>;
};

const ChatContainer = (props: ChatContainerProps) => {
  return (
    <div
      ref={props.innerRef}
      className="h-screen flex flex-col w-full overflow-y-scroll shadow-black overflow-x-hidden"
    >
      {props.children}
    </div>
  );
};

export default ChatContainer;
