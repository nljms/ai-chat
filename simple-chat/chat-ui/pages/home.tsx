import ChatBar from '../components/ChatBar.js';
import Container from '../components/Container.js';

const Home = () => {
  return (
    <Container>
      <div className="fixed bottom-0 w-full">
        <ChatBar />
      </div>
    </Container>
  );
};

export default Home;
