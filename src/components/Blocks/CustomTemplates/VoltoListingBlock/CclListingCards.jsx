import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
// import config from '@plone/volto/registry';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';

const CclListingCards = ({ items, linkMore, isEditMode, template }) => {
  let link = null;
  let href = linkMore?.href || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkMore?.title || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkMore?.title || href}</a>;
  }

  // const { settings } = config;
  const regex = /CclCards/;

  const cardType = template.replace(regex, '');
  let containerClass = '';
  if (cardType in ['news', 'event']) {
    containerClass = 'ccl-container';
  } else if (!(cardType in ['line', 'doc'])) {
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
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default CclListingCards;
