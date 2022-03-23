import {
  AccordionFacet,
  RightModalFacets,
  WithType,
  DoubleRangeFacet,
  CheckboxTreeFacet,
  rewriteOptions,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoSearchBlock';
import { SelectFacetFilterListEntry } from '@plone/volto/components/manage/Blocks/Search/components';
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
import CclRelatedListingEdit from '@eeacms/volto-clms-theme/components/Blocks/CclRelatedListingBlock/CclRelatedListingEdit';
import CclRelatedListingView from '@eeacms/volto-clms-theme/components/Blocks/CclRelatedListingBlock/CclRelatedListingView';
import CclUseCaseListEdit from '@eeacms/volto-clms-theme/components/Blocks/CclUseCaseList/CclUseCaseListEdit';
import CclUseCaseListView from '@eeacms/volto-clms-theme/components/Blocks/CclUseCaseList/CclUseCaseListView';
import CclWhiteBgView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/CclWhiteBgView';
import RelatedListingSchema from '@eeacms/volto-clms-theme/components/Blocks/CclRelatedListingBlock/schema';
import { TABS_BLOCK } from '@eeacms/volto-tabs-block/constants';
import TextLinkCarouselEdit from '@eeacms/volto-clms-theme/components/Blocks/CclTextLinkCarouselBlock/CclTextLinkCarouselEdit';
import TextLinkCarouselView from '@eeacms/volto-clms-theme/components/Blocks/CclTextLinkCarouselBlock/CclTextLinkCarouselView';
import SubscriptionBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclSubscriptionBlock/SubscriptionView';
import SubscriptionBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclSubscriptionBlock/SubscriptionEdit';
import containerSVG from '@plone/volto/icons/apps.svg';
import customIdFieldSchema from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoFormBlock/customIdFieldSchema';
import downSVG from '@plone/volto/icons/down-key.svg';
import homeBand from '@plone/volto/icons/image-wide.svg';
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

function listingVariation(id, isDefault, title, template, isWO = false) {
  return {
    id: id,
    isDefault: isDefault,
    title: title,
    templateID: template,
    template: isWO
      ? CclListingWorkOpportunities
      : VariationHOC(CclListingCards, template),
  };
}

const availableVariations = [
  listingVariation('CclCardsdoc', true, 'Line list', 'doc'),
  listingVariation('CclCardsline', false, 'Line list with Image', 'line'),
  listingVariation(
    'CclCardsline-color',
    false,
    'Colored Line list with Image',
    'line-color',
  ),
  listingVariation('CclCardsblock', false, '2 Column Cards list', 'block'),
  listingVariation(
    'CclCardsthreeColumns',
    false,
    '3 Column Cards list',
    'threeColumns',
  ),
  listingVariation('CclCardsnews', false, 'News Line list', 'news'),
  listingVariation('CclCardsevent', false, 'Events Line list', 'event'),
  listingVariation(
    'CclWOOpenTenders',
    false,
    'Open Work Opportunities',
    'OpenTenders',
    true,
  ),
  listingVariation(
    'CclWOCloseTenders',
    false,
    'Closed Work Opportunities',
    'CloseTenders',
    true,
  ),
  listingVariation('CclGlobalSearch', false, 'Global search', 'globalSearch'),
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
    view: TabsView,
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
    variations: availableVariations,
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
    schema: BlockSettingsSchema,
    blockSchema: RelatedListingSchema,
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
    variations: availableVariations,
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
  search: {
    ...config.blocks.blocksConfig.search,
    variations: [
      {
        id: 'facetsModalRightSide',
        title: 'Facets on modal right side',
        view: RightModalFacets,
        isDefault: true,
      },
      ...config.blocks.blocksConfig.search.variations,
    ],
    extensions: {
      ...config.blocks.blocksConfig.search.extensions,
      facetWidgets: {
        ...config.blocks.blocksConfig.search.extensions.facetWidgets,
        rewriteOptions: (name, choices) => {
          return rewriteOptions(name, choices);
        },
        types: [
          {
            id: 'accordionCheckboxFacet',
            title: 'Accordion Checkbox',
            view: WithType(AccordionFacet, 'checkbox'),
            isDefault: true,
            schemaEnhancer: AccordionFacet.schemaEnhancer,
            stateToValue: AccordionFacet.stateToValue,
            valueToQuery: AccordionFacet.valueToQuery,
            filterListComponent: SelectFacetFilterListEntry,
          },
          {
            id: 'accordionLabelFacet',
            title: 'Accordion Label',
            view: WithType(AccordionFacet, 'label'),
            isDefault: false,
            schemaEnhancer: AccordionFacet.schemaEnhancer,
            stateToValue: AccordionFacet.stateToValue,
            valueToQuery: AccordionFacet.valueToQuery,
            filterListComponent: SelectFacetFilterListEntry,
          },
          {
            id: 'doubleRangeFacet',
            title: 'Double Range',
            view: DoubleRangeFacet,
            isDefault: false,
            schemaEnhancer: DoubleRangeFacet.schemaEnhancer,
            stateToValue: DoubleRangeFacet.stateToValue,
            valueToQuery: DoubleRangeFacet.valueToQuery,
            filterListComponent: SelectFacetFilterListEntry,
          },
          {
            id: 'checkboxTreeFacet',
            title: 'Checkbox Tree',
            view: CheckboxTreeFacet,
            isDefault: false,
            schemaEnhancer: CheckboxTreeFacet.schemaEnhancer,
            stateToValue: CheckboxTreeFacet.stateToValue,
            valueToQuery: CheckboxTreeFacet.valueToQuery,
            filterListComponent: SelectFacetFilterListEntry,
          },

          ...config.blocks.blocksConfig.search.extensions.facetWidgets.types,
        ],
      },
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
  subscriptionBlock: {
    id: 'subscriptionBlock', // The name (id) of the block
    title: 'Subscription Block', // The display name of the block
    icon: homeBand, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: SubscriptionBlockView, // The view mode component
    edit: SubscriptionBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },
  form: {
    ...config.blocks.blocksConfig.form,
    fieldSchema: customIdFieldSchema,
  },
});

export default customBlocks;
