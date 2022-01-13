// COMPONENTS FOR ROUTES
import { ContactForm, Search, Sitemap } from '@plone/volto/components';
// CUSTOMIZED BLOCKS IMPORTS
import customBlocks, {
  customGroupBlocksOrder,
} from '@eeacms/volto-clms-theme/components/Blocks/customBlocks';

import BoundingWidget from './components/Widgets/BoundingWidget';
// VIEWS IMPORTS
import CLMSDatasetDetailView from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView/CLMSDatasetDetailView';
import CLMSDownloadCartView from './components/CLMSDownloadCartView/CLMSDownloadCartView';
import CLMSDownloadableFileView from '@eeacms/volto-clms-theme/components/CLMSDownloadableFileView/CLMSDownloadableFileView';
import CLMSEventView from '@eeacms/volto-clms-theme/components/CLMSEventView/CLMSEventView';
import CLMSMapViewerView from './components/CLMSMapViewerView/CLMSMapViewerView';
import CLMSMeetingEmailView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingEmailView';
import CLMSMeetingEmailsView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingEmailsView';
import CLMSMeetingSubscriberView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingSubscriberView';
import CLMSMeetingSubscribersView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingSubscribersView';
import CLMSMeetingView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingView';
import CLMSNewsItemView from '@eeacms/volto-clms-theme/components/CLMSNewsItemView/CLMSNewsItemView';
import ContactWidget from './components/Widgets/ContactWidget';
import DistributionInfoWidget from './components/Widgets/DistributionInfoWidget';
import DownloadableFilesWidget from './components/Widgets/DownloadableFilesWidget';
import GeonetworkIdentifiersWidget from './components/Widgets/GeonetworkIdentifiersWidget';
import MapLayersWidget from './components/Widgets/MapLayersWidget';
import ProfileView from './components/CLMSProfileView/CLMSProfileView';
// WIDGET IMPORTS
import TabsWidget from './components/Blocks/CustomTemplates/VoltoTabsBlock/TabsWidget';
import TextLinkWidget from './components/Widgets/TextLinkWidget';
// CUSTOM REDUCERS IMPORT
import reducers from './reducers';

const applyConfig = (config) => {
  config.views = {
    ...config.views,
    contentTypesViews: {
      ...config.contentTypesViews,
      DataSet: CLMSDatasetDetailView,
      'News Item': CLMSNewsItemView,
      Event: CLMSEventView,
      TechnicalLibrary: CLMSDownloadableFileView,
      File: CLMSDownloadableFileView,
      'eea.meeting': CLMSMeetingView,
      'eea.meeting.subscribers': CLMSMeetingSubscribersView,
      'eea.meeting.subscriber': CLMSMeetingSubscriberView,
      'eea.meeting.emails': CLMSMeetingEmailsView,
      'eea.meeting.email': CLMSMeetingEmailView,
    },
  };
  config.blocks = {
    ...config.blocks,
    blocksConfig: { ...customBlocks(config) },
    groupBlocksOrder: [
      ...config.blocks.groupBlocksOrder,
      ...customGroupBlocksOrder,
    ],
  };

  config.widgets.type.tabs = TabsWidget;
  config.widgets.widget = {
    ...config.widgets.widget,
    bounding_widget: BoundingWidget,
    layer_widget: MapLayersWidget,
    downloadable_files_widget: DownloadableFilesWidget,
    contact_widget: ContactWidget,
    distribution_info_widget: DistributionInfoWidget,
    geonetwork_identifiers_widget: GeonetworkIdentifiersWidget,
    text_link_widget: TextLinkWidget,
  };
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
    registry: {
      ...config.settings.registry,
      login_url: 'clms.addon.login_url_controlpanel.login_url',
    },
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
