import React from 'react';
import cx from 'classnames';
import './chatbot-banner-block.less';
import AssistantIcon from '@eeacms/volto-clms-theme/../theme/clms/img/assistant-icon.svg';

const ChatbotBannerBlockView = ({ data, isEditMode }) => {
  const { title, text, buttonText, buttonLink } = data;

  return (
    <div
      className={cx('chatbot-banner-block', 'ccl-container', {
        edit: isEditMode,
      })}
    >
      <div className="chatbot-banner-inner">
        <div className="chatbot-banner-left">
          <img src={AssistantIcon} alt="" className="chatbot-banner-icon" />
          <p className="chatbot-banner-title">
            {title || 'Your smart CLMS guide'}
          </p>
        </div>

        {text && <p className="chatbot-banner-text">{text}</p>}

        {buttonText && (
          <a
            href={buttonLink || '#'}
            className="chatbot-banner-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default ChatbotBannerBlockView;
