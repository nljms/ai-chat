import Container from '../components/Container.js';
import img from '../assets/503.svg';

const ErrorPage = () => {
  return (
    <Container innerRef={null}>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <img
          src={img}
          alt="404"
          className="pointer-events-none w-2/3 max-w-96"
        />
        <div className="flex flex-col w-96 gap-4">
          <h1 className="text-4xl font-bold text-center text-slate-400">
            Service is temporarily unavailable.
          </h1>
          <p className="text-center text-slate-300  leading-6">
            The server is currently unable to handle the request due to a
            temporary overloading or maintenance of the server. Please try again
            later.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
