import React from 'react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

const CLMSNewsItemView = (props) => {
  const { content } = props;
  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>
      <div className="news-detail">
        <img
          src={
            content?.image
              ? content?.image?.download
              : 'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
          }
          alt={content?.image ? content?.image?.filename : 'Placeholder'}
        />
        <div className="news-detail-content">
          <StringToHTML string={content.text?.data || ''} />
        </div>
      </div>
    </div>
  );
};

export default CLMSNewsItemView;
