const Container = (props: React.PropsWithChildren) => {
  return (
    <div className="bg-slate-900 h-screen overflow-y-scroll pb-24">
      {props.children}
    </div>
  );
};

export default Container;
