import { Routes, Route } from 'react-router-dom';
// import '@learnbit/styling.config.tailwind/globals.tailwind.css';

import Home from './pages/home.js';

export function ChatUi() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
    </Routes>
  );
}
