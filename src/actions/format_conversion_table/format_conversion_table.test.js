import { getFormatConversionTable } from './get_format_conversion_table';
import { GET_FORMATCONVERSIONTABLE } from './get_format_conversion_table';

describe('Format converson table action', () => {
  describe('getFormatConversionTable', () => {
    it('should create an action to get the format conversion table', () => {
      const url = 'http://localhost';
      const action = getFormatConversionTable(url);

      expect(action.type).toEqual(GET_FORMATCONVERSIONTABLE);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@format_conversion_table`);
    });
  });
});
