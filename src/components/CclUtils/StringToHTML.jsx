import React from 'react';
import PropTypes from 'prop-types';

/**
 * Citation component doc.
 * @function StringToHTML
 * @param {string} string string to parse to html.
 * @param {boolean} marginBottom Default: false.
 * @param {node} children Add any html element.
 * @example <StringToHTML string="<p>Validation status</p>"/>
 *
 */
function StringToHTML({ string }) {
  return <div dangerouslySetInnerHTML={{ __html: string }} />;
}

StringToHTML.propTypes = {
  string: PropTypes.string.isRequired,
};
export default StringToHTML;
