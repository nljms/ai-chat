import { createPortal } from 'react-dom';

import { animatedBackground } from '../constants/styles.js';
import ChatSessionDrawer from '../features/ChatSessionDrawer.js';

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
  showChatList?: boolean;
  onToggleChatList?: () => void;
};

export const StickyNavContainer = (props: StickyNavContainerProps) => {
  const { showChatList, onToggleChatList } = props;

  return (
    <div
      className={`${
        props.animating && animatedBackground
      } flex-row-reverse flex justify-between items-center pb-[4px] sticky top-0 shadow-2xl`}
    >
      {createPortal(
        <div
          className={`z-10 fixed h-full w-full top-0 flex items-center justify-center bg-[rgba(14,15,27,0.9)] ${
            showChatList ? 'block' : 'hidden'
          }`}
          tabIndex={100}
        >
          <ChatSessionDrawer open={showChatList} onClose={onToggleChatList} />
        </div>,
        document.getElementById('modal-root')
      )}
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
      className="h-screen flex flex-col w-full items-center overflow-y-scroll shadow-black overflow-x-hidden"
    >
      <div className="h-full container mx-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm">
        {props.children}
      </div>
    </div>
  );
};

export default ChatContainer;
