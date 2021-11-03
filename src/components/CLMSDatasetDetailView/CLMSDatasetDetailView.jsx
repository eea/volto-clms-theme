/**
 * Full view component.
 * @module components/theme/View/CLMSDatasetDetailView
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclTabs from '@eeacms/volto-clms-theme/components/CclTab/CclTabs';
import {
  DataSetInfoContent,
  DownloadDataSetContent,
  MetadataContent,
} from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { injectIntl } from 'react-intl';
// import {
//   mockDatabaseInfo,
//   mockMetadata,
//   mockDownloadDataset,
// } from './mockDatasetInfo';
// import CclCitation from '../CclCitation/CclCitation';
// import { CclInfoContainer, CclInfoDescription } from '../CclInfoDescription';

/**
 * Full view component class.
 * @function CLMSDatasetDetailView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */

const CLMSDatasetDetailView = ({ content, token }) => {
  const location = useLocation();
  return (
    <div className="ccl-container ">
      <h1 className="page-title">{content.title}</h1>
      <CclTabs>
        <div tabTitle="General Info">{DataSetInfoContent(content)}</div>
        <div tabTitle="Metadata">{MetadataContent(content)}</div>
        {content.mapviewer_viewservice.length === 0 &&
        content.downloadable_files.items.length === 0 &&
        token !== '' ? (
          <div tabTitle=""></div>
        ) : (
          <div tabTitle="Download dataset">
            {DownloadDataSetContent(content)}
          </div>
        )}

        <div underPanel={true}>
          <nav className="left-menu-detail">
            {content?.image && (
              <div className="menu-detail-image">
                <img
                  src={content?.image?.scales?.mini?.download}
                  alt="Placeholder"
                />
              </div>
            )}
            {content?.mapviewer_viewservice.length > 0 && (
              <div className="menu-detail-button">
                <CclButton url={location.pathname + 'map-viewer'}>
                  View dataset on map viewer
                </CclButton>
              </div>
            )}
          </nav>
        </div>
      </CclTabs>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CLMSDatasetDetailView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Child items of the object
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Description of the item
         */
        description: PropTypes.string,
        /**
         * Url of the item
         */
        url: PropTypes.string,
        /**
         * Image of the item
         */
        image: PropTypes.object,
        /**
         * Image caption of the item
         */
        image_caption: PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default compose(
  injectIntl,
  connect((state) => ({
    token: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
  })),
)(CLMSDatasetDetailView);
