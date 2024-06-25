export const variants = {
  primary:
    'animated-background bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold rounded',
  secondary: 'bg-blue-200 text-blue-500',
  danger: 'bg-red-500 text-white',
  success: 'bg-green-500 text-white',
  transparent: 'bg-inherit text-slate-300',
};

export const sizes = {
  xs: 'px-1 py-1 max-w-xs',
  sm: 'px-4 py-2 max-w-xs',
  md: 'px-6 py-3 max-w-md',
  lg: 'px-8 py-4 max-w-lg',
};

export type Variant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'transparent';

export const animatedBackground =
  'animated-background bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500';

export const animatedTextColor = 'animated-text-color text-gradient';
