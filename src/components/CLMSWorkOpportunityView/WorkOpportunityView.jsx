import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { UniversalLink } from '@plone/volto/components';
import { workOpportunitiesCclDateTimeFormat } from '@eeacms/volto-clms-theme/components/CclUtils';

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
  const lang = useSelector((state) => state.intl.locale);
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
            <UniversalLink href={content.url || ''}>
              {content.procurement_no}
            </UniversalLink>
          ) : (
            content.procurement_no
          )}
          <div className="card-work-line">
            <span className="card-work-title">
              {intl.formatMessage(messages.SubmissionDeadline)}
            </span>
            {workOpportunitiesCclDateTimeFormat(
              content.submission_deadline,
              lang,
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default CLMSWorkOpportunityView;
