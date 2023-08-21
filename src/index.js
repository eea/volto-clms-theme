import customBlocks, {
  customGroupBlocksOrder,
} from '@eeacms/volto-clms-theme/components/Blocks/customBlocks';

// ROUTE VIEWS
import { ContactForm, Search, Sitemap, Login } from '@plone/volto/components';

// VIEWS
import CLMSDatasetDetailView from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView/CLMSDatasetDetailView';
import CLMSDownloadCartView from './components/CLMSDownloadCartView/CLMSDownloadCartView';
import CLMSDownloadableFileView from '@eeacms/volto-clms-theme/components/CLMSDownloadableFileView/CLMSDownloadableFileView';
import CLMSDownloadsView from './components/CLMSDownloadsView/CLMSDownloadsView';
import HistoricHOC from './components/CLMSDownloadsView/HistoricHOC';
import CLMSMapViewerView from './components/CLMSMapViewerView/CLMSMapViewerView';
import CLMSMeetingEmailView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingEmailView';
import CLMSMeetingEmailsView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingEmailsView';
import CLMSMeetingSubscriberView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingSubscriberView';
import CLMSMeetingSubscribersView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingSubscribersView';
import CLMSMeetingView from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CLMSMeetingView';
import CLMSNewsItemView from '@eeacms/volto-clms-theme/components/CLMSNewsItemView/CLMSNewsItemView';
import ConfirmSubscriptionView from './components/CLMSSubscriptionView/ConfirmSubscriptionView';
import ProfileView from './components/CLMSProfileView/CLMSProfileView';
import SubscriptionView from './components/CLMSSubscriptionView/SubscriptionView';
import CLMSWorkOpportunityView from '@eeacms/volto-clms-theme/components/CLMSWorkOpportunityView/WorkOpportunityView';
import CLMSUseCaseView from './components/CLMSUseCasesView/CLMSUseCasesView';
import CLMSFAQView from './components/CLMSFAQView/CLMSFAQView';
import CLMSDataSetAccordionView from './components/CLMSDataSetAccordionView/CLMSDataSetAccordionView';

// WIDGET
import BoundingWidget from './components/Widgets/BoundingWidget';
import ContactWidget from './components/Widgets/ContactWidget';
import DatasetDownloadInformationWidget from './components/Widgets/DatasetDownloadInformationWidget';
import DistributionInfoWidget from './components/Widgets/DistributionInfoWidget';
import DownloadableFilesTableWidget from './components/Widgets/DownloadableFilesTableWidget';
import GeonetworkIdentifiersWidget from './components/Widgets/GeonetworkIdentifiersWidget';
import MapLayersWidget from './components/Widgets/MapLayersWidget';
import TabsWidget from './components/Blocks/CustomTemplates/VoltoTabsBlock/TabsWidget';
import TaxonomyWidget from './components/Widgets/TaxonomyWidget';
import ProductComponentsWidget from './components/Widgets/ProductComponentsWidget';
import ImageSizeWidget from './components/Widgets/ImageSizeWidget';
import { CLMSDateWidget } from './components/Widgets/CLMSDateWidget';
// import { DateWidget } from '@eeacms/volto-widgets-view/components';
import { getWidgetView } from '@eeacms/volto-widgets-view/helpers';

// CUSTOM REDUCERS IMPORT
import TextLinkWidget from './components/Widgets/TextLinkWidget';

import reducers from './reducers';
import CookieBanner from 'volto-cookie-banner/CookieBannerContainer';
import CLMSLoginView from './components/CLMSLoginView/CLMSLogin';
// import Login from '@plone/volto/components/Login';

//SLATE CONFIGURATION
import installLinkEditor from '@plone/volto-slate/editor/plugins/AdvancedLink';

//APPEXTRA
import CustomMatomoAppExtra from './components/AppExtra/AppExtra';

import ImageView from '@plone/volto/components/theme/View/ImageView';

const applyConfig = (config) => {
  config.views = {
    ...config.views,
    contentTypesViews: {
      ...config.contentTypesViews,
      DataSet: CLMSDatasetDetailView,
      'News Item': CLMSNewsItemView,
      UseCase: CLMSUseCaseView,
      File: CLMSDownloadableFileView,
      'eea.meeting': CLMSMeetingView,
      'eea.meeting.subscribers': CLMSMeetingSubscribersView,
      'eea.meeting.subscriber': CLMSMeetingSubscriberView,
      'eea.meeting.emails': CLMSMeetingEmailsView,
      'eea.meeting.email': CLMSMeetingEmailView,
      WorkOpportunity: CLMSWorkOpportunityView,
      Tender: CLMSWorkOpportunityView,
      FAQ: CLMSFAQView,
      Image: ImageView,
      DataSetAccordion: CLMSDataSetAccordionView,
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
    downloadable_files_widget: DownloadableFilesTableWidget,
    contact_widget: ContactWidget,
    distribution_info_widget: DistributionInfoWidget,
    geonetwork_identifiers_widget: GeonetworkIdentifiersWidget,
    text_link_widget: TextLinkWidget,
    dataset_download_information_widget: DatasetDownloadInformationWidget,
    image_size: ImageSizeWidget,
  };
  config.widgets.id = {
    ...config.widgets.id,
    taxonomy_technical_library_categorization: TaxonomyWidget,
    product_components: ProductComponentsWidget,
  };
  config.widgets.views = {
    getWidget: getWidgetView,
    id: {
      effective: CLMSDateWidget,
      ...(config.widgets.views?.id || {}),
    },
    widget: {
      datetime: CLMSDateWidget,
      ...(config.widgets.views?.widget || {}),
    },
    type: {
      ...(config.widgets.views?.type || {}),
    },
  };

  config.settings = {
    ...config.settings,
    downloadableObjects: ['File', 'TechnicalLibrary'],
    appExtras: [
      ...config.settings.appExtras,
      {
        match: '*',
        component: CookieBanner,
      },
      {
        match: '',
        component: CustomMatomoAppExtra,
      },
    ],
    nonContentRoutes: [
      ...config.settings.nonContentRoutes,
      '/profile',
      '/download-by-area',
      '/cart',
      '/cart-downloads',
      '/all-downloads',
      '/newsletter-notification-subscription',
      '/newsletter-notification-unsubscription',
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
    showTags: false,
    ownDomain: 'land.copernicus.eu',
    track_search_paths: ['/en/global-search', '/en/dataset-catalog'],
  };

  config.settings.slate.toolbarButtons = [
    'bold',
    'italic',
    'separator',
    'heading-two',
    'heading-three',
    'numbered-list',
    'bulleted-list',
    'blockquote',
    'callout',
    'footnote',
  ];

  config = installLinkEditor(config);

  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/login-plone',
      component: Login,
    },
    {
      path: '/**/login-plone',
      component: Login,
    },
    {
      path: '/login',
      component: CLMSLoginView,
    },
    {
      path: '/**/login',
      component: CLMSLoginView,
    },
    {
      path: '/profile',
      component: ProfileView,
    },
    {
      path: '/**/profile',
      component: ProfileView,
    },
    {
      path: '/subscribe/:type',
      component: SubscriptionView,
    },
    {
      path: '/confirm-subscription/:type/:id',
      component: ConfirmSubscriptionView,
    },
    {
      path: '/unsubscribe/:type',
      component: SubscriptionView,
      extraParams: {
        unsubscribe: true,
      },
    },
    {
      path: '/confirm-unsubscription/:type/:id',
      component: ConfirmSubscriptionView,
      extraParams: {
        unsubscribe: true,
      },
    },
    {
      path: '/**/subscribe/:type',
      component: SubscriptionView,
    },
    {
      path: '/**/confirm-subscription/:type/:id',
      component: ConfirmSubscriptionView,
    },
    {
      path: '/**/unsubscribe/:type',
      component: SubscriptionView,
      extraParams: {
        unsubscribe: true,
      },
    },
    {
      path: '/**/confirm-unsubscription/:type/:id',
      component: ConfirmSubscriptionView,
      extraParams: {
        unsubscribe: true,
      },
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
      path: '/**/cart-downloads',
      component: CLMSDownloadsView,
    },
    {
      path: '/**/all-downloads',
      component: HistoricHOC(CLMSDownloadsView),
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
