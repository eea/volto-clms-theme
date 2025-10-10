import React from 'react';
import './chatbot-floating-button.less';
import AssistantIcon from '@eeacms/volto-clms-theme/../theme/clms/img/assistant-icon-blue.svg';

const ChatbotFloatingButton = () => {
  return (
    <a
      href="/en/ask-observia-ai"
      className="chatbot-floating-button"
      aria-label="Open AI Assistant"
      title="Your smart CLMS guide"
    >
      <img src={AssistantIcon} alt="AI Assistant" />
    </a>
  );
};

export default ChatbotFloatingButton;
