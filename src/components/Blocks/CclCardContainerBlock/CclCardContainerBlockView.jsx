import React from 'react';

import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent } from '@plone/volto/actions';

const CclCardContainerBlockView = (props) => {
  const { data, metadata, properties, id } = props;

  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const dispatch = useDispatch();
  let cards = searchSubrequests?.[props.id]?.items;

  let path = '';
  if (data.cardOrigin === 'current') {
    path = metadata ? metadata['@id'] : properties['@id'];
  } else if (data.cardOrigin === 'selection') {
    path = data.containerSelection ? data.containerSelection[0]['@id'] : '';
  } else if ((data.cardOrigin = 'custom')) {
    cards = data.customCards.blocks_layout.items.map(
      (uid) => data.customCards.blocks[uid],
    );
  }

  let portal_type =
    data.contentTypes?.length > 0 ? { portal_type: data.contentTypes } : {};
  React.useEffect(() => {
    dispatch(
      searchContent(
        path,
        {
          sort_on: 'effective',
          sort_order: 'reverse',
          fullobjects: 1,
          ...portal_type,
        },
        id,
      ),
    );
  }, []);

  var cardStyle = data.cardStyle || 'line';
  return (
    <div
      className={
        cardStyle === 'line' || cardStyle === 'doc' ? '' : 'card-container'
      }
    >
      {cards &&
        cards.map((card, index) => (
          <CclCard key={index} type={cardStyle} card={card} />
        ))}
    </div>
  );
};

export default CclCardContainerBlockView;
