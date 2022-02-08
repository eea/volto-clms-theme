import {
  getExtraBreadcrumbItems,
  GET_EXTRA_BREADCRUMB_ITEMS,
} from './extra_breadcrumb';

describe('Breadcrumbs action', () => {
  describe('getBreadcrumbs', () => {
    it('should create an action to get the breadcrumbs', () => {
      const items = ['item1', 'item2'];
      const action = getExtraBreadcrumbItems(items);

      expect(action.type).toEqual(GET_EXTRA_BREADCRUMB_ITEMS);
      expect(action.items).toEqual(items);
    });
  });
});
