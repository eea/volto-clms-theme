/**
 * Search widget component.
 * @module components/theme/SearchWidget/SearchWidget
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  searchSite: {
    id: 'Search Site',
    defaultMessage: 'Search Site',
  },
});

/**
 * SearchWidget component class.
 * @class SearchWidget
 * @extends Component
 */
class SearchWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      text: '',
    };
  }

  /**
   * On change text
   * @method onChangeText
   * @param {object} event Event object.
   * @param {string} value Text value.
   * @returns {undefined}
   */
  onChangeText(event, { value }) {
    this.setState({
      text: value,
    });
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {event} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {
    const path =
      this.props.pathname?.length > 0
        ? `&path=${encodeURIComponent(this.props.pathname)}`
        : '';
    this.props.history.push(
      `/search?SearchableText=${encodeURIComponent(this.state.text)}${path}`,
    );
    // reset input value
    this.setState({
      text: '',
    });
    event.preventDefault();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Form
        className="ccl-header-search"
        action="/global-search"
        onMouseOut={(e) => {
          if (e.relatedTarget) {
            if (
              !e.relatedTarget.offsetParent.classList.contains(
                'ccl-header-search',
              )
            ) {
              this.props.setHeaderState({ mobileSearchBoxOpen: false });
            }
          } else {
            this.props.setHeaderState({ mobileSearchBoxOpen: false });
          }
        }}
        onBlur={(e) => {
          if (e.relatedTarget) {
            if (
              !e.relatedTarget.offsetParent.classList.contains(
                'ccl-header-search',
              )
            ) {
              this.props.setHeaderState({ mobileSearchBoxOpen: false });
            }
          } else {
            this.props.setHeaderState({ mobileSearchBoxOpen: false });
          }
        }}
      >
        <Input
          aria-label={this.props.intl.formatMessage(messages.search)}
          onChange={this.onChangeText}
          name="SearchableText"
          value={this.state.text}
          autoComplete="off"
          placeholder={this.props.intl.formatMessage(messages.searchSite)}
          title={this.props.intl.formatMessage(messages.search)}
        />
        <button
          type="submit"
          aria-label={this.props.intl.formatMessage(messages.search)}
          onClick={this.onSubmit}
        >
          <span
            className="ccl-icon-zoom"
            role="button"
            onClick={this.onSubmit}
            onKeyDown={this.onSubmit}
            tabIndex={0}
          ></span>
        </button>
      </Form>
    );
  }
}

export default compose(withRouter, injectIntl)(SearchWidget);
