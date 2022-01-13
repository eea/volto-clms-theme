/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { getSubscribers } from '../../actions';

/**
 * CLMSProfileView class.
 * @class CLMSProfileView
 * @extends Component
 */
class CLMSNewsletterSubscriberView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribers: [],
    };
  }
  componentDidMount() {
    this.props.getSubscribers();
    this.setState({
      subscribers: ['undefined', 'froga'],
    });
  }
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container>
        <div>
          <h1 className="page-title">
            Download a list of newsletter subscribers
          </h1>
          <p>
            Click in the button bellow to download a list of all the newsletter
            subscribers.
          </p>
          <CclButton
            mode={'filled'}
            download={true}
            onclick={this.props.getSubscribers()}
          >
            Download
          </CclButton>
        </div>
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      subscribers: state.subscribers,
    }),
    { getSubscribers },
  ),
)(CLMSNewsletterSubscriberView);
