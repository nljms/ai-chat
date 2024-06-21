const Container = (props: React.PropsWithChildren) => {
  return <div className="bg-slate-900 h-screen">{props.children}</div>;
};

export default Container;
