/**
 * Root reducer.
 * @module reducers/root
 */

// import defaultReducers from '@plone/volto/reducers';
import tokens from './tokens/tokens';
import { extraBreadcrumbItemsReducer } from './extra_breadcrumbs/extra_breadcrumb_reducer';
import { meetingRegisterReducer } from './meeting/meeting_register_reducer';
import { meetingSubscribersReducer } from './meeting/meeting_subscribers_reducer';
import { downloadtoolReducer } from './downloadtool/downloadtool_reducer';
import { registryReducer } from './registry/registry';
import { userschemaReducer } from './userschema/userschema';

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
  meeting_register: meetingRegisterReducer,
  subscribers: meetingSubscribersReducer,
  downloadtool: downloadtoolReducer,
  registry: registryReducer,
  userschema: userschemaReducer,
};

export default reducers;
