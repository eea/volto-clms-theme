import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  ProcurementNo: {
    id: 'ProcurementNo',
    defaultMessage: 'Procurement No:',
  },
  SubmissionDeadline: {
    id: 'SubmissionDeadline',
    defaultMessage: 'Submission deadline:',
  },
});

const CclWorkOpportunity = (props) => {
  const { item, intl } = props;
  return (
    <div className="card-work">
      <div className="card-work-number">
        <span className="card-work-number-title">
          {intl.formatMessage(messages.ProcurementNo)}
        </span>
        <a href={item.url || ''}>{item.procurement_no}</a>
      </div>
      <div className="card-work-title">
        <p>{item.description}</p>
      </div>
      <div className="work-opportunities-deadline">
        <span className="card-work-deadline-title">
          {intl.formatMessage(messages.SubmissionDeadline)}
        </span>
        {item.submission_deadline}
      </div>
    </div>
  );
};

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

var Today = formatDate(Date.now());

const CclListingWorkOpportunities = (props) => {
  const { items, variation } = props;
  const intl = useIntl();

  const regex = /CclWO/;
  const status = variation?.replace(regex, '');
  return (
    <>
      {items
        .filter(
          (item) =>
            item.submission_deadline < Today && status === 'OpenTenders',
        )
        .map((item, index) => (
          <CclWorkOpportunity
            key={index}
            item={item}
            intl={intl}
          ></CclWorkOpportunity>
        ))}
      {items
        .filter(
          (item) =>
            item.submission_deadline > Today && status === 'CloseTenders',
        )
        .map((item, index) => (
          <CclWorkOpportunity
            key={index}
            item={item}
            intl={intl}
          ></CclWorkOpportunity>
        ))}
    </>
  );
};

CclListingWorkOpportunities.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CclListingWorkOpportunities;
