import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

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

  const { settings } = config;
  const regex = /CclCards/;

  const cardType = template.replace(regex, '');

  return (
    <>
      <div
        className={
          cardType === 'line' || cardType === 'doc' ? '' : 'card-container'
        }
      >
        {items.map((item, index) => (
          <CclCard key={index} type={cardType} card={item} />
        ))}
        {/* 
              <div className="listing-item" key={item['@id']}>
                <ConditionalLink item={item} condition={!isEditMode}>
                  {!item[settings.listingPreviewImageField] && (
                    <img src={DefaultImageSVG} alt="" />
                  )}
                  {item[settings.listingPreviewImageField] && (
                    <img
                      src={flattenToAppURL(
                        item[settings.listingPreviewImageField].scales.preview
                          .download,
                      )}
                      alt={item.title}
                    />
                  )}
                  <div className="listing-body">
                    <h3>{item.title ? item.title : item.id}</h3>
                    <p>{item.description}</p>
                  </div>
                </ConditionalLink>
              </div>
            */}
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
