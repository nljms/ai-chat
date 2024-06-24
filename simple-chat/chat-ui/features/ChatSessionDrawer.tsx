import { Drawer } from '../components/index.js';
import useGetChatSessions from '../hooks/useGetChatSessions.js';

const ChatSessionDrawer = () => {
  const sessions = useGetChatSessions();
  return (
    <Drawer.Container anchor="right" open={true} onClose={() => {}}>
      <div className="flex flex-col w-[inherit] gap-2">
        <Drawer.DrawerHeader>Chat Sessions</Drawer.DrawerHeader>
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
