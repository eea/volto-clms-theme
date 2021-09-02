import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

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
    all: {
      id: 'all',
      defaultMessage: 'All',
    },
  });

  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>

      <div className="ccl-container">
        <div className="event-detail">
          <div className="custom-table dataset-table">
            <table>
              <thead>
                <tr>
                  <th>{intl.formatMessage(messages.from)}</th>
                  <th>{intl.formatMessage(messages.recipients)}</th>
                  <th>{intl.formatMessage(messages.cc)}</th>
                  <th>{intl.formatMessage(messages.subject)}</th>
                  <th>{intl.formatMessage(messages.modified)}</th>
                  <th>{intl.formatMessage(messages.type)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{content.sender}</td>
                  <td>{content.receiver}</td>
                  <td>{content.cc}</td>
                  <td>{content.subject}</td>
                  <td>{content.modified}</td>
                  <td>{content.email_type}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(CLMSMeetingEmailView);
