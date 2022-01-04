import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import React from 'react';

export const CLMSDownloadableFileView = (props) => {
  const { content } = props;
  return (
    <>
      <div id="page-document" className="ui container">
        <h1 className="page-title">{content.title}</h1>
        <div className="event-detail">
          <div className="event-detail-content">
            <p>{content.description}</p>
          </div>
        </div>
        <CclButton download={true} url={content?.file?.download}>
          Download file
        </CclButton>
      </div>
    </>
  );
};

export default CLMSDownloadableFileView;
