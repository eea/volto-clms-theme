/**
 * Get cart selection to downloadtool.
 * @module actions/getFormatConversionTable
 */
export const GET_FORMATCONVERSIONTABLE = 'GET_FORMATCONVERSIONTABLE';

/**
 * Get cart selection to downloadtool.
 * @function GetFormatConversionTable
 * @returns {Object} Get extra items action.
 */
export function getFormatConversionTable() {
  return {
    type: GET_FORMATCONVERSIONTABLE,
    request: {
      op: 'get',
      path: '/@format_conversion_table',
    },
  };
}
