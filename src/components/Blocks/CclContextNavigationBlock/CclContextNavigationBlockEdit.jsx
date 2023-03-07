import React from 'react';
import ContextNavigationComponent from '@plone/volto/components';

const CclContextNavigationBlockEdit = (props) => {
  const regex = /\/edit$/;

  return (
    <div>
      <strong>Navigation menu preview:</strong>
      <br />
      <br />
      <ContextNavigationComponent
        pathname={props.pathname.replace(regex, '')}
      />
    </div>
  );
};

export default CclContextNavigationBlockEdit;
