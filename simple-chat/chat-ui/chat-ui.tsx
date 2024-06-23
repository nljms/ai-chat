import { Routes, Route } from 'react-router-dom';

import Home from './pages/home.page.js';
import NotFoundPage from './pages/notfound.page.js';
import ErrorPage from './pages/error.page.js';

export function ChatUi() {
  return (
    <Routes>
      <Route path="/" Component={Home} errorElement={<ErrorPage />} />
      <Route path="*" Component={NotFoundPage} />
    </Routes>
  );
}
