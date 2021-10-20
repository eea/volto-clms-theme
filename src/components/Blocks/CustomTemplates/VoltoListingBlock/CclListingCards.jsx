import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
// import config from '@plone/volto/registry';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
import './custom.less';

const CclListingCards = (props) => {
  const { items, linkHref, linkTitle, isEditMode, variation } = props;
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }

  // // const { settings } = config;
  const regex = /CclCards/;

  const cardType = variation?.replace(regex, '');
  let containerClass = '';
  if (['news', 'event'].includes(cardType)) {
    containerClass = 'ccl-container';
  } else if (!['line', 'doc'].includes(cardType)) {
    containerClass = 'card-container';
  }

  return (
    <>
      <div className={containerClass}>
        {items.map((item, index) => (
          <CclCard key={index} type={cardType} card={item} />
        ))}
      </div>
      {link && <div className="footer">{link}</div>}
    </>
  );
};

CclListingCards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkHref: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default CclListingCards;
