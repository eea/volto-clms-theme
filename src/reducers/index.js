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
import { downloadtoolReducer } from './downloadtool/downloadtool_reducer';
import { registryReducer } from './registry/registry';

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
  downloadtool: downloadtoolReducer,
  registry: registryReducer,
};

export default reducers;
