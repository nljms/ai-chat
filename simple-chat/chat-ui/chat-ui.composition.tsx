import { MemoryRouter } from 'react-router-dom';
import { ChatUi } from "./chat-ui.js";
    
export const ChatUiBasic = () => {
  return (
    <MemoryRouter>
      <ChatUi />
    </MemoryRouter>
  );
}