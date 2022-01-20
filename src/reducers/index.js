/**
 * Root reducer.
 * @module reducers/root
 */

import { datasetsByUidReducer } from './datasets_by_uid/datasets_by_uid';
import { downloadtoolReducer } from './downloadtool/downloadtool_reducer';
import { extraBreadcrumbItemsReducer } from './extra_breadcrumbs/extra_breadcrumb_reducer';
import { importGeonetworkReducer } from './geonetwork/import_geonetwork_reducer';
import { meetingRegisterReducer } from './meeting/meeting_register_reducer';
import { meetingSubscribersReducer } from './meeting/meeting_subscribers_reducer';
import { registryReducer } from './registry/registry';
// import defaultReducers from '@plone/volto/reducers';
import tokens from './tokens/tokens';
import { userschemaReducer } from './userschema/userschema';
import { newsletterReducer } from './newsletter/newsletter_reducer';
import { subscribeToEventReducer } from './subscribe_to_event/subscribe_to_event_reducer';
import { subscribeToNewsReducer } from './subscribe_to_news/subscribe_to_news_reducer';
import { newsletterSubscribersReducer } from './newsletter/subscriber_reducer';

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
  datasetsByUid: datasetsByUidReducer,
  subscribe_to_newsletter: newsletterReducer,
  subscribe_to_event: subscribeToEventReducer,
  subscribe_to_news: subscribeToNewsReducer,
  newsletter_subscribers: newsletterSubscribersReducer,
};

export default reducers;
