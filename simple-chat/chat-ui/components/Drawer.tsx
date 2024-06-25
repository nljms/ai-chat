import Link from './Link.js';

type DrawerProps = {
  anchor: 'left' | 'right';
  fixed?: boolean;
  children?: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  innerRef?: React.RefObject<HTMLDivElement>;
};

export const Container = (props: DrawerProps) => {
  return (
    <div className="w-96 outline-none" tabIndex={100} ref={props.innerRef}>
      <div className="animated-background h-[70vh] rounded-lg shadow-lg p-[1px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        <div className="bg-slate-950 w-full h-full rounded-lg flex p-5 overflow-y-auto scroll-m-9">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export const DrawerHeader = (props: React.PropsWithChildren) => {
  return (
    <h1 className="text-lg text-slate-300 b flex justify-between items-center p-2">
      {props.children}
    </h1>
  );
};

type DrawerContentProps = {
  id: string;
  children: React.ReactNode;
};

export const DrawerContent = (props: DrawerContentProps) => {
  return (
    <Link
      className="p-2 text-slate-400 cursor-pointer hover:text-slate-300 hover:bg-slate-900 rounded-md"
      to={`/?chatSessionId=${props.id}`}
    >
      <p className="truncate">{props.children}</p>
    </Link>
  );
};
