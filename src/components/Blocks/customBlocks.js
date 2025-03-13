import {
  AccordionFacet,
  RightModalFacets,
  WithType,
  DoubleRangeFacet,
  DoubleRangeSpatialFacet,
  CheckboxTreeFacet,
  CheckboxTreeParentFacet,
  rewriteOptions,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoSearchBlock';
import { SelectFacetFilterListEntry } from '@plone/volto/components/manage/Blocks/Search/components';
import {
  CclCarouselView,
  CclProductTabsView,
  CclProductTabsWithSubtabsView,
  CclTabsView,
  CclVerticalFaqTabsView,
  CclVerticalTabsView,
  CclVerticalTabsProductOverviewView,
  CclProductToggleView,
  FixTemplates,
  RoutingHOC,
  tabsSchemaWithIcon,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoTabsBlock';
import {
  CclListingCards,
  CclListingWorkOpportunities,
  VariationHOC,
  NoResultsComponent,
  noResultsSchema,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoListingBlock';
import {
  CclProductCardColumnView,
  CclProductCardColumnEdit,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoColumnsBlock';
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
import CclFamiliesCardContainerView from '@eeacms/volto-clms-theme/components/Blocks/CclFamiliesCardContainerBlock/CclFamiliesCardContainerView';
import CclFamiliesCardContainerEdit from '@eeacms/volto-clms-theme/components/Blocks/CclFamiliesCardContainerBlock/CclFamiliesCardContainerEdit';
import CclProductLinksView from '@eeacms/volto-clms-theme/components/Blocks/CclProductLinksBlock/CclProductLinksView';
import CclProductLinksEdit from '@eeacms/volto-clms-theme/components/Blocks/CclProductLinksBlock/CclProductLinksEdit';
import {
  TableBlockView,
  TableBlockEdit,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoTableBlock';
import CclUseCaseListEdit from '@eeacms/volto-clms-theme/components/Blocks/CclUseCaseList/CclUseCaseListEdit';
import CclUseCaseListView from '@eeacms/volto-clms-theme/components/Blocks/CclUseCaseList/CclUseCaseListView';
import CclWhiteBgView from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/CclWhiteBgView';
import RelatedListingSchema from '@eeacms/volto-clms-theme/components/Blocks/CclRelatedListingBlock/schema';
import { TABS_BLOCK } from '@eeacms/volto-tabs-block/constants';
import TextLinkCarouselEdit from '@eeacms/volto-clms-theme/components/Blocks/CclTextLinkCarouselBlock/CclTextLinkCarouselEdit';
import TextLinkCarouselView from '@eeacms/volto-clms-theme/components/Blocks/CclTextLinkCarouselBlock/CclTextLinkCarouselView';
import SubscriptionBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclSubscriptionBlock/SubscriptionView';
import SubscriptionBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclSubscriptionBlock/SubscriptionEdit';
import CclFAQBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclFAQBlock/CclFAQBlockEdit';
import CclFAQBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclFAQBlock/CclFAQBlockView';
import CclHelpdeskDocBlockEdit from '@eeacms/volto-clms-theme/components/Blocks/CclHelpdeskDocBlock/CclHelpdeskDocBlockEdit';
import CclHelpdeskDocBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclHelpdeskDocBlock/CclHelpdeskDocBlockView';
import containerSVG from '@plone/volto/icons/apps.svg';
import { SelectionSchemaExtender } from 'volto-form-block/components/FieldTypeSchemaExtenders';
import {
  customIdFieldSchema,
  CheckboxSchemaExtender,
  CheckboxHtmlWidget,
  VocabularyWidget,
} from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoFormBlock';
import downSVG from '@plone/volto/icons/down-key.svg';
import homeBand from '@plone/volto/icons/image-wide.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import navSVG from '@plone/volto/icons/nav.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import infoSVG from '@plone/volto/icons/info.svg';

import ImageWidget from '@eeacms/volto-clms-theme/components/Widgets/ImageWidget';
import AttachmentWithSizeLimit from '@eeacms/volto-clms-theme/components/Widgets/AttachmentWithSizeLimit';
import TextareaWithRequestData from '@eeacms/volto-clms-theme/components/Widgets/TextareaWithRequestData';
import SelectWithRequestWidget from '@eeacms/volto-clms-theme/components/Widgets/SelectWithRequestWidget';
import TextWidget from '@plone/volto/components/manage/Widgets/TextWidget';
import TextareaWidget from '@plone/volto/components/manage/Widgets/TextareaWidget';
import EmailWidget from '@plone/volto/components/manage/Widgets/EmailWidget';
import { default as FormCustomView } from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoFormBlock/View';
import { default as CustomVideoView } from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VideoBlock/View';
import { default as CustomVideoEdit } from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VideoBlock/Edit';
import { default as CustomHtmlView } from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/HtmlBlock/View';
import { default as CustomHtmlEdit } from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/HtmlBlock/Edit';

import { TeaserSchema } from '@kitconcept/volto-blocks-grid/components/Teaser/schema';

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
  listingVariation('CclFiles', false, 'Files list', 'file'),
  listingVariation(
    'CclFilesDownload',
    false,
    'Files list (link to download)',
    'downloadFile',
  ),
  listingVariation(
    'CclFilesWithoutDate',
    false,
    'Files list (without dates)',
    'fileWithoutDates',
  ),
  listingVariation('CclCardsline', false, 'Line list with Image', 'line'),
  listingVariation(
    'CclCardsline-no-description',
    false,
    'Line list with Image (no description)',
    'line-no-description',
  ),
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
  listingVariation(
    'cardWithBgImage',
    false,
    'Card with background image',
    'cardWithBgImage',
  ),
  listingVariation(
    'cardWithRoundImage',
    false,
    'Image card with round corners',
    'cardWithRoundImage',
  ),
];

const customBlocks = (config) => ({
  ...config.blocks.blocksConfig,
  video: {
    ...config.blocks.blocksConfig.video,
    mostUsed: false,
    restricted: false,
    edit: CustomVideoEdit,
    view: CustomVideoView,
  },
  html: {
    id: 'html',
    title: 'HTML',
    icon: codeSVG,
    group: 'common',
    view: CustomHtmlView,
    edit: CustomHtmlEdit,
    schema: BlockSettingsSchema,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
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
      CCLTabsProductViewToggle: {
        title: 'TabsProductViewToggle',
        edit: DefaultEdit,
        view: CclProductToggleView,
        schema: tabsSchemaWithIcon,
      },
      CCLHorizontalTabsProductOverview: {
        title: 'Horizontal Tabs (Product Overview)',
        edit: DefaultEdit,
        view: RoutingHOC(CclVerticalTabsProductOverviewView),
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
      CCLProductTabsWithSubtabs: {
        title: 'Vertical Product Tabs with Subtabs',
        edit: DefaultEdit,
        view: RoutingHOC(CclProductTabsWithSubtabsView),
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
    schemaEnhancer: noResultsSchema,
    noResultsComponent: NoResultsComponent,
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
  familiesCardContainer: {
    id: 'familiesCardContainer', // The name (id) of the block
    title: 'Families card container', // The display name of the block
    icon: containerSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclFamiliesCardContainerView, // The view mode component
    edit: CclFamiliesCardContainerEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },
  productLinksContainer: {
    id: 'productLinksContainer', // The name (id) of the block
    title: 'Product links container', // The display name of the block
    icon: containerSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclProductLinksView, // The view mode component
    edit: CclProductLinksEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },
  productCardColumn: {
    id: 'productCardColumn', // The name (id) of the block
    title: 'Product card column', // The display name of the block
    icon: containerSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclProductCardColumnView, // The view mode component
    edit: CclProductCardColumnEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: true, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },
  clmsTable: {
    id: 'clmsTable', // The name (id) of the block
    title: 'CLMS Table', // The display name of the block
    icon: containerSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: TableBlockView, // The view mode component
    edit: TableBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: true, // Set this to true if the block manages its own focus
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
            view: WithType(DoubleRangeFacet, 'range'),
            isDefault: false,
            schemaEnhancer: DoubleRangeFacet.schemaEnhancer,
            stateToValue: DoubleRangeFacet.stateToValue,
            valueToQuery: DoubleRangeFacet.valueToQuery,
            filterListComponent: SelectFacetFilterListEntry,
          },
          {
            id: 'doubleRangeSpatialFacet',
            title: 'Double Range for Spatial Resolutions',
            view: WithType(DoubleRangeSpatialFacet, 'range'),
            isDefault: false,
            schemaEnhancer: DoubleRangeSpatialFacet.schemaEnhancer,
            stateToValue: DoubleRangeSpatialFacet.stateToValue,
            valueToQuery: DoubleRangeSpatialFacet.valueToQuery,
            filterListComponent: SelectFacetFilterListEntry,
          },
          {
            id: 'checkboxTreeFacet',
            title: 'Checkbox Tree',
            view: WithType(CheckboxTreeFacet, 'checkbox'),
            isDefault: false,
            schemaEnhancer: CheckboxTreeFacet.schemaEnhancer,
            stateToValue: CheckboxTreeFacet.stateToValue,
            valueToQuery: CheckboxTreeFacet.valueToQuery,
            filterListComponent: SelectFacetFilterListEntry,
          },
          {
            id: 'checkboxTreeParentFacet',
            title: 'Checkbox Tree Parents',
            view: WithType(CheckboxTreeParentFacet, 'checkbox'),
            isDefault: false,
            schemaEnhancer: CheckboxTreeParentFacet.schemaEnhancer,
            stateToValue: CheckboxTreeParentFacet.stateToValue,
            valueToQuery: CheckboxTreeParentFacet.valueToQuery,
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
    view: FormCustomView,
    fieldSchema: customIdFieldSchema,
    fieldTypeSchemaExtenders: {
      ...config.blocks.blocksConfig.form.fieldTypeSchemaExtenders,
      checkbox_html: CheckboxSchemaExtender,
      select_with_request_data: SelectionSchemaExtender,
    },
    additionalFields: [
      {
        id: 'product_vocabulary',
        label: 'Products Vocabulary',
        component: (props) =>
          VocabularyWidget({
            ...props,
            vocabulary: 'clms.types.ProductsAndDatasetsVocabulary',
            isMulti: true,
          }),
      },
      {
        id: 'topic_vocabulary',
        label: 'Topics Vocabulary',
        component: (props) =>
          VocabularyWidget({
            ...props,
            vocabulary: 'clms.types.TopicsVocabulary',
            isMulti: true,
          }),
      },
      {
        id: 'spatial_coverage_vocabulary',
        label: 'Spatial Coverage Vocabulary',
        component: (props) =>
          VocabularyWidget({
            ...props,
            vocabulary: 'collective.taxonomy.use_case_spatial_coverage',
            isMulti: true,
          }),
      },
      {
        id: 'image_field_widget',
        label: 'Image Field Widget',
        component: ImageWidget,
      },
      {
        id: 'checkbox_html',
        label: 'Checkbox with html',
        component: CheckboxHtmlWidget,
        isValid: (formData, name) => formData[name]?.value,
      },
      {
        id: 'text_widget',
        label: 'CCL Text Widget',
        component: TextWidget,
      },
      {
        id: 'text_area_widget',
        label: 'CCL Text Area Widget',
        component: TextareaWidget,
      },
      {
        id: 'email_widget',
        label: 'CCL Email Widget',
        component: EmailWidget,
      },
      {
        id: 'attachment_with_size_limit',
        label: 'Attachment (size limit)',
        component: AttachmentWithSizeLimit,
      },
      {
        id: 'text_area_with_request_data',
        label: 'CCL Text Area with Request Data',
        component: TextareaWithRequestData,
      },
      {
        id: 'select_with_request_data',
        label: 'CCL List with Request Data',
        component: SelectWithRequestWidget,
      },
    ],
  },
  maps: {
    ...config.blocks.blocksConfig.maps,
    restricted: false,
  },
  cclFAQ: {
    id: 'cclFAQ', // The name (id) of the block
    title: 'FAQ Block', // The display name of the block
    icon: containerSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclFAQBlockView, // The view mode component
    edit: CclFAQBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },
  cclHelpdeskDoc: {
    id: 'cclHelpdeskDoc', // The name (id) of the block
    title: 'Helpdesk Documentation block', // The display name of the block
    icon: infoSVG, // The icon used in the block chooser
    group: 'ccl_blocks', // The group (blocks can be grouped, displayed in the chooser)
    view: CclHelpdeskDocBlockView, // The view mode component
    edit: CclHelpdeskDocBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
  },
  teaser: {
    ...config.blocks.blocksConfig.teaser,
    blockSchema: (intl) => {
      const schema = TeaserSchema(intl);
      delete schema.properties.styles;
      schema.fieldsets = schema.fieldsets.filter((s) => s.id === 'default');
      return schema;
    },
  },
});

export default customBlocks;
