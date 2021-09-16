import React from 'react';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

const CclProductLeftMenuView = (props) => {
  const { data, metadata } = props;
  let buttons = data?.buttons?.blocks_layout?.items.map(
    (uid) => data.buttons.blocks[uid],
  );

  return (
    <nav className="left-menu-detail">
      <div className="menu-detail-image">
        <img src={metadata?.image?.download} alt={metadata?.image?.filename} />
      </div>
      {buttons.map((button, index) => (
        <div key={index} className={'menu-detail-button'}>
          <CclButton
            url={
              button?.download && button?.href?.[0]?.['@type'] === 'File'
                ? button?.href?.[0]?.['@id'] + '/@@download/file'
                : button?.href?.[0]?.['@id']
            }
            disabled={button?.disabled}
            download={
              button?.download || button?.href?.[0]?.['@type'] === 'File'
            }
            target={
              button.target ||
              (button?.download &&
                button.href[0]['@type'] === 'File' &&
                '_blank')
            }
            mode={button.style}
          >
            {button.title || 'Text example...'}
          </CclButton>
        </div>
      ))}
    </nav>
  );
};

export default CclProductLeftMenuView;
