import { Link as RRDLink, redirect } from 'react-router-dom';

const Link = (props) => {
  const handleForceRefresh = () => {
    redirect(props.to, 2);
  };

  return (
    <RRDLink
      className={props.className}
      to={props.to}
      onClick={handleForceRefresh}
    >
      {props.children}
    </RRDLink>
  );
};

export default Link;
