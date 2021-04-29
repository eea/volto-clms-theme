import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * CclInfoDescription component doc.
 * @function CclInfoDescription
 * @param {string} title Header of Citation.
 * @param {string} tooltip Tooltip info text.
 * @param {string} description Description.
 * @example <CclInfoDescription 
        title="Validation status"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
        mauris ante, a iaculis leo placerat quis.">
      </CclInfoDescription>
 * 
 */
function CclInfoDescription({ title, description, tooltip = 'Info' }) {
  return (
    <div className="dataset-info-field">
      <div className="dataset-field-title">
        <h3>{title}</h3>
        <span className="info-icon" tooltip={tooltip} direction="up">
          <FontAwesomeIcon icon={faInfoCircle} />
        </span>
      </div>
      <div className="dataset-field-description">{description}</div>
    </div>
  );
}

CclInfoDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
};
export default CclInfoDescription;
