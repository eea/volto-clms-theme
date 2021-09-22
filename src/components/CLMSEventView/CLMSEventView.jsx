import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
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
          <figcaption>{content?.description}</figcaption>
        </figure>
        <div class="event-detail-when">
          <i class="far fa-calendar-alt"></i>
          <div class="event-detail-when-text">
            {new Date(content?.effective).toLocaleDateString()} -{' '}
            {new Date(content?.end).toLocaleDateString()}
          </div>
        </div>
        <div class="event-detail-where">
          <i class="fas fa-map-marker-alt"></i>
          <div class="event-detail-where-text">{content?.location}</div>
        </div>
        <div className="event-detail-content">
          <StringToHTML string={content.text?.data || ''} />
        </div>
        <CclButton url="#" disabled={false}>
          {'Register here'}
        </CclButton>
      </div>
    </div>
  );
};

export default CLMSEventView;
