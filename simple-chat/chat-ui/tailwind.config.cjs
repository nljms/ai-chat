/** @type {import('tailwindcss').Config} */

console.log('test', process.cwd());
module.exports = {
  // content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}'],
  // update the `content` key to include the paths to your pages and components
  content: ['./simple-chat/chat-ui/**/*.{html,js,ts,tsx}'],
  // ...
};
