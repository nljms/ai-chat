import { Variant } from '../constants/styles.ts';

export type InputProps<T> = {
  type?: string;
  variant?: Variant;
  onChange?: (e: React.ChangeEvent<T>) => void;
  value?: string;
  autoFocus?: boolean;
  ref?: React.RefObject<T>;
  placeholder?: string;
  disabled?: boolean;
};

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary';
  disabled?: boolean;
};
