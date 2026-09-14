import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { getPanels } from '../utils';
import FamilyCard from './FamilyCard';

const CclFamiliesListingView = (props) => {
  const { block, data, onChangeBlock, setSidebarTab, setSelectedCardBlock } =
    props;

  const properties = data?.customCards;

  const panelData = properties;
  const panels = getPanels(panelData);
  useEffect(() => {
    if (isEmpty(data?.customCards)) {
      onChangeBlock(block, {
        ...data,
        customCards: {
          ...properties,
        },
      });
    }
    /* eslint-disable-next-line */
  }, []);

  return (
    <>
      <div
        className="cardContainer-header"
        onClick={() => {
          setSidebarTab(1);
          setSelectedCardBlock(-1);
        }}
        aria-hidden="true"
      >
        {data?.title && data.title}
      </div>
      <div className={'card-container'}>
        <>
          {panels.map(([uid, panel], index) => (
            <FamilyCard
              key={index}
              card={panel}
              isCustomCard={true}
              isEditMode={false}
            />
          ))}
        </>
      </div>
    </>
  );
};

export default CclFamiliesListingView;
