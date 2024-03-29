/**
 * View video block.
 * @module components/manage/Blocks/Video/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Body from '@plone/volto/components/manage/Blocks/Video/Body';
import { PrivacyProtection } from '@eeacms/volto-embed/PrivacyProtection';

/**
 * View video block class.
 * @class View
 * @extends Component
 */
const View = ({ data, id }) => {
  return (
    <div
      className={cx(
        'block video align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <PrivacyProtection data={data} id={id}>
        <Body data={data} />
      </PrivacyProtection>
    </div>
  );
};
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
