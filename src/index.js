// VIEWS IMPORTS
import CLMSDatasetDetailView from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView/CLMSDatasetDetailView';
import CLMSNewsItemView from '@eeacms/volto-clms-theme/components/CLMSNewsItemView/CLMSNewsItemView';
import CLMSEventView from '@eeacms/volto-clms-theme/components/CLMSEventView/CLMSEventView';
import ProfileView from './components/CLMSProfileView/CLMSProfileView';
import CLMSMapViewerView from './components/CLMSMapViewerView/CLMSMapViewerView';
import CLMSDownloadCartView from './components/CLMSDownloadCartView/CLMSDownloadCartView';
import CLMSMeetingView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingView';
import CLMSMeetingSubscribersView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingSubscribersView';
import CLMSMeetingEmailsView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingEmailsView';
import CLMSMeetingEmailView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingEmailView';
import CLMSMeetingSubscriberView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingSubscriberView';
import ServiceDeskView from '@eeacms/volto-clms-theme/components/CLMSServiceDeskView/CLMSServiceDeskView';
// WIDGET IMPORTS
import TabsWidget from './components/Blocks/CustomTemplates/VoltoTabsBlock/TabsWidget';
import BoundingWidget from './components/Widgets/BoundingWidget';
import MapLayersWidget from './components/Widgets/MapLayersWidget';
import DownloadableFilesWidget from './components/Widgets/DownloadableFilesWidget';
// CUSTOMIZED BLOCKS IMPORTS
import customBlocks, {
  customGroupBlocksOrder,
} from '@eeacms/volto-clms-theme/components/Blocks/customBlocks';
// CUSTOM REDUCERS IMPORT
import reducers from './reducers';
// COMPONENTS FOR ROUTES
import { Sitemap, Search, ContactForm } from '@plone/volto/components';

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
      'eea.meeting.email': CLMSMeetingEmailView,
      // 'Service desk': ServiceDeskView,
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

  config.widgets.type.tabs = TabsWidget;
  config.widgets.widget = {
    ...config.widgets.widget,
    bounding_widget: BoundingWidget,
    layer_widget: MapLayersWidget,
    downloadable_files_widget: DownloadableFilesWidget,
  };
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
      path: '/**/contact-service-desk',
      component: ServiceDeskView,
    },
    {
      path: '/**/download-by-area',
      component: CLMSMapViewerView,
    },
    {
      path: '/**/cart',
      component: CLMSDownloadCartView,
    },
    {
      path: `/(${config.settings.supportedLanguages.join('|')})/sitemap`,
      component: Sitemap,
    },
    {
      path: `/(${config.settings.supportedLanguages.join('|')})/search`,
      component: Search,
    },
    {
      path: `/(${config.settings.supportedLanguages.join('|')})/contact-form`,
      component: ContactForm,
    },
  ];
  config.addonReducers = {
    ...config.addonReducers,
    ...reducers,
  };
  return config;
};
export default applyConfig;
