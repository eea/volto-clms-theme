import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import React, { useEffect } from 'react';
import { Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { getBreadcrumbs } from '@plone/volto/actions';

export const CLMSDownloadableFileView = (props) => {
  const dispatch = useDispatch();
  const { content } = props;
  useEffect(() => {
    dispatch(getBreadcrumbs('/'));
  }, [dispatch]);
  return (
    <>
      <div id="page-document" className="ui container">
        <h1 className="page-title">{content.title}</h1>
        <div className="event-detail">
          <div className="event-detail-content">
            <p>{content.description}</p>
          </div>
        </div>
        {content?.subjects && content?.subjects?.length > 0 && (
          <Label.Group>
            {content?.taxonomy_technical_library_categorization?.map(
              (keyword, key) => {
                return (
                  <Label key={key} color="olive">
                    {keyword.title}
                  </Label>
                );
              },
            )}
          </Label.Group>
        )}
        <CclButton download={true} url={content?.file?.download}>
          Download file
        </CclButton>
      </div>
    </>
  );
};

export default CLMSDownloadableFileView;
