import React from 'react';
import CclButton from '../CclButton/CclButton';

const CLMSTechnicalLibraryView = (props) => {
  const { content } = props;
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
                You are requesting an on-demand document. Please contact the
                service desk to obtain it.
              </p>

              <CclButton to={`/en/contact-service-helpdesk`}>
                Helpdesk
              </CclButton>
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
