/**
 * Document view component.
 * @module components/theme/View/CLMSDocumentView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

import { Container, Image } from 'semantic-ui-react';
import { map } from 'lodash';

import { blocks } from '~/config';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBaseUrl,
} from '@plone/volto/helpers';

import ContextNavigationComponent from '@plone/volto/components/theme/Navigation/ContextNavigation';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

/**
 * Component to display the default view.
 * @function CLMSDocumentView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const CLMSDocumentView = ({ content, intl, location }) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  return (
    <Container id="page-document" className="page-section">
      <h1 className="page-title">{content.title}</h1>
      <div className="ccl-container ccl-container-flex">
        <div className="left-content cont-w-25">
          <ContextNavigationComponent pathname={location.pathname} />
        </div>
        <div class="rigth-content cont-w-75">
          <div class="product-block">
            {content.description && (
              <h2>{content.description}</h2>
            )}
            {content.image && (
              <Image
                className="document-image"
                src={content.image.scales.thumb.download}
                floated="right"
              />
            )}
            {content.remoteUrl && (
              <span>
                The link address is:
                <a href={content.remoteUrl}>{content.remoteUrl}</a>
              </span>
            )}
            {content.text && (
              <div
                dangerouslySetInnerHTML={{
                  __html: content.text.data,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CLMSDocumentView.propTypes = {
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
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default injectIntl(CLMSDocumentView);
