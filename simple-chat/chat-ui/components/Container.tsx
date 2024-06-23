const Container = (props: React.PropsWithChildren) => {
  return (
    <div className="bg-slate-900 h-screen flex flex-col">{props.children}</div>
  );
};

export default Container;
