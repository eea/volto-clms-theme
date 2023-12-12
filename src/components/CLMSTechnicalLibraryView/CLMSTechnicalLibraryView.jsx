import React from 'react';
import CclButton from '../CclButton/CclButton';

const CLMSTechnicalLibraryView = (props) => {
  const { content } = props;

  const textToForm = encodeURIComponent(
    `I want the following document ${content.title} ${content['@id']}`,
  );

  return (
    <div className="ccl-container">
      <>
        <h1 className="page-title">{content.title}</h1>
        {content.description && (
          <div className="technicallibrary-description">
            {content.description}
          </div>
        )}
        <div className="technicallibrary-content">
          {content.ondemand ? (
            <>
              <p>
                You are requesting an on-demand document. Please contact the{' '}
                <a href={`/en/contact-service-helpdesk?text=${textToForm}`}>
                  service desk
                </a>{' '}
                to obtain it.
              </p>
            </>
          ) : (
            <>
              <p>You can download the file using this link</p>
              <CclButton
                url={`${content['@id']}/@@download/file`}
                download={true}
                target="_blank"
              >
                Download File
              </CclButton>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default CLMSTechnicalLibraryView;
