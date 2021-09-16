import React from 'react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

export const CLMSEventView = (props) => {
  const { content } = props;
  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>
      <div className="event-detail">
        <div class="event-detail-date">
          {new Date(content?.effective).toLocaleDateString()}
        </div>
        <figure class="news-detail-image">
          <img
            src={
              content?.image
                ? content?.image?.download
                : 'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
            }
            alt={content?.image ? content?.image?.filename : 'Placeholder'}
          />
          {/* <figcaption>Lorem ipsum dolor sit amet</figcaption> */}
        </figure>
        <div className="event-detail-content">
          <StringToHTML string={content.text?.data || ''} />
        </div>
      </div>
    </div>
  );
};

export default CLMSEventView;
