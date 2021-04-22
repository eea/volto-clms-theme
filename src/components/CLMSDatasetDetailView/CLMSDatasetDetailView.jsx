/**
 * Full view component.
 * @module components/theme/View/CLMSDatasetDetailView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CclButton from '@eea/volto-clms-theme/components/CclButton/CclButton';
import { CclTabs } from '@eea/volto-clms-theme/components/CclTab';
import { mockDatabaseInfo, mockMetadata, mockDownloadDataset } from './mockDatasetInfo';

/**
 * Full view component class.
 * @function CLMSDatasetDetailView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */

const CLMSDatasetDetailView = ({ content }) => {


    return (<>
        <div className="ccl-container ">
            <h1 className="page-title">{content.title}</h1>
            <CclTabs>
                <div label="Dataset Info">
                    {mockDatabaseInfo()}

                </div>

                <div label="Metadata">
                    {mockMetadata()}
                </div>
                <div label="Download dataset">
                    {mockDownloadDataset()}
                </div>

                <div underPanel={true}>
                    <nav class="left-menu-detail">
                        <div class="menu-detail-image">
                            <img src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg" alt="Placeholder image" />
                        </div>
                        <div class="menu-detail-button">
                            <CclButton>View dataset on map viewer</CclButton>
                        </div>
                    </nav>
                </div>
            </CclTabs>
        </div>
    </>)

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
      })
    ),
  }).isRequired,
};

export default CLMSDatasetDetailView;
