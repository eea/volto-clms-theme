/**
 * Root reducer.
 * @module reducers/root
 */

// import defaultReducers from '@plone/volto/reducers';
import tokens from './tokens/tokens';
import { cartItemsReducer } from './cart/cart_reducer';
import { extraBreadcrumbItemsReducer } from './extra_breadcrumbs/extra_breadcrumb_reducer';
import { meetingRegisterReducer } from './meeting/meeting_register_reducer';
import { meetingSubscribersReducer } from './meeting/meeting_subscribers_reducer';
import { postDownloadtoolReducer } from './downloadtool/post_downloadtool_reducer';
import { getDownloadtoolReducer } from './downloadtool/get_downloadtool_reducer';
import { deleteDownloadtoolReducer } from './downloadtool/delete_downloadtool_reducer';

/**
 * Root reducer.
 * @function
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
const reducers = {
  // ...defaultReducers,
  // Add your reducers here
  tokens,
  extra_breadcrumbs: extraBreadcrumbItemsReducer,
  cart_items: cartItemsReducer,
  meeting_register: meetingRegisterReducer,
  subscribers: meetingSubscribersReducer,
  post_downloadtool: postDownloadtoolReducer,
  downloadtool: getDownloadtoolReducer,
  delete_downloadtool: deleteDownloadtoolReducer,
};

export default reducers;
