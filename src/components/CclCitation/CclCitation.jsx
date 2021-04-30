import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Citation component doc.
 * @function CclCitation
 * @param {string} title Header of Citation.
 * @param {boolean} marginBottom Default: false.
 * @param {node} children Add any html element.
 * @example <CclCitation title="Validation status">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
          mauris ante, a iaculis leo placerat quis.
        </p>
      </CclCitation>
 * 
 */
function CclCitation({ title, marginBottom = false, children }) {
  let citationClass = classNames('validation-citation-container', {
    'citation-container': !marginBottom,
    'validation-container': marginBottom,
  });

  return (
    <div className={citationClass}>
      <div className="citation-title">{title}</div>
      {children}
    </div>
  );
}

CclCitation.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  marginBottom: PropTypes.bool,
};
export default CclCitation;
