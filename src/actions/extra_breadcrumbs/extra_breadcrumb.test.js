import { getExtraBreadcrumbItems } from './extra_breadcrumb';
import { GET_EXTRA_BREADCRUMB_ITEMS } from './extra_breadcrumb';

describe('Breadcrumbs action', () => {
  describe('getBreadcrumbs', () => {
    it('should create an action to get the breadcrumbs', () => {
      const url = 'http://localhost';
      const action = getExtraBreadcrumbItems(url);

      expect(action.type).toEqual(GET_EXTRA_BREADCRUMB_ITEMS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@breadcrumbs`);
    });
  });
});
