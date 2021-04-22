/**
 * Full view component.
 * @module components/theme/View/CLMSDatasetDetailView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Image, Tab } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import CclButton from '@eea/volto-clms-theme/components/CclButton/CclButton';

/**
 * Full view component class.
 * @function CLMSDatasetDetailView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */

const CLMSDatasetDetailView = ({ content }) => {
  const panes = [
    {
      menuItem: 'Dataset info',
      render: () => (
        <Tab.Pane>
          <div class="validation-citation-container validation-container">
            <div class="validation-title">Validation status</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              luctus mauris ante, a iaculis leo placerat quis.
            </p>
          </div>
          <div class="dataset-info-container">
            <h2>Dataset info</h2>
            <div class="dataset-info-field">
              <div class="dataset-field-title">
                <h3>Resource title</h3>
                <span class="info-icon" tooltip="Info" direction="up">
                  <i class="fas fa-info-circle"></i>
                </span>
              </div>
              <div class="dataset-field-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                luctus mauris ante, a iaculis leo placerat quis.
              </div>
            </div>
            <div class="dataset-info-field">
              <div class="dataset-field-title">
                <h3>Resource abstract</h3>
                <span class="info-icon" tooltip="Info" direction="up">
                  <i class="fas fa-info-circle"></i>
                </span>
              </div>
              <div class="dataset-field-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                luctus mauris ante, a iaculis leo placerat quis. Sed tincidunt,
                dui sit amet ullamcorper efficitur, tortor metus hendrerit
                ipsum, et sodales elit velit sit amet dui. Nulla porttitor
                porttitor condimentum. Nunc non ornare tortor. Curabitur quis
                feugiat arcu, et tincidunt odio. Nullam varius lorem lacus, quis
                ullamcorper eros bibendum id. Etiam in vulputate magna. Quisque
                condimentum ipsum elementum tortor volutpat, a dapibus nisl
                lacinia. Proin urna dui, egestas in sapien pretium, placerat
                euismod dolor. Etiam turpis magna, auctor at gravida suscipit,
                feugiat ut magna. Duis laoreet laoreet ante nec dapibus. Ut
                ultrices est vel ligula commodo, pharetra tristique tellus
                consequat. Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas.
              </div>
            </div>
            <div class="dataset-info-field">
              <div class="dataset-field-title">
                <h3>Resource type</h3>
                <span class="info-icon" tooltip="Info" direction="up">
                  <i class="fas fa-info-circle"></i>
                </span>
              </div>
              <div class="dataset-field-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                luctus mauris ante, a iaculis leo placerat quis.
              </div>
            </div>
            <div class="dataset-info-field">
              <div class="dataset-field-title">
                <h3>Resource locator</h3>
                <span class="info-icon" tooltip="Info" direction="up">
                  <i class="fas fa-info-circle"></i>
                </span>
              </div>
              <div class="dataset-field-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                luctus mauris ante, a iaculis leo placerat quis.
              </div>
            </div>
          </div>
          <div class="dataset-info-documents dropdown">
            <div class="ccl-expandable__button" aria-expanded="true">
              <h2>Technical documents (X docs)</h2>
            </div>
            <div class="documents-dropdown">
              <div class="card-doc">
                <div class="card-doc-title">Doc title</div>
                <div class="card-doc-text">
                  <div class="doc-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis luctus mauris ante, a iaculis leo placerat quis.
                  </div>
                  <div class="card-doc-size">PDF X.X MB</div>
                </div>
              </div>
              <div class="card-doc">
                <div class="card-doc-title">Doc title</div>
                <div class="card-doc-text">
                  <div class="doc-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis luctus mauris ante, a iaculis leo placerat quis.
                  </div>
                  <div class="card-doc-size">PDF X.X MB</div>
                </div>
              </div>
            </div>
          </div>
          <div class="dataset-info-products">
            <h2>Found the dataset in this products</h2>
            <div class="card-container">
              <div class="card-block">
                <div class="card-image">
                  <img
                    src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                    alt="Placeholder image"
                  />
                </div>
                <div class="card-text">
                  <div class="card-title">Dataset title</div>
                  <div class="card-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis luctus mauris ante, a iaculis leo placerat quis. Nullam
                    vitae vulputate leo, et ultricies dolor.
                  </div>
                  <div class="card-button">
                    <a
                      href="../product-portfolio/product-overview/product-detail.html"
                      class="ccl-button ccl-button--default"
                    >
                      Access to product
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-block">
                <div class="card-image">
                  <img
                    src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                    alt="Placeholder image"
                  />
                </div>
                <div class="card-text">
                  <div class="card-title">Dataset title</div>
                  <div class="card-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis luctus mauris ante, a iaculis leo placerat quis. Nullam
                    vitae vulputate leo, et ultricies dolor.
                  </div>
                  <div class="card-button">
                    <a
                      href="../product-portfolio/product-overview/product-detail.html"
                      class="ccl-button ccl-button--default"
                    >
                      Access to product
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="validation-citation-container citation-container">
            <div class="citation-title">Dataset citation</div>
            <p>
              © European Union, Copernicus Land Monitoring Service{' '}
              <year>, European Environment Agency (EEA)</year>
            </p>
          </div>
        </Tab.Pane>
      ),
    },
    { menuItem: 'Metadata', render: () => <Tab.Pane>Metadata</Tab.Pane> },
    {
      menuItem: 'Download dataset',
      render: () => <Tab.Pane>Download dataset</Tab.Pane>,
    },
  ];
  return (
    <>
      <Container>
        <h1 className="page-title">{content.title}</h1>
        <Tab
          menu={{ fluid: true, vertical: true, attached: true }}
          panes={panes}
          menuPosition="left"
          grid={{ paneWidth: 9, tabWidth: 3 }}
        />
        <CclButton>View dataset on map viewer</CclButton>
      </Container>
    </>
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
      })
    ),
  }).isRequired,
};

export default CLMSDatasetDetailView;
