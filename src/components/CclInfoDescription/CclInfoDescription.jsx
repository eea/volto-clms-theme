import React from 'react';
import PropTypes from 'prop-types';

/**
 * CclInfoDescription component doc.
 * @function CclInfoDescription
 * @param {string} title Header of Citation.
 * @param {boolean} marginBottom Default: false.
 * @param {node} children Add any html element.
 * @example <CclInfoDescription 
        title="Validation status"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
        mauris ante, a iaculis leo placerat quis.">
      </CclInfoDescription>
 * 
 */
function CclInfoDescription({ title, description }) {
  return (
    <div className="dataset-info-field">
      <div className="dataset-field-title">
        <h3>{title}</h3>
        <span className="info-icon" tooltip="Info" direction="up">
          <i className="fas fa-info-circle"></i>
        </span>
      </div>
      <div className="dataset-field-description">{description}</div>
    </div>
  );
}

CclInfoDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default CclInfoDescription;
