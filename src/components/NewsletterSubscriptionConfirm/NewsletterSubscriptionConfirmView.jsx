import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import React, { Component } from 'react';
import { confirmSubscribe } from '../../actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser, updateUser } from '@plone/volto/actions';
import { Toast } from '@plone/volto/components';
import { defineMessages, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { getBaseUrl } from '@plone/volto/helpers';

const messages = defineMessages({
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Your subscription have been confirmed',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

class NewsletterSubscriptionConfirmView extends Component {
  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
  }
  handlePost(e) {
    e.preventDefault();
    this.props.confirmSubscribe(this.props.match.params.id).then(() => {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.saved)}
        />,
      );
    });
  }
  render() {
    return (
      <>
        <div id="page-document" className="ui container">
          <h1 className="page-title">Newsletter Subscription Confirm</h1>
          <div className="event-detail">
            <div className="event-detail-content">
              <p>Click on the button bellow to confirm your subscription</p>
            </div>
          </div>
          <CclButton onClick={this.handlePost}>Confirm</CclButton>
        </div>
      </>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      user: state.users.user,
      userId: state.userSession.token,
      loaded: state.users.get.loaded,
      loading: state.users.update.loading,
      userschema: state.userschema,
    }),
    { getUser, updateUser, getBaseUrl, confirmSubscribe },
  ),
)(NewsletterSubscriptionConfirmView);
