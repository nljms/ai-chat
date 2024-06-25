import { useEffect, useRef } from 'react';

import { Drawer, Input } from '../components/index.js';
import useGetChatSessions from '../hooks/useGetChatSessions.js';

type ChatSessionDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const ChatSessionDrawer = (props: ChatSessionDrawerProps) => {
  const sessions = useGetChatSessions();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Drawer open:', props.open, containerRef.current);
    containerRef.current?.focus();

    return () => {};
  }, [props.open]);

  return (
    <Drawer.Container
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      innerRef={containerRef}
    >
      <div className="flex flex-col w-[inherit] gap-2">
        <Drawer.DrawerHeader>
          <span>Chat Sessions</span>
          <Input.Button size="xs" variant="primary" onClick={props.onClose}>
            x
          </Input.Button>
        </Drawer.DrawerHeader>
        <div className=" h-[2px] animated-background bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold rounded" />
        <div className="flex flex-col">
          {sessions.map((session) => (
            <Drawer.DrawerContent
              id={session.sessionId}
              key={session.sessionId}
            >
              {session.message}
            </Drawer.DrawerContent>
          ))}
        </div>
      </div>
    </Drawer.Container>
  );
};

export default ChatSessionDrawer;
