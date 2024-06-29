import Container from '../components/Container.js';
import img from '../assets/404.svg';

const NotFoundPage = () => {
  return (
    <Container innerRef={null}>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <img
          src={img}
          alt="404"
          className="pointer-events-none w-2/3 max-w-96"
        />
        <div className="flex flex-col w-96 gap-2">
          <h1 className="text-4xl font-bold text-center text-slate-400">
            Page not found.
          </h1>
          <p className="text-center text-slate-300 leading-tight">
            Go back to{' '}
            <a className="text-sky-200 underline font-extrabold" href="/">
              homepage
            </a>
            .
          </p>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundPage;
