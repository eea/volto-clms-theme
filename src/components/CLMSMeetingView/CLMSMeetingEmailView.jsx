import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Header, Segment } from 'semantic-ui-react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import { cclDateTimeFormat } from '@eeacms/volto-clms-theme/components/CclUtils';

export const CLMSMeetingEmailView = (props) => {
  const { content, intl } = props;

  const messages = defineMessages({
    from: {
      id: 'from',
      defaultMessage: 'From',
    },
    recipients: {
      id: 'recipients',
      defaultMessage: 'Recipients',
    },
    cc: {
      id: 'cc',
      defaultMessage: 'CC',
    },
    subject: {
      id: 'subject',
      defaultMessage: 'Subject',
    },
    modified: {
      id: 'modified',
      defaultMessage: 'Modified',
    },
    type: {
      id: 'type',
      defaultMessage: 'Type',
    },
    body: {
      id: 'body',
      defaultMessage: 'Body',
    },
    all: {
      id: 'all',
      defaultMessage: 'All',
    },
  });

  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>

      <div className="ccl-container">
        <Segment color={'olive'}>
          <Header as="h2">{intl.formatMessage(messages.from)}</Header>
          <p>{content.sender}</p>
          <Header as="h2">{intl.formatMessage(messages.recipients)}</Header>
          <p>
            {content.receiver.map((receiver, index) => (
              <span key={index}>
                {index !== 0 && ', '}
                {receiver.title}
              </span>
            ))}
          </p>
          <Header as="h2">{intl.formatMessage(messages.cc)}</Header>
          <p>{content.cc}</p>
          <Header as="h2">{intl.formatMessage(messages.subject)}</Header>
          <p>{content.subject}</p>
          <Header as="h2">{intl.formatMessage(messages.modified)}</Header>
          <p>{cclDateTimeFormat(content.modified)}</p>
          <Header as="h2">{intl.formatMessage(messages.type)}</Header>
          <p>{content.email_type}</p>
          <Header as="h2">{intl.formatMessage(messages.body)}</Header>
          <StringToHTML string={content.body || ''} />
        </Segment>
      </div>
    </div>
  );
};

export default injectIntl(CLMSMeetingEmailView);
