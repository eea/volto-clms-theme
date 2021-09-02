import CLMSDatasetDetailView from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView/CLMSDatasetDetailView';
import CLMSNewsItemView from '@eeacms/volto-clms-theme/components/CLMSNewsItemView/CLMSNewsItemView';
import CLMSEventView from '@eeacms/volto-clms-theme/components/CLMSEventView/CLMSEventView';
import CLMSMeetingView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingView';
import CLMSMeetingSubscribersView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingSubscribersView';
import CLMSMeetingEmailsView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingEmailsView';
import CLMSMeetingSubscriberView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingSubscriberView';
import customBlocks, {
  customGroupBlocksOrder,
} from '@eeacms/volto-clms-theme/components/Blocks/customBlocks';
import TabsWidget from './components/Blocks/CustomTemplates/VoltoTabsBlock/TabsWidget';
import ProfileView from './components/CLMSProfileView/CLMSProfileView';
import BoundingWidget from './components/Widgets/BoundingWidget';
import MapLayersWidget from './components/Widgets/MapLayersWidget';
import DownloadableFilesWidget from './components/Widgets/DownloadableFilesWidget';
import CLMSMapViewerView from './components/CLMSMapViewerView/CLMSMapViewerView';
import {
  extraBreadcrumbItemsReducer,
  cartItemsReducer,
  meetingRegisterReducer,
  meetingSubscribersReducer,
} from './reducers';
import CLMSDownloadCartView from './components/CLMSDownloadCartView/CLMSDownloadCartView';

const applyConfig = (config) => {
  config.views = {
    ...config.views,
    contentTypesViews: {
      ...config.contentTypesViews,
      DataSet: CLMSDatasetDetailView,
      'News Item': CLMSNewsItemView,
      Event: CLMSEventView,
      'eea.meeting': CLMSMeetingView,
      'eea.meeting.subscribers': CLMSMeetingSubscribersView,
      'eea.meeting.subscriber': CLMSMeetingSubscriberView,
      'eea.meeting.emails': CLMSMeetingEmailsView,
    },
  };
  config.blocks = {
    ...config.blocks,
    blocksConfig: { ...customBlocks(config) },
    groupBlocksOrder: [
      ...config.blocks.groupBlocksOrder,
      customGroupBlocksOrder,
    ],
  };
  config.addonReducers = {
    ...config.addonReducers,
    extra_breadcrumbs: extraBreadcrumbItemsReducer,
    cart_items: cartItemsReducer,
    meeting_register: meetingRegisterReducer,
    subscribers: meetingSubscribersReducer,
  };

  config.widgets.type.tabs = TabsWidget;
  config.widgets.widget.bounding_widget = BoundingWidget;
  config.widgets.widget.layer_widget = MapLayersWidget;
  config.widgets.widget.downloadable_files_widget = DownloadableFilesWidget;
  config.settings = {
    ...config.settings,
    nonContentRoutes: [
      ...config.settings.nonContentRoutes,
      '/profile',
      '/download-by-area',
      '/cart',
    ],
    isMultilingual: true,
    supportedLanguages: [
      'bg',
      'cs',
      'hr',
      'da',
      'nl',
      'el',
      'en',
      'es',
      'et',
      'fi',
      'fr',
      'de',
      'hu',
      'it',
      'lv',
      'lt',
      'mt',
      'pl',
      'pt',
      'ro',
      'sk',
      'sl',
      'sv',
    ],
    defaultLanguage: 'en',
  };
  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/profile',
      component: ProfileView,
    },
    {
      path: '/**/profile',
      component: ProfileView,
    },
    {
      path: '/**/download-by-area',
      component: CLMSMapViewerView,
    },
    {
      path: '/cart',
      component: CLMSDownloadCartView,
    },
  ];
  return config;
};
export default applyConfig;
