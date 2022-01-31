import React from 'react';

const VariationHOC = (CclListingVariation, variation) =>
  function Component(props) {
    return <CclListingVariation {...props} variation={variation} />;
  };

export default VariationHOC;
