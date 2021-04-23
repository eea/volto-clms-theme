/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { getBreadcrumbs } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import './breadcrumbs.less';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  breadcrumbs: {
    id: 'Breadcrumbs',
    defaultMessage: 'Breadcrumbs',
  },
});

/**
 * Breadcrumbs container class.
 * @class Breadcrumbs
 * @extends Component
 */
class Breadcrumbs extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getBreadcrumbs: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    root: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    this.props.getBreadcrumbs(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getBreadcrumbs(getBaseUrl(nextProps.pathname));
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <>
        {this.props.items.length > 0 && (
          <nav
            aria-label={this.props.intl.formatMessage(messages.breadcrumbs)}
            className="ccl-breadcrumb"
          >
            <Container>
              <span className="ccl-u-sr-only">You are here:</span>
              <ol className="ccl-breadcrumb__segments-wrapper">
                <li className="ccl-breadcrumb__segment ccl-breadcrumb__segment--first">
                  <Link
                    to={this.props.root || '/'}
                    className="ccl-link ccl-link--inverted ccl-link--standalone ccl-breadcrumb__link"
                    title={this.props.intl.formatMessage(messages.home)}
                  >
                    {this.props.intl.formatMessage(messages.home)}
                  </Link>
                </li>
                {this.props.items.map((item, index, items) => [
                  index < items.length - 1 ? (
                    <li key={item.url} className="ccl-breadcrumb__segment">
                      <Link
                        to={item.url}
                        className="ccl-link ccl-link--inverted ccl-link--standalone ccl-breadcrumb__link"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ) : (
                    <li
                      key={item.url}
                      className="ccl-breadcrumb__segment ccl-breadcrumb__segment--last"
                    >
                      <span>{item.title}</span>
                    </li>
                  ),
                ])}
              </ol>
            </Container>
          </nav>
        )}
      </>
    );
  }
}

export const BreadcrumbsComponent = Breadcrumbs;
export default compose(
  injectIntl,
  connect(
    (state) => ({
      items: state.breadcrumbs.items,
      root: state.breadcrumbs.root,
    }),
    { getBreadcrumbs },
  ),
)(Breadcrumbs);
