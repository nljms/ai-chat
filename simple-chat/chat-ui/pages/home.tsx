import Bubble from '../components/Bubble.js';
import ChatBar from '../components/ChatBar.js';
import Container from '../components/Container.js';

const Home = () => {
  const chatHistory = [
    {
      message: 'Hello, how are you?',
      sender: 'me',
    },
    {
      message: 'I am good, how are you?',
      sender: 'other',
    },
    {
      message: 'I am good too, thanks for asking',
      sender: 'me',
    },
    {
      message: 'What are you doing today?',
      sender: 'me',
    },
    {
      message: 'I am going to the park',
      sender: 'other',
    },
    {
      message: 'That sounds fun',
      sender: 'me',
    },
    {
      message: 'Yes, I am looking forward to it',
      sender: 'other',
    },
    {
      message: 'I hope you have a good time',
      sender: 'me',
    },
    {
      message: 'Thank you, I will',
      sender: 'other',
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      sender: 'me',
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      sender: 'me',
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      sender: 'me',
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      sender: 'me',
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      sender: 'me',
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      sender: 'me',
    },
  ];

  return (
    <Container>
      <div className="flex flex-col gap-4 p-4">
        {chatHistory.map((chat, i) => (
          <Bubble key={i} message={chat.message} sender={chat.sender as any} />
        ))}
      </div>
      <div className="fixed bottom-0 w-full">
        <ChatBar />
      </div>
    </Container>
  );
};

export default Home;
