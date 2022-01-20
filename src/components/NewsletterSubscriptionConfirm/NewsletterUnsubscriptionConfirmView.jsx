import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import React, { Component } from 'react';
import { confirmUnsubscribe } from '../../actions';
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
    defaultMessage: 'Your unsubscription have been confirmed',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  errorMessage: {
    id: 'Error message',
    defaultMessage: 'There was an error while confirming your unsubscription',
  },
});

class NewsletterUnsubscriptionConfirmView extends Component {
  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
  }
  handlePost(e) {
    e.preventDefault();
    this.props
      .confirmUnsubscribe(this.props.match.params.id)
      .then(() => {
        toast.success(
          <Toast
            success
            title={this.props.intl.formatMessage(messages.success)}
            content={this.props.intl.formatMessage(messages.saved)}
          />,
        );
      })
      .catch(() => {
        toast.error(
          <Toast
            error
            title={this.props.intl.formatMessage(messages.error)}
            content={this.props.intl.formatMessage(messages.errorMessage)}
          />,
        );
      });
  }
  render() {
    return (
      <>
        <div id="page-document" className="ui container">
          <h1 className="page-title">Newsletter Unsubscription Confirm</h1>
          <div className="event-detail">
            <div className="event-detail-content">
              <p>Click on the button bellow to confirm your unsubscription</p>
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
    { getUser, updateUser, getBaseUrl, confirmUnsubscribe },
  ),
)(NewsletterUnsubscriptionConfirmView);
