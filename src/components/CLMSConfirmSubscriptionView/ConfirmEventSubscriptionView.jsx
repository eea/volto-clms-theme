import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import React, { Component } from 'react';
import { confirmSubscribeToEvent } from '../../actions';
import { injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Loader } from 'semantic-ui-react';
import { Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';

const messages = defineMessages({
  errorMessage: {
    id: 'An error has occured. Please try again',
    defaultMessage: 'An error has occured. Please try again',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

class ConfirmEventSubscriptionView extends Component {
  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
  }

  requestErrorToast = () => {
    toast.error(
      <Toast
        error
        title={this.props.intl.formatMessage(messages.error)}
        content={this.props.error_message}
      />,
    );
  };

  handlePost(e) {
    e.preventDefault();
    this.props.confirmSubscribeToEvent(this.props.confirmation_id).catch(() => {
      this.props.error && this.requestErrorToast();
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
          <CclButton onClick={this.handlePost}>
            {!this.props.loading ? (
              'Confirm'
            ) : (
              <Loader active inline indeterminate size="small" />
            )}
          </CclButton>
        </div>
      </>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      confirmation_id: props.match.params.id,
      loaded: state.subscribe_to_event.confirm_subscribe.loaded,
      loading: state.subscribe_to_event.confirm_subscribe.loading,
      error: state.subscribe_to_event.confirm_subscribe.error,
      error_message: state.subscribe_to_event.confirm_subscribe.error_message,
    }),
    { confirmSubscribeToEvent },
  ),
)(ConfirmEventSubscriptionView);
