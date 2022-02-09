import { extraBreadcrumbItemsReducer } from './extra_breadcrumb_reducer';
import { GET_EXTRA_BREADCRUMB_ITEMS } from '../../actions/extra_breadcrumbs/extra_breadcrumb';

//jest test for extraBreadcrumbItemsReducer
describe('extraBreadcrumbItemsReducer', () => {
  it('should return the initial state', () => {
    const action = {
      type: `${GET_EXTRA_BREADCRUMB_ITEMS}_SUCCESS`,
      items: ['breadcrumb-item-1'],
    };
    expect(extraBreadcrumbItemsReducer(undefined, action)).toEqual({
      loading: false,
      loaded: true,
      error: null,
      items: action.items,
    });
  });
  //jest test for extraBreadcrumbItemsReducer -success
  it('should handle GET_EXTRA_BREADCRUMB_ITEMS_SUCCESS', () => {
    const action = {
      type: `${GET_EXTRA_BREADCRUMB_ITEMS}_SUCCESS`,
      items: ['breadcrumb-item-1'],
    };
    expect(extraBreadcrumbItemsReducer({}, action)).toEqual({
      loading: false,
      loaded: true,
      items: action.items,
    });
  });
  //jest test for extraBreadcrumbItemsReducer -fail
  it('should handle GET_EXTRA_BREADCRUMB_ITEMS_FAIL', () => {
    const action = {
      type: `${GET_EXTRA_BREADCRUMB_ITEMS}_FAIL`,
      items: ['breadcrumb-item-1'],
    };
    expect(extraBreadcrumbItemsReducer({}, action)).toEqual({
      items: action.items,
      loading: false,
      loaded: true,
      error: true,
    });
  });
  //jest test for extraBreadcrumbItemsReducer -pending
  it('should handle GET_EXTRA_BREADCRUMB_ITEMS_PENDING', () => {
    const action = {
      type: `${GET_EXTRA_BREADCRUMB_ITEMS}_PENDING`,
      items: ['breadcrumb-item-1'],
    };
    expect(extraBreadcrumbItemsReducer({}, action)).toEqual({
      loading: true,
      loaded: false,
      items: action.items,
    });
  });
});
