/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { getSubscribers } from '../../actions';
import { getUser, updateUser } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';

/**
 * CLMSProfileView class.
 * @class CLMSProfileView
 * @extends Component
 */
class CLMSNewsletterSubscriberView extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.getSubscribers();
    // var data = this.props.getSubscribers()
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
          <CclButton mode={'filled'} download={true} onClick={this.handleClick}>
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
      user: state.users.user,
      loaded: state.users.get.loaded,
      loading: state.users.update.loading,
      userschema: state.userschema,
    }),
    { getUser, updateUser, getBaseUrl, getSubscribers },
  ),
)(CLMSNewsletterSubscriberView);
