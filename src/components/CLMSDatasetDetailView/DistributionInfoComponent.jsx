import React from 'react';

const DistributionInfoComponent = (props) => {
  const { resourceLocator, services } = props.resource;

  return (
    <div className="distribution-info-container">
      <h3>Resource</h3>
      <div className="distribution-info-item">
        {resourceLocator && (
          <div className="distribution-info-item">{resourceLocator}</div>
        )}
        {services && <div className="distribution-info-item">{services}</div>}
      </div>
      <br />
    </div>
  );
};

export default DistributionInfoComponent;
