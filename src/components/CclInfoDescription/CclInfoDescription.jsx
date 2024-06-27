import PropTypes from 'prop-types';
import React from 'react';

import FontAwesomeIcon from '@eeacms/volto-clms-theme/components/FontAwesomeIcon';
import { withFontAwesomeLibs } from '@eeacms/volto-clms-theme/helpers/withFontAwesomeLibs';

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
function CclInfoDescription({ title, description, tooltip, fontAwesomeSolid }) {
  return (
    <div className="dataset-info-field">
      <div className="dataset-field-title">
        {title && <h3>{title}</h3>}
        {tooltip && (
          <span className="info-icon" tooltip={tooltip} direction="up">
            <FontAwesomeIcon icon={fontAwesomeSolid.faInfoCircle} />
          </span>
        )}
      </div>
      <div className="dataset-field-description">{description}</div>
    </div>
  );
}

CclInfoDescription.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
export default withFontAwesomeLibs(CclInfoDescription);
