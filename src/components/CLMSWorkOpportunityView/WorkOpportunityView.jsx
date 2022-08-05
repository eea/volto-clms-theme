import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { cclDateTimeFormat } from '@eeacms/volto-clms-theme/components/CclUtils';

const messages = defineMessages({
  ProcurementNo: {
    id: 'ProcurementNo',
    defaultMessage: 'Procurement No: ',
  },
  ReferenceNo: {
    id: 'ReferenceNo',
    defaultMessage: 'Reference No: ',
  },
  SubmissionDeadline: {
    id: 'SubmissionDeadline',
    defaultMessage: 'Submission deadline: ',
  },
});

const CLMSWorkOpportunityView = (props) => {
  const { content } = props;
  const intl = useIntl();
  const files =
    content.items !== undefined
      ? content.items.map((item) => (item['@type'] === 'File' ? item : null))
      : [];
  const index = files.indexOf(null);
  if (index > -1) {
    files.splice(index, 1);
  }
  return (
    <div className="ccl-container">
      <>
        <h1 className="page-title">{content.title}</h1>
        <div className="card-work-line">
          <span className="card-work-title">
            {content['@type'] === 'WorkOpportunity'
              ? intl.formatMessage(messages.ReferenceNo)
              : intl.formatMessage(messages.ProcurementNo)}
          </span>
          {content.url ? (
            <a href={content.url || ''}>{content.procurement_no}</a>
          ) : (
            content.procurement_no
          )}
          <div className="card-work-line">
            <span className="card-work-title">
              {intl.formatMessage(messages.SubmissionDeadline)}
            </span>
            {cclDateTimeFormat(content.submission_deadline)}
          </div>
        </div>
      </>
    </div>
  );
};

export default CLMSWorkOpportunityView;
