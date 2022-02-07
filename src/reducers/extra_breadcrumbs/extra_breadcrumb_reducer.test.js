import { extraBreadcrumbItemsReducer } from './extra_breadcrumb_reducer';
import { GET_EXTRA_BREADCRUMB_ITEMS } from '../../actions';

//jest test for extraBreadcrumbItemsReducer
describe('extraBreadcrumbItemsReducer', () => {
  it('should return the initial state', () => {
    expect(extraBreadcrumbItemsReducer(undefined, {})).toEqual({
      items: [],
    });
  });
  //jest test for extraBreadcrumbItemsReducer -success
  it('should handle GET_EXTRA_BREADCRUMB_ITEMS_SUCCESS', () => {
    expect(
      extraBreadcrumbItemsReducer(
        {},
        {
          type: GET_EXTRA_BREADCRUMB_ITEMS,
          items: [
            {
              '@id': 'extra-breadcrumb-item-1',
              title: 'Extra Breadcrumb Item 1',
            },
          ],
        },
      ),
    ).toEqual({
      items: [
        {
          '@id': 'extra-breadcrumb-item-1',
          title: 'Extra Breadcrumb Item 1',
        },
      ],
    });
  });
  //jest test for extraBreadcrumbItemsReducer -fail
  it('should handle GET_EXTRA_BREADCRUMB_ITEMS_FAIL', () => {
    expect(
      extraBreadcrumbItemsReducer(
        {},
        {
          type: GET_EXTRA_BREADCRUMB_ITEMS,
          error: 'error',
        },
      ),
    ).toEqual({
      items: [],
    });
  });
  //jest test for extraBreadcrumbItemsReducer -pending
  it('should handle GET_EXTRA_BREADCRUMB_ITEMS_PENDING', () => {
    expect(
      extraBreadcrumbItemsReducer(
        {},
        {
          type: `${GET_EXTRA_BREADCRUMB_ITEMS}_PENDING`,
        },
      ),
    ).toEqual({
      items: [],
    });
  });
});
