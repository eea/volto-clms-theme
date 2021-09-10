import React from 'react';
import { Header } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
export const CLMSMeetingSubscriberView = (props) => {
  const { content, intl } = props;

  const messages = defineMessages({
    user_name: {
      id: 'user_name',
      defaultMessage: 'User Name',
    },
    name: {
      id: 'name',
      defaultMessage: 'Name',
    },
    email: {
      id: 'email',
      defaultMessage: 'Email',
    },
    organisation: {
      id: 'organisation',
      defaultMessage: 'Organisation',
    },
    state: {
      id: 'state',
      defaultMessage: 'State',
    },
  });
  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>

      {content.user_name && (
        <>
          <div className="dataset-info-field">
            <div className="dataset-field-title">
              <Header>{intl.formatMessage(messages.user_name)}</Header>
            </div>
            <div className="dataset-field-description">{content.user_name}</div>
          </div>
        </>
      )}
      {content.name && (
        <>
          <div className="dataset-info-field">
            <div className="dataset-field-title">
              <Header>{intl.formatMessage(messages.name)}</Header>
            </div>
            <div className="dataset-field-description">{content.name}</div>
          </div>
        </>
      )}
      {content.email && (
        <>
          <div className="dataset-info-field">
            <div className="dataset-field-title">
              <Header>{intl.formatMessage(messages.email)}</Header>
            </div>
            <div className="dataset-field-description">{content.email}</div>
          </div>
        </>
      )}
      {content.review_state && (
        <>
          <div className="dataset-info-field">
            <div className="dataset-field-title">
              <Header>{intl.formatMessage(messages.state)}</Header>
            </div>
            <div className="dataset-field-description">
              {content.review_state}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default injectIntl(CLMSMeetingSubscriberView);
