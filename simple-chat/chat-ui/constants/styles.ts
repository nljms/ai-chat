export const variants = {
  primary:
    'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded',
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
