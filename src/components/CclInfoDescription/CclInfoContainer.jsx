import React from 'react';
import PropTypes from 'prop-types';

function CclInfoContainer({ children }) {
  return <div className="dataset-info-container">{children}</div>;
}

CclInfoContainer.propTypes = {
  childen: PropTypes.node.isRequired,
};
export default CclInfoContainer;
