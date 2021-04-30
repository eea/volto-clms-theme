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

const CLMSDatasetDetailView = ({ content }) => {
  return (
    <div className="ccl-container ">
      <h1 className="page-title">{content.title}</h1>
      <CclTabs>
        <div tabTitle="Dataset Info">{DataSetInfoContent(content)}</div>
        <div tabTitle="Metadata">{MetadataContent(content)}</div>
        <div tabTitle="Download dataset">{DownloadDataSetContent(content)}</div>

        <div underPanel={true}>
          <nav className="left-menu-detail">
            <div className="menu-detail-image">
              <img
                src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                alt="Placeholder"
              />
            </div>
            <div className="menu-detail-button">
              <CclButton>View dataset on map viewer</CclButton>
            </div>
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

export default CLMSDatasetDetailView;
