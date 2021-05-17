import React from 'react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

export const EventDetailView = (content) => {
  return (
    <div className="ccl-container">
      <div className="event-detail">
        <img
          src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
          alt="Placeholder"
        ></img>
        <div className="event-detail-content">
          <StringToHTML string={content.text?.data || ''} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailView;
