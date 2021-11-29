import CclContextNavigationBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclContextNavigationBlock/CclContextNavigationBlockView';
import CclContextNavigationBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclContextNavigationBlock/CclContextNavigationBlockEdit';
import navSVG from '@plone/volto/icons/nav.svg';

import CclCardContainerBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclCardContainerBlock/CclCardContainerBlockView';
import CclCardContainerBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclCardContainerBlock/CclCardContainerBlockEdit';
import containerSVG from '@plone/volto/icons/apps.svg';

import CclButtonBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclButtonBlock/CclButtonBlockView';
import CclButtonBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclButtonBlock/CclButtonBlockEdit';
import linkSVG from '@plone/volto/icons/link.svg';

import CclCardBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclCardBlock/CclCardBlockView';
import CclCardBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclCardBlock/CclCardBlockEdit';
import cardSVG from '@plone/volto/icons/indent.svg';

import CclProductLeftMenuView from '@eeacms/volto-clms-theme/components/Blocks/CclProductLeftMenu/CclProductLeftMenuView';
import CclProductLeftMenuEdit from '@eeacms/volto-clms-theme/components/Blocks/CclProductLeftMenu/CclProductLeftMenuEdit';
import leftMenuSVG from '@plone/volto/icons/nav.svg';

import CclHomeProductsBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeProductsBlock/CclHomeProductsBlockView';
import CclHomeProductsBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclHomeProductsBlock/CclHomeProductsBlockEdit';
import homeBand from '@plone/volto/icons/image-wide.svg';

import CclHomeSearchBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeSearchBlock/CclHomeSearchBlockView';
import CclHomeSearchBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclHomeSearchBlock/CclHomeSearchBlockEdit';
import {
  DefaultEdit,
  defaultSchema,
  TabsEdit,
  TabsView,
} from '@eeacms/volto-tabs-block/components';
import { TABS_BLOCK } from '@eeacms/volto-tabs-block/constants';

import {
  CclTabsView,
  CclVerticalTabsView,
  CclVerticalFaqTabsView,
  CclCarouselView,
  RoutingHOC,
  CclProductTabsView,
  FixTemplates,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoTabsBlock';

import {
  CclListingCards,
  CclListingWorkOpportunities,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoListingBlock';

import CclMapMenu from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoArcgisBlock/CclMapMenu';

import CclHomeUsersBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeUsersBlock/CclHomeUsersBlockView';
import CclHomeUsersBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclHomeUsersBlock/CclHomeUsersBlockEdit';

import CclHomeBgImageBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/CclHomeBgImageBlockView';
import CclHomeBgImageBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/CclHomeBgImageBlockEdit';
import CclGreenBgView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/CclGreenBgView';
import CclWhiteBgView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/CclWhiteBgView';

import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

import { ARCGIS_BLOCK } from '@eeacms/volto-arcgis-block/constants';

import CclUseCaseListView from '@eeacms/volto-clms-theme/components/Blocks/CclUseCaseList/CclUseCaseListView';
import CclUseCaseListEdit from '@eeacms/volto-clms-theme/components/Blocks/CclUseCaseList/CclUseCaseListEdit';

import CclTechnicalLibrariesListView from '@eeacms/volto-clms-theme/components/Blocks/CclTechnicalLibrariesList/CclTechnicalLibrariesListView';
import CclTechnicalLibrariesListEdit from '@eeacms/volto-clms-theme/components/Blocks/CclTechnicalLibrariesList/CclTechnicalLibrariesListEdit';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

export const customGroupBlocksOrder = {
  id: 'ccl_blocks',
  title: 'Ccl Blocks',
};

const customBlocks = (config) => ({
  ...config.blocks.blocksConfig,
  [ARCGIS_BLOCK]: {
    ...config.blocks.blocksConfig[ARCGIS_BLOCK],
    styles: {
      ...config.blocks.blocksConfig[ARCGIS_BLOCK]?.styles,
      land: {
        title: 'Copernicus Land',
        customClass: 'land',
      },
    },
    extraMenu: {
      ...config.blocks.blocksConfig[ARCGIS_BLOCK]?.extraMenu,
      land: {
        title: 'Land Products',
        component: CclMapMenu,
      },
    },
  },
  [TABS_BLOCK]: {
    ...config.blocks.blocksConfig[TABS_BLOCK],
    edit: FixTemplates(TabsEdit),
    view: FixTemplates(TabsView),
    deprecated_templates: ['CCLTabs', 'CclRouteTabsView'],
    templates: {
      default: {
        title: 'Horizontal Tabs',
        edit: DefaultEdit,
        view: CclTabsView,
        schema: defaultSchema,
      },
      CCLVerticalTabs: {
        title: 'Vertical Tabs',
        edit: DefaultEdit,
        view: RoutingHOC(CclVerticalTabsView),
        schema: defaultSchema,
      },
      CCLProductTabs: {
        title: 'Vertical Product Tabs',
        edit: DefaultEdit,
        view: CclProductTabsView,
        schema: defaultSchema,
      },
      CCLVerticalFaqTabs: {
        title: 'Vertical FAQ Tabs',
        edit: DefaultEdit,
        view: CclVerticalFaqTabsView,
        schema: defaultSchema,
      },
      CCLCarousel: {
        title: 'Carousel',
        edit: DefaultEdit,
        view: CclCarouselView,
        schema: defaultSchema,
      },
    },
  },
  listing: {
    ...config.blocks.blocksConfig.listing,
    showLinkMore: true,
    variations: [
      ...config.blocks.blocksConfig.listing.variations,
      {
        id: 'CclCardsline-color',
        isDefault: false,
        title: 'CclCards Colored Line',
        template: CclListingCards,
      },
      {
        id: 'CclCardsline',
        isDefault: false,
        title: 'CclCards Image Line',
        template: CclListingCards,
      },
      {
        id: 'CclCardsdoc',
        isDefault: false,
        title: 'CclCards Line',
        template: CclListingCards,
      },
      {
        id: 'CclCardsblock',
        isDefault: false,
        title: 'CclCards Block',
        template: CclListingCards,
      },
      {
        id: 'CclCardsnews',
        isDefault: false,
        title: 'CclCards News',
        template: CclListingCards,
      },
      {
        id: 'CclCardsevent',
        isDefault: false,
        title: 'CclCards Events',
        template: CclListingCards,
      },
      {
        id: 'CclWOOpenTenders',
        isDefault: false,
        title: 'CclWO Open Tenders',
        template: CclListingWorkOpportunities,
      },
      {
        id: 'CclWOCloseTenders',
        isDefault: false,
        title: 'CclWO Close Tenders',
        template: CclListingWorkOpportunities,
      },
    ],
  },
  accordion: {
    ...config.blocks.blocksConfig.accordion,
    titleIcons: {
      closed: { leftPosition: downSVG, rightPosition: downSVG },
      opened: { leftPosition: upSVG, rightPosition: upSVG },
    },
  },
  contextNavigation: {
    id: 'contextNavigation', // The name (id) of the block
    title: 'Context Navigation', // The display name of the block
    icon: navSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclContextNavigationBlockView, // The view mode component
    edit: CclContextNavigationBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 0, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },

  cardContainer: {
    id: 'cardContainer', // The name (id) of the block
    title: 'Card Container', // The display name of the block
    icon: containerSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclCardContainerBlockView, // The view mode component
    edit: CclCardContainerBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },

  cclButtonComponent: {
    id: 'cclButtonComponent', // The name (id) of the block
    title: 'Button', // The display name of the block
    icon: linkSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclButtonBlockView, // The view mode component
    edit: CclButtonBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },

  cardBlock: {
    id: 'cardBlock', // The name (id) of the block
    title: 'Card Block', // The display name of the block
    icon: cardSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclCardBlockView, // The view mode component
    edit: CclCardBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },

  productLeftMenu: {
    id: 'productLeftMenu', // The name (id) of the block
    title: 'Product Left Menu', // The display name of the block
    icon: leftMenuSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclProductLeftMenuView, // The view mode component
    edit: CclProductLeftMenuEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: true, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },

  homeProducts: {
    id: 'homeProducts', // The name (id) of the block
    title: 'Home Products', // The display name of the block
    icon: homeBand, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclHomeProductsBlockView, // The view mode component
    edit: CclHomeProductsBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },

  homeSearch: {
    id: 'homeSearch', // The name (id) of the block
    title: 'Home Search', // The display name of the block
    icon: homeBand, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclHomeSearchBlockView, // The view mode component
    edit: CclHomeSearchBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },
  homeUsers: {
    id: 'homeUsers', // The name (id) of the block
    title: 'Home Users', // The display name of the block
    icon: homeBand, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclHomeUsersBlockView, // The view mode component
    edit: CclHomeUsersBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },
  homeBgImage: {
    id: 'homeBgImage', // The name (id) of the block
    title: 'Home Carousel', // The display name of the block
    icon: homeBand, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclHomeBgImageBlockView, // The view mode component
    edit: CclHomeBgImageBlockEdit, // The edit mode component
    schema: BlockSettingsSchema,
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
    variations: [
      {
        id: 'green-bg',
        isDefault: true,
        title: 'Green background carousel',
        template: CclGreenBgView,
      },
      {
        id: 'white-bg',
        title: 'White background carousel',
        template: CclWhiteBgView,
      },
    ],
  },
  useCaseList: {
    id: 'useCaseList', // The name (id) of the block
    title: 'UseCase List', // The display name of the block
    icon: homeBand, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclUseCaseListView, // The view mode component
    edit: CclUseCaseListEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },
  technicalLibrariesList: {
    id: 'technicalLibrariesList', // The name (id) of the block
    title: 'Technical Libraries List', // The display name of the block
    icon: homeBand, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclTechnicalLibrariesListView, // The view mode component
    edit: CclTechnicalLibrariesListEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },
});

export default customBlocks;
