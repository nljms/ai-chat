export const variants = {
  primary:
    'animated-background bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold rounded',
  secondary: 'bg-blue-200 text-blue-500',
  danger: 'bg-red-500 text-white',
  success: 'bg-green-500 text-white',
  transparent: 'bg-inherit text-slate-300',
};

export type Variant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'transparent';
