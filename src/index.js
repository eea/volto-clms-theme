import CLMSDatasetDetailView from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView/CLMSDatasetDetailView';
import CLMSNewsItemView from '@eeacms/volto-clms-theme/components/CLMSNewsItemView/CLMSNewsItemView';
import CLMSEventView from '@eeacms/volto-clms-theme/components/CLMSEventView/CLMSEventView';
import customBlocks, {
  customGroupBlocksOrder,
} from '@eeacms/volto-clms-theme/components/Blocks/customBlocks';
import TabsWidget from './components/Blocks/CustomTemplates/VoltoTabsBlock/TabsWidget';
import ProfileView from './components/CLMSProfileView/CLMSProfileView';
import BoundingWidget from './components/Widgets/BoundingWidget';
import MapLayersWidget from './components/Widgets/MapLayersWidget';
import DownloadableFilesWidget from './components/Widgets/DownloadableFilesWidget';
import CLMSMapViewerView from './components/CLMSMapViewerView/CLMSMapViewerView';
import { extraBreadcrumbItemsReducer, cartItemsReducer } from './reducers';
import CLMSDownloadCartView from './components/CLMSDownloadCartView/CLMSDownloadCartView';
import { Sitemap, Search, ContactForm } from '@plone/volto/components';

const applyConfig = (config) => {
  config.views = {
    ...config.views,
    contentTypesViews: {
      ...config.contentTypesViews,
      DataSet: CLMSDatasetDetailView,
      'News Item': CLMSNewsItemView,
      Event: CLMSEventView,
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
  return config;
};
export default applyConfig;
