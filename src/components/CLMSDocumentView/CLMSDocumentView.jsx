/**
 * Document view component.
 * @module components/theme/View/CLMSDocumentView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Container, Image } from 'semantic-ui-react';
import ContextNavigationComponent from '@plone/volto/components/theme/Navigation/ContextNavigation';
import CclCard from '@eea/volto-clms-theme/components/CclCard/CclCard';

/**
    this cards elements are used for testing until we have real contentTypes
  **/
var cards = [
  {
    title: 'Product Title 11',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.',
    image: {
      src:
        'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      alt: 'Image alt text',
    },
    absolute_url: '/en/product-portfolio/how-our-products-are-created',
  },
  {
    title: 'Product Title 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.',
    image: {
      src:
        'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      alt: 'Image alt text',
    },
    absolute_url: '/en/product-portfolio/how-our-products-are-created',
  },
  {
    title: 'Product Title 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.',
    image: {
      src:
        'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      alt: 'Image alt text',
    },
    absolute_url: '/en/product-portfolio/how-our-products-are-created',
  },
  {
    title: 'Product Title 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.',
    image: {
      src:
        'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      alt: 'Image alt text',
    },
    absolute_url: '/en/product-portfolio/how-our-products-are-created',
  },
];

/**
 * Component to display the default view.
 * @function CLMSDocumentView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const CLMSDocumentView = ({ content, intl, location }) => {
  return (
    <Container id="page-document" className="page-section">
      <h1 className="page-title">{content.title}</h1>
      <div className="ccl-container ccl-container-flex">
        <div className="left-content cont-w-25">
          <ContextNavigationComponent pathname={location.pathname} />
        </div>
        <div className="rigth-content cont-w-75">
          <div className="product-block">
            {content.description && <h2>{content.description}</h2>}
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
          {cards && (
            <div className="card-container">
              {cards.map((card, index) => (
                <CclCard key={index} type={'line'} card={card} />
              ))}
            </div>
          )}
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
