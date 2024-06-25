import { Variant } from '../constants/styles.ts';

export type Size = 'xs' | 'sm' | 'md' | 'lg';

export type InputProps<T> = {
  type?: string;
  variant?: Variant;
  onChange?: (e: React.ChangeEvent<T>) => void;
  value?: string;
  autoFocus?: boolean;
  ref?: React.RefObject<T>;
  placeholder?: string;
  disabled?: boolean;
  size?: Size;
};

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary';
  disabled?: boolean;
  size?: Size;
};
