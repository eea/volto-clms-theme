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

export const customGroupBlocksOrder = {
  id: 'ccl_blocks',
  title: 'Ccl Blocks',
};

const customBlocks = {
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
};

export default customBlocks;
