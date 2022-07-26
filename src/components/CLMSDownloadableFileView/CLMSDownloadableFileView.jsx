import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { Label, Container } from 'semantic-ui-react';

export const CLMSDownloadableFileView = (props) => {
  const { content } = props;

  const options = content.taxonomy_technical_library_categorization?.map(
    (cat) => {
      return {
        title:
          cat.title.split(' » ').length > 1
            ? cat.title.split(' » ').slice(-1).pop()
            : cat.title,
      };
    },
  );

  return (
    <>
      <Container className="view-wrapper">
        <div id="page-document" className="ui container">
          <h1 className="page-title">{content.title}</h1>
          <div>
            <p>{content.description}</p>
          </div>
          {options?.length > 0 && (
            <Label.Group>
              {options.map((cat, key) => {
                return (
                  <Label key={key} color="olive">
                    {cat.title}
                  </Label>
                );
              })}
            </Label.Group>
          )}{' '}
          <CclButton download={true} url={content?.file?.download}>
            Download file
          </CclButton>
        </div>
      </Container>
    </>
  );
};

export default CLMSDownloadableFileView;
