import { Routes, Route } from 'react-router-dom';

import Home from './pages/home.page.js';

export function ChatUi() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
    </Routes>
  );
}
