import { sizes, variants } from '../constants/styles.js';
import { ButtonProps, InputProps } from './types.js';

export const Text = (props: InputProps<HTMLInputElement>) => {
  const variant = variants[props.variant] ?? variants.primary;

  return (
    <input
      ref={props.ref}
      type={props.type}
      className={`p-4 focus:placeholder:text-neutral-300 sm:w-96 w-64 rounded-lg outline-none ${variant}`}
      onChange={props.onChange}
      value={props.value}
      autoFocus={props.autoFocus}
      placeholder={props.placeholder ?? 'Please enter a message'}
      disabled={props.disabled}
    />
  );
};

export const Button = (props: ButtonProps) => {
  const { children, onClick, type, disabled } = props;
  const variant = variants[props.variant];

  const size = sizes[props.size] ?? sizes.sm;

  return (
    <button
      type={type ?? 'button'}
      className={`px-10 py-4 ${variant} rounded-md ${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
