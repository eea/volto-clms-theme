import React, { useEffect } from 'react';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { getBreadcrumbs } from '../../../../../../node_modules/@plone/volto/src/actions';
import { useDispatch } from 'react-redux';
import { Label } from 'semantic-ui-react';

export const CLMSDownloadableFileView = (props) => {
  const dispatch = useDispatch();
  const { content } = props;

  useEffect(() => {
    dispatch(getBreadcrumbs([]));
  }, [dispatch]);

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
      <div id="page-document" className="ui container">
        <h1 className="page-title">{content.title}</h1>
        <div className="event-detail">
          <div className="event-detail-content">
            <p>{content.description}</p>
          </div>
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
    </>
  );
};

export default CLMSDownloadableFileView;
