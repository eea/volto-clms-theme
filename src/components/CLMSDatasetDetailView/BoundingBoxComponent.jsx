import React from 'react';

const BoundingBoxComponent = (props) => {
  const { north, south, east, west } = props.bbox;

  return (
    <div className="bounding-box-container">
      <h3>Bounding Box</h3>
      <div className="bounding-box-item">
        {east && <div className="bounding-box-item">East: {east}</div>}
        {west && <div className="bounding-box-item">West: {west}</div>}
        {north && <div className="bounding-box-item">North: {north}</div>}
        {south && <div className="bounding-box-item">South: {south}</div>}
      </div>
      <br />
    </div>
  );
};

export default BoundingBoxComponent;
