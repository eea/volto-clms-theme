import {
  CclCarouselView,
  CclProductTabsView,
  CclTabsView,
  CclVerticalFaqTabsView,
  CclVerticalTabsView,
  FixTemplates,
  RoutingHOC,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoTabsBlock';
import {
  CclListingCards,
  CclListingWorkOpportunities,
  VariationHOC,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoListingBlock';
import {
  DefaultEdit,
  TabsEdit,
  TabsView,
  defaultSchema,
} from '@eeacms/volto-tabs-block/components';

import { ARCGIS_BLOCK } from '@eeacms/volto-arcgis-block/constants';
import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';
import CclButtonBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclButtonBlock/CclButtonBlockEdit';
import CclButtonBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclButtonBlock/CclButtonBlockView';
import CclCardBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclCardBlock/CclCardBlockEdit';
import CclCardBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclCardBlock/CclCardBlockView';
import CclCardContainerBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclCardContainerBlock/CclCardContainerBlockEdit';
import CclCardContainerBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclCardContainerBlock/CclCardContainerBlockView';
import CclContextNavigationBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclContextNavigationBlock/CclContextNavigationBlockEdit';
import CclContextNavigationBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclContextNavigationBlock/CclContextNavigationBlockView';
import CclGreenBgView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/CclGreenBgView';
import CclHomeBgImageBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/CclHomeBgImageBlockEdit';
import CclHomeBgImageBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/CclHomeBgImageBlockView';
import CclHomeProductsBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclHomeProductsBlock/CclHomeProductsBlockEdit';
import CclHomeProductsBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeProductsBlock/CclHomeProductsBlockView';
import CclHomeSearchBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclHomeSearchBlock/CclHomeSearchBlockEdit';
import CclHomeSearchBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeSearchBlock/CclHomeSearchBlockView';
import CclHomeUsersBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclHomeUsersBlock/CclHomeUsersBlockEdit';
import CclHomeUsersBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeUsersBlock/CclHomeUsersBlockView';
import CclMapMenu from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoArcgisBlock/CclMapMenu';
import CclProductLeftMenuEdit from '@eeacms/volto-clms-theme/components/Blocks/CclProductLeftMenu/CclProductLeftMenuEdit';
import CclProductLeftMenuView from '@eeacms/volto-clms-theme/components/Blocks/CclProductLeftMenu/CclProductLeftMenuView';
import CclRelatedListingEdit from '@eeacms/volto-clms-theme/components/Blocks/CclRelatedListingBlock/CclRelatedListingEdit';
import CclRelatedListingView from '@eeacms/volto-clms-theme/components/Blocks/CclRelatedListingBlock/CclRelatedListingView';
import CclUseCaseListEdit from '@eeacms/volto-clms-theme/components/Blocks/CclUseCaseList/CclUseCaseListEdit';
import CclUseCaseListView from '@eeacms/volto-clms-theme/components/Blocks/CclUseCaseList/CclUseCaseListView';
import CclWhiteBgView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/CclWhiteBgView';
import RelatedListingSchema from '@eeacms/volto-clms-theme/components/Blocks/CclRelatedListingBlock/schema';
import { TABS_BLOCK } from '@eeacms/volto-tabs-block/constants';
import TextLinkCarouselEdit from '@eeacms/volto-clms-theme/components/Blocks/CclTextLinkCarouselBlock/CclTextLinkCarouselEdit';
import TextLinkCarouselView from '@eeacms/volto-clms-theme/components/Blocks/CclTextLinkCarouselBlock/CclTextLinkCarouselView';
import cardSVG from '@plone/volto/icons/indent.svg';
import containerSVG from '@plone/volto/icons/apps.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import homeBand from '@plone/volto/icons/image-wide.svg';
import leftMenuSVG from '@plone/volto/icons/nav.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import navSVG from '@plone/volto/icons/nav.svg';
import upSVG from '@plone/volto/icons/up-key.svg';

export const customGroupBlocksOrder = [
  {
    id: 'ccl_blocks',
    title: 'Ccl Blocks',
  },
  {
    id: 'ccl_home_specific',
    title: 'Home Specific',
  },
];

const customBlocks = (config) => ({
  ...config.blocks.blocksConfig,
  video: {
    ...config.blocks.blocksConfig.video,
    mostUsed: false,
  },

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
    mostUsed: true, // A meta group `most used`, appearing at the top of the chooser
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
        view: RoutingHOC(CclProductTabsView),
        schema: defaultSchema,
      },
      CCLVerticalFaqTabs: {
        title: 'Vertical FAQ Tabs',
        edit: DefaultEdit,
        view: RoutingHOC(CclVerticalFaqTabsView),
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
      {
        id: 'CclCardsdoc',
        isDefault: true,
        title: 'Line list',
        template: VariationHOC(CclListingCards, 'doc'),
      },
      {
        id: 'CclCardsline',
        isDefault: false,
        title: 'Line list with Image',
        template: VariationHOC(CclListingCards, 'line'),
      },
      {
        id: 'CclCardsline-color',
        isDefault: false,
        title: 'Colored Line list with Image',
        template: VariationHOC(CclListingCards, 'line-color'),
      },
      {
        id: 'CclCardsblock',
        isDefault: false,
        title: '2 Column Cards list',
        template: VariationHOC(CclListingCards, 'block'),
      },
      {
        id: 'CclCardsthreeColumns',
        isDefault: false,
        title: '3 Column Cards list',
        template: VariationHOC(CclListingCards, 'threeColumns'),
      },
      {
        id: 'CclCardsnews',
        isDefault: false,
        title: 'News Line list',
        template: VariationHOC(CclListingCards, 'news'),
      },
      {
        id: 'CclCardsevent',
        isDefault: false,
        title: 'Events Line list',
        template: VariationHOC(CclListingCards, 'event'),
      },
      {
        id: 'CclWOOpenTenders',
        isDefault: false,
        title: 'Open Work Opportunities',
        template: VariationHOC(CclListingWorkOpportunities, 'OpenTenders'),
      },
      {
        id: 'CclWOCloseTenders',
        isDefault: false,
        title: 'Closed Work Opportunities',
        template: VariationHOC(CclListingWorkOpportunities, 'CloseTenders'),
      },
    ],
  },
  accordion: {
    ...config.blocks.blocksConfig.accordion,
    mostUsed: true,
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
  productLeftMenu: {
    id: 'productLeftMenu', // The name (id) of the block
    title: 'Product Left Menu', // The display name of the block
    icon: leftMenuSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclProductLeftMenuView, // The view mode component
    edit: CclProductLeftMenuEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
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
  relatedListing: {
    id: 'relatedListing', // The name (id) of the block
    title: 'Related items listing', // The display name of the block
    icon: homeBand, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclRelatedListingView, // The view mode component
    edit: CclRelatedListingEdit, // The edit mode component
    schema: RelatedListingSchema,
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
        id: 'CclCardsdoc',
        isDefault: false,
        title: 'Line list',
        template: CclListingCards,
      },
      {
        id: 'CclCardsline',
        isDefault: true,
        title: 'Line list with Image',
        template: CclListingCards,
      },
      {
        id: 'CclCardsline-color',
        isDefault: false,
        title: 'Colored Line list with Image',
        template: CclListingCards,
      },
      {
        id: 'CclCardsblock',
        isDefault: false,
        title: 'Cards list',
        template: CclListingCards,
      },
      {
        id: 'CclCardsnews',
        isDefault: false,
        title: 'News Line list',
        template: CclListingCards,
      },
      {
        id: 'CclCardsevent',
        isDefault: false,
        title: 'Events Line list',
        template: CclListingCards,
      },
    ],
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
  homeBgImage: {
    id: 'homeBgImage', // The name (id) of the block
    title: 'Carousel Item', // The display name of the block
    icon: homeBand, // The icon used in the block chooser
    group: 'ccl_home_specific', // The group (blocks can be grouped, displayed in the chooser)
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
        title: 'Green background',
        template: CclGreenBgView,
      },
      {
        id: 'white-bg',
        title: 'White background',
        template: CclWhiteBgView,
      },
    ],
  },
  textLinkCarousel: {
    id: 'textLinkCarousel', // The name (id) of the block
    title: 'Text and Link Carousel', // The display name of the block
    icon: homeBand, // The icon used in the block chooser
    group: 'ccl_home_specific', // The group (blocks can be grouped, displayed in the chooser)
    view: TextLinkCarouselView, // The view mode component
    edit: TextLinkCarouselEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
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
    group: 'ccl_home_specific', // The group (blocks can be grouped, displayed in the chooser)
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
    group: 'ccl_home_specific', // The group (blocks can be grouped, displayed in the chooser)
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
    group: 'ccl_home_specific', // The group (blocks can be grouped, displayed in the chooser)
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
});

export default customBlocks;
