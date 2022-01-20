import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import React, { Component } from 'react';
import { confirmSubscribe } from '../../actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Toast } from '@plone/volto/components';
import { defineMessages, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';

const messages = defineMessages({
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Your subscription have been confirmed',
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
    defaultMessage: 'There was an error while confirming your subscription',
  },
});

class NewsletterSubscriptionConfirmView extends Component {
  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
  }
  handlePost(e) {
    e.preventDefault();
    this.props
      .confirmSubscribe(this.props.match.params.id)
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
  connect(() => ({}), {
    confirmSubscribe,
  }),
)(NewsletterSubscriptionConfirmView);
