import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

export const CLMSEventView = (props) => {
  const { content } = props;
  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>
      <div className="event-detail">
        <div className="event-detail-date">
          {new Date(content?.effective).toLocaleDateString()}
        </div>
        {content?.image && (
          <figure className="news-detail-image">
            <img
              src={
                content?.image
                  ? content?.image?.download
                  : 'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
              }
              alt={content?.image ? content?.image?.filename : 'Placeholder'}
            />
            <figcaption>{content?.image_caption}</figcaption>
          </figure>
        )}
        <div className="event-detail-when">
          <FontAwesomeIcon icon={['far', 'calendar-alt']} />
          <div className="event-detail-when-text">
            {new Date(content?.start).toLocaleDateString()} -{' '}
            {new Date(content?.end).toLocaleDateString()}
          </div>
        </div>
        {content?.location ? (
          <div className="event-detail-where">
            <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />{' '}
            <div className="event-detail-where-text">{content?.location}</div>
          </div>
        ) : (
          ''
        )}
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
