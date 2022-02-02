import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { getExtraBreadcrumbItems } from '../../actions';
import { getBreadcrumbs } from '../../../../../../node_modules/@plone/volto/src/actions';

export const CLMSDownloadableFileView = (props) => {
  const dispatch = useDispatch();
  const { content } = props;

  useEffect(() => {
    // dispatch(getExtraBreadcrumbItems([]));
    dispatch(getBreadcrumbs([]));
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
        <CclButton download={true} url={content?.file?.download}>
          Download file
        </CclButton>
      </div>
    </>
  );
};

export default CLMSDownloadableFileView;
