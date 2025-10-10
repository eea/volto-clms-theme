import React from 'react';
import { useLocation } from 'react-router-dom';
import './chatbot-floating-button.less';
import AssistantIcon from '@eeacms/volto-clms-theme/../theme/clms/img/assistant-icon-blue.svg';

const ChatbotFloatingButton = () => {
  const location = useLocation();

  // Disable button if URL contains "ask-observia"
  if (location.pathname.includes('ask-observia')) {
    return null;
  }

  return (
    <a
      href="/en/ask-observia-ai"
      className="chatbot-floating-button"
      aria-label="Open AI Assistant"
      target="_blank"
      rel="noopener noreferrer"
      title="Your smart CLMS guide"
    >
      <img src={AssistantIcon} alt="AI Assistant" />
    </a>
  );
};

export default ChatbotFloatingButton;
