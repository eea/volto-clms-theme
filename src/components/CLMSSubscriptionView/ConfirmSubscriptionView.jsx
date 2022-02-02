import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import React, { Component } from 'react';
import { confirmSubscribeTo, confirmUnsubscribeTo } from '../../actions';
import { injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Loader } from 'semantic-ui-react';
import { Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';
import { getSubscriptionConfig } from './subscription_utils';
import { NotFound } from '@plone/volto/components';

const messages = defineMessages({
  suscriptionConfirm: {
    id: '{type} {subscribe_or_unsubscribe} confirm',
    defaultMessage: '{type} {subscribe_or_unsubscribe} confirm',
  },
  description: {
    id: 'Click on the button bellow to confirm your {subscribe_or_unsubscribe}',
    defaultMessage:
      'Click on the button bellow to confirm your {subscribe_or_unsubscribe}',
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
    };
  }

  componentDidMount() {
    const type_conf = getSubscriptionConfig(this.props.type);
    this.setState({ type_conf });
  }
  requestSuccessToast = () => {
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
  render() {
    return (
      <>
        {this.state.type_conf ? (
          <div id="page-document" className="ui container">
            <h1 className="page-title">
              {this.props.intl.formatMessage(messages.suscriptionConfirm, {
                type:
                  this.props.type[0].toUpperCase() + this.props.type.slice(1),
                subscribe_or_unsubscribe: this.props.isUnsubscribe
                  ? 'unsubscribe'
                  : 'subscribe',
              })}
            </h1>
            <div className="event-detail">
              <div className="event-detail-content">
                <p>
                  {this.props.intl.formatMessage(messages.description, {
                    subscribe_or_unsubscribe: this.props.isUnsubscribe
                      ? 'unsubscribe'
                      : 'subscribe',
                  })}
                </p>
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
