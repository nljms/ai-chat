import empty from '../assets/empty.svg';

const Empty = () => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <img
        src={empty}
        alt="404"
        className="pointer-events-none w-2/3 max-w-96"
      />
      <div className="flex-col">
        <h1 className="text-2xl text-slate-300">Wow, such empty...</h1>
      </div>
    </div>
  );
};
export default Empty;
