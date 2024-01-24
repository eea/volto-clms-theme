import React from 'react';

import { HomeBgImg } from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/HomeBgImg';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';

import getListingBodyVariation from './utils.js';

const CclCardContainerBlockView = (props) => {
  const { data } = props;
  let cards = data?.customCards?.blocks_layout?.items.map(
    (uid) => data.customCards.blocks[uid],
  );

  const variation = getListingBodyVariation(data);

  let containerClass = '';
  if (data.variation === 'cardWithBgImage') {
    containerClass = 'home-map-container';
  } else if (['news', 'event'].includes(variation.templateID)) {
    containerClass = 'ccl-container';
  } else if (!['line', 'doc', 'globalSearch'].includes(variation.templateID)) {
    containerClass = 'card-container';
  }

  return (
    <>
      {containerClass === 'home-map-container' ? (
        <div className={containerClass}>
          <HomeBgImg url={data?.image?.url} alt={data?.image?.alt} />
          <div className="ccl-container">
            {cards &&
              cards.map((card, index) => (
                <CclCard
                  key={index}
                  type={variation.templateID}
                  card={card}
                  isCustomCard={true}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className={containerClass}>
          {cards &&
            cards.map((card, index) => (
              <CclCard
                key={index}
                type={variation.templateID}
                card={card}
                isCustomCard={true}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default CclCardContainerBlockView;
