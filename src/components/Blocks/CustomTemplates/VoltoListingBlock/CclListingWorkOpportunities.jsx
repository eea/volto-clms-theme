import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const messages = defineMessages({
  ProcurementNo: {
    id: 'ProcurementNo',
    defaultMessage: 'Procurement No:',
  },
  ReferenceNo: {
    id: 'ReferenceNo',
    defaultMessage: 'Reference No:',
  },
  SubmissionDeadline: {
    id: 'SubmissionDeadline',
    defaultMessage: 'Submission deadline:',
  },
});

const CclWorkOpportunity = (props) => {
  const { item, intl, user } = props;
  return (
    <div className="card-work">
      {user.roles && user.roles.includes('Manager') && (
        <>
          <Link to={item['@id'] + '/edit'}>Edit</Link>
          <br />
          <br />
        </>
      )}
      <div className="card-work-number">
        <span className="card-work-number-title">
          {item['@type'] === 'WorkOpportunity'
            ? intl.formatMessage(messages.ReferenceNo)
            : intl.formatMessage(messages.ProcurementNo)}
        </span>
        {/*TODO: condition to the link text with WorkOpportunity/Tender after backend modifications*/}
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

var Today = new Date();

const CclListingWorkOpportunities = (props) => {
  const { items, variation } = props;
  const intl = useIntl();
  const user = useSelector((state) => state.users?.user);
  return (
    <>
      {items
        .filter(
          (item) =>
            new Date(item.submission_deadline) < Today &&
            variation === 'CloseTenders',
        )
        .map((item, index) => (
          <CclWorkOpportunity
            key={index}
            item={item}
            intl={intl}
            user={user}
          ></CclWorkOpportunity>
        ))}
      {items
        .filter(
          (item) =>
            new Date(item.submission_deadline) > Today &&
            variation === 'OpenTenders',
        )
        .map((item, index) => (
          <CclWorkOpportunity
            key={index}
            item={item}
            intl={intl}
            user={user}
          ></CclWorkOpportunity>
        ))}
    </>
  );
};

CclListingWorkOpportunities.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CclListingWorkOpportunities;
