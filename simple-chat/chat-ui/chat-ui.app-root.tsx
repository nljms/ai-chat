import { BrowserRouter } from 'react-router-dom';
import {
  createRoot,
  // hydrateRoot
} from 'react-dom/client';
import { ChatUi } from './chat-ui.js';

import './styles/main.css';
/**
 * comment this in for server-side rendering (ssr) and comment
 * out of the root.render() invocation below.
 */
// hydrateRoot(
//   document.getElementById('root') as HTMLElement,
//   <BrowserRouter>
//     <ChatUi />
//   </BrowserRouter>
// );

/**
 * mounting for client side rendering.
 */
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <ChatUi />
  </BrowserRouter>
);
