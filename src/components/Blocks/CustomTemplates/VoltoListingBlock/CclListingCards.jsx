import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';

const CclListingCards = (props) => {
  const { items, linkHref, linkTitle, isEditMode, variation = 'doc' } = props;
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

  let containerClass = '';
  if (['news', 'event'].includes(variation)) {
    containerClass = 'ccl-container';
  } else if (!['line', 'doc'].includes(variation)) {
    containerClass = 'card-container';
  }
  return (
    <>
      <div className={containerClass}>
        {items && items.length > 0
          ? items.map((item, index) => (
              <CclCard key={index} type={variation} card={item} />
            ))
          : 'There are no items to display'}
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
