import React from 'react';
import ContextNavigationComponent from '@plone/volto/components/theme/Navigation/ContextNavigation';

const CclContextNavigationBlockView = props => {
  return <ContextNavigationComponent pathname={props.pathname} />;
};

export default CclContextNavigationBlockView;