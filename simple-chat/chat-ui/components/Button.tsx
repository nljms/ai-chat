import { variants } from '../constants/styles.js';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary';
};

const Button = (props: ButtonProps) => {
  const { children, onClick, type } = props;
  const variant = variants[props.variant];
  return (
    <button
      type={type ?? 'button'}
      className={`px-10 py-4 ${variant} rounded-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
