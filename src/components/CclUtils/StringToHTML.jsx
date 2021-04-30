import React from 'react';
import PropTypes from 'prop-types';

/**
 * StringToHTML component doc.
 * @function StringToHTML
 * @param {string} string string to parse to html.
 * @example <StringToHTML string="<p>HTML String</p>"/>
 *
 */
function StringToHTML({ string }) {
  return <div dangerouslySetInnerHTML={{ __html: string }} />;
}

StringToHTML.propTypes = {
  string: PropTypes.string.isRequired,
};
export default StringToHTML;
