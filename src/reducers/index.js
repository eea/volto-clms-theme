/**
 * Root reducer.
 * @module reducers/root
 */

import { downloadtoolReducer } from './downloadtool/downloadtool_reducer';
import { extraBreadcrumbItemsReducer } from './extra_breadcrumbs/extra_breadcrumb_reducer';
import { importGeonetworkReducer } from './geonetwork/import_geonetwork_reducer';
import { meetingRegisterReducer } from './meeting/meeting_register_reducer';
import { meetingSubscribersReducer } from './meeting/meeting_subscribers_reducer';
import { registryReducer } from './registry/registry';
// import defaultReducers from '@plone/volto/reducers';
import tokens from './tokens/tokens';
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
  geonetwork_importation: importGeonetworkReducer,
  userschema: userschemaReducer,
};

export default reducers;
