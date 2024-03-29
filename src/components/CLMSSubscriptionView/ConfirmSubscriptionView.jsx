import { NotFound, Toast } from '@plone/volto/components';
import React, { Component } from 'react';
import { confirmSubscribeTo, confirmUnsubscribeTo } from '../../actions';
import { defineMessages, injectIntl } from 'react-intl';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { Loader } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getSubscriptionConfig } from './subscription_utils';
import { toast } from 'react-toastify';

const messages = defineMessages({
  suscriptionConfirm: {
    id: '{type} {subscribe_or_unsubscribe} confirmation',
    defaultMessage: '{type} {subscribe_or_unsubscribe} confirmation',
  },
  description: {
    id: 'Click on the button below to confirm your {subscribe_or_unsubscribe}',
    defaultMessage:
      'Click on the button below to confirm your {subscribe_or_unsubscribe}',
  },
  process_finished: {
    id: 'Your {subscribe_or_unsubscribe} request was processed correctly',
    defaultMessage:
      'Your {subscribe_or_unsubscribe} request was processed correctly',
  },
  errorMessage: {
    id: 'An error has occured. Please try again',
    defaultMessage: 'An error has occured. Please try again',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Changes saved',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

class ConfirmSubscriptionView extends Component {
  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
    this.state = {
      type_conf: null,
      action_completed: false,
    };
  }

  componentDidMount() {
    const type_conf = getSubscriptionConfig(this.props.type);
    this.setState({ type_conf });
  }
  requestSuccessToast = () => {
    this.setState({ action_completed: true });
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.saved)}
      />,
    );
  };

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
    if (this.props.isUnsubscribe) {
      this.props
        .confirmUnsubscribeTo(
          this.state.type_conf.back_url,
          this.props.confirmation_id,
        )
        .then(() => this.props.loaded && this.requestSuccessToast())
        .catch(() => this.props.error && this.requestErrorToast());
    } else {
      this.props
        .confirmSubscribeTo(
          this.state.type_conf.back_url,
          this.props.confirmation_id,
        )
        .then(() => this.props.loaded && this.requestSuccessToast())
        .catch(() => this.props.error && this.requestErrorToast());
    }
  }

  ButtonText = (loading) => {
    return loading ? (
      'Confirm'
    ) : (
      <Loader active inline indeterminate size="small" />
    );
  };

  render() {
    const ButtonText = this.ButtonText;
    return (
      <>
        {this.state.type_conf ? (
          <div id="page-document" className="ui container">
            <h1 className="page-title">
              {this.props.intl.formatMessage(messages.suscriptionConfirm, {
                type:
                  this.state.type_conf.name[0].toUpperCase() +
                  this.state.type_conf.name.slice(1),
                subscribe_or_unsubscribe: this.props.isUnsubscribe
                  ? 'unsubscription'
                  : 'subscription',
              })}
            </h1>
            {this.state.action_completed ? (
              <div className="event-detail">
                <div className="event-detail-content">
                  <p>
                    {this.props.intl.formatMessage(messages.process_finished, {
                      subscribe_or_unsubscribe: this.props.isUnsubscribe
                        ? 'unsubscription'
                        : 'subscription',
                    })}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="event-detail">
                  <div className="event-detail-content">
                    <p>
                      {this.props.intl.formatMessage(messages.description, {
                        subscribe_or_unsubscribe: this.props.isUnsubscribe
                          ? 'unsubscription'
                          : 'subscription',
                      })}
                    </p>
                  </div>
                </div>
                <CclButton onClick={this.handlePost}>
                  <ButtonText loading={this.props.loading} />
                </CclButton>
              </>
            )}
          </div>
        ) : (
          <NotFound />
        )}
      </>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      loaded: state.subscription.loaded,
      loading: state.subscription.loading,
      error: state.subscription.error,
      error_message: state.subscription.error_message,
      confirmation_id: props.match.params.id,
      type: props.match.params.type,
      isUnsubscribe: props?.route?.extraParams?.unsubscribe || false,
    }),
    { confirmSubscribeTo, confirmUnsubscribeTo },
  ),
)(ConfirmSubscriptionView);
