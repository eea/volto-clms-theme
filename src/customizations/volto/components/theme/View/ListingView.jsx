/**
 * Document view component.
 * @module components/theme/View/ListingView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Segment, Container, Image } from 'semantic-ui-react';

import { defineMessages, useIntl } from 'react-intl';
const messages = defineMessages({
  datasetSearchPlaceholder: {
    id: 'Search datasets',
    defaultMessage: 'Search datasets',
  },
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});
import CclCard from '@eea/volto-clms-theme/components/CclCard/CclCard'; 
import CclVerticalFilterMenu from '@eea/volto-clms-theme/components/CclVerticalFilterMenu/CclVerticalFilterMenu'; 
import CclExpandableFilter from '@eea/volto-clms-theme/components/CclExpandableFilter/CclExpandableFilter'; 

/**
 * List view component class.
 * @function ListingView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ListingView = ({ content, pathname }) => {

  const intl = useIntl();

  /**
    this cards and filters elements are used for testing until we have real contentTypes
  **/
  var cards = [
    {
      "title": "Dataset Title 11",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.",
      "image": {
        "src": "https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
        "alt": "Image alt text",
      },
      "absolute_url": "/login",
    },{
      "title": "Dataset Title 2",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.",
      "image": {
        "alt": "Image alt text",
      },
      "absolute_url": "/login",
    },{
      "title": "Dataset Title 3",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.",
      "image": {
        "src": "https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
        "alt": "Image alt text",
      },
      "absolute_url": "/login",
    },{
      "title": "Dataset Title 4",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.",
      "image": {
        "src": "https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
        "alt": "Image alt text",
      },
      "absolute_url": "/login",
    },
  ]
  /**
    this cards and filters elements are used for testing until we have real contentTypes
  **/
  var filters = [
    {
      "title":"Sort By", 
      "children": <>
                <div className="ccl-form-group">
                  <input type="checkbox" id="sort-by-name" name="field_gdpr[value]" value="name" className="ccl-checkbox ccl-required ccl-form-check-input" aria-required="true" />
                  <label className="ccl-form-check-label" htmlFor="sort-by-name">
                    <span>Name</span>
                  </label>
                </div>
                <div className="ccl-form-group">
                  <input type="checkbox" id="sort-by-date" name="field_gdpr[value]" value="date" className="ccl-checkbox ccl-required ccl-form-check-input" aria-required="true" />
                  <label className="ccl-form-check-label" htmlFor="sort-by-date">
                    <span>Date</span>
                  </label>
                </div>
               </>, 
    },
    {
      "title": "Type of resources",
      "children": <div class="ccl-form-group">
                  <input type="checkbox" id="resources_" name="field_gdpr[value]" value="..." class="ccl-checkbox ccl-required ccl-form-check-input" aria-required="true" />
                  <label class="ccl-form-check-label" for="resources_">...</label>
                </div>,
    },
    {
      "title": "GEMET keyword",
      "children": <div class="ccl-form-group">
                  <input type="checkbox" id="resources_" name="field_gdpr[value]" value="..." class="ccl-checkbox ccl-required ccl-form-check-input" aria-required="true" />
                  <label class="ccl-form-check-label" for="resources_">...</label>
                </div>,
    }
  ]

  return (
    <Container id="page-home" className="page-section">
      <h1 className="page-title">{content.title}</h1>
      <div className="page-description">{content.description}</div>
      <form className="ccl-form search-form">
        <input type="text" className="ccl-text-input" id="datasets_search" name="" placeholder={intl.formatMessage(messages.datasetSearchPlaceholder)} aria-label={messages.datasetSearchPlaceholder} />
        <button className="ccl-button" type="submit" aria-label={intl.formatMessage(messages.search)}>
          <span className="ccl-icon-zoom"></span>
        </button>
      </form>
      <div className="search-results">
        <span>Displaying</span> <span className="search-results-current">1 - 10</span> of <span className="search-results-total"></span>300
      </div>
      <hr />
      <div className="ccl-container ccl-container-flex">
        <div className="right-content cont-w-25 cont-o-1">
          <CclVerticalFilterMenu filters={filters} />
        </div>
        <div className="left-content cont-w-75">
          <div className="card-container">
          {cards.map((card) => (
            <CclCard key={card['@id']} type="line" card={card} />
            ))
          }
          </div>
        </div>
      </div>
    </Container>
  );}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ListingView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        description: PropTypes.string,
        review_state: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default ListingView;
