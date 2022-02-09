import React from 'react';

const WithType = (FacetView, typeName) =>
  function Component(props) {
    return <FacetView {...props} typeName={typeName} />;
  };

export default WithType;
