import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UniversalLink } from '@plone/volto/components';
import { workOpportunitiesCclDateTimeFormat } from '@eeacms/volto-clms-theme/components/CclUtils';

import PropTypes from 'prop-types';

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

const CclWorkOpportunity = (props) => {
  const { item, intl, user } = props;
  const lang = useSelector((state) => state.intl.locale);

  return (
    <div className="card-work">
      {user.roles && user.roles.includes('Manager') && (
        <>
          <Link to={item['@id'] + '/edit'}>Edit this item</Link>
          <br />
          <br />
        </>
      )}
      <div class="card-work-line">
        <h2>{item.title}</h2>
      </div>
      <div className="card-work-line">
        <span className="card-work-title">
          {item['@type'] === 'WorkOpportunity'
            ? intl.formatMessage(messages.ReferenceNo)
            : intl.formatMessage(messages.ProcurementNo)}
        </span>
        {item.url ? (
          <UniversalLink href={item.url || ''}>
            {item.procurement_no}
          </UniversalLink>
        ) : (
          item.procurement_no
        )}
      </div>
      <div className="card-work-line">
        <p>{item.description}</p>
      </div>
      <div className="card-work-line">
        <span className="card-work-title">
          {intl.formatMessage(messages.SubmissionDeadline)}
        </span>
        {workOpportunitiesCclDateTimeFormat(item.submission_deadline, lang)}
      </div>
    </div>
  );
};

const CclListingWorkOpportunities = (props) => {
  const { items } = props;
  const intl = useIntl();
  const user = useSelector((state) => state.users?.user);
  return (
    <>
      {items.map((item, index) => (
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
