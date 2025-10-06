import React from 'react';
import cx from 'classnames';
import './chatbot-banner-block.less';

const ChatbotBannerBlockView = ({ data, isEditMode }) => {
  const { logo, logoLink, text, buttonText, buttonLink } = data;

  const logoImage = logo ? (
    <img src={logo} alt="Logo" className="chatbot-banner-logo" />
  ) : null;

  return (
    <div
      className={cx('chatbot-banner-block', 'ccl-container', {
        edit: isEditMode,
      })}
    >
      <div className="chatbot-banner-inner">
        {logo &&
          (logoLink ? (
            <a
              href={logoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="chatbot-banner-logo-link"
            >
              {logoImage}
            </a>
          ) : (
            logoImage
          ))}

        <p className="chatbot-banner-text">{text || 'Your smart CLMS guide'}</p>

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
