/**
 * View html block.
 * @module components/manage/Blocks/HTML/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { PrivacyProtection } from '@eeacms/volto-embed/PrivacyProtection';

/**
 * View html block class.
 * @class View
 * @extends Component
 */
const View = ({ data, id }) => (
  <PrivacyProtection data={data} id={id}>
    <div
      className="block html"
      dangerouslySetInnerHTML={{ __html: data.html }}
    />
  </PrivacyProtection>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
