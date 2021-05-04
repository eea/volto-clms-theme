import Schema from '@plone/volto/components/manage/Blocks/Block/Schema';

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

const customBlocks = {
  contextNavigation: {
    id: 'contextNavigation', // The name (id) of the block
    title: 'Context Navigation', // The display name of the block
    icon: navSVG, // The icon used in the block chooser
    group: 'common', // The group (blocks can be grouped, displayed in the chooser)
    view: CclContextNavigationBlockView, // The view mode component
    edit: CclContextNavigationBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: true, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 0, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
    blockHasValue: (data) => {
      // Returns true if the provided block data represents a value for the current block.
      // Required for alternate default block types implementations.
      // See also [Settings reference](/configuration/settings-reference)
    },
    // A block can have an schema enhancer function with the signature: (schema) => schema
    // It can be either be at block level (it's applied always) or at a variation level
    // The variation level one takes precedence.
    schemaEnhancer: Schema,
    // A block can define variations (it should include the stock, default one)
    variations: {
      default: { label: 'Default' },
      custom: {
        label: 'Custom',
        // The variation level schema Enhancer function
        schemaEnhancer: Schema,
      },
    },
  },

  cardContainer: {
    id: 'cardContainer', // The name (id) of the block
    title: 'Card Container', // The display name of the block
    icon: containerSVG, // The icon used in the block chooser
    group: 'common', // The group (blocks can be grouped, displayed in the chooser)
    view: CclCardContainerBlockView, // The view mode component
    edit: CclCardContainerBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: true, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
    blockHasValue: (data) => {
      // Returns true if the provided block data represents a value for the current block.
      // Required for alternate default block types implementations.
      // See also [Settings reference](/configuration/settings-reference)
    },
    // A block can have an schema enhancer function with the signature: (schema) => schema
    // It can be either be at block level (it's applied always) or at a variation level
    // The variation level one takes precedence.
    schemaEnhancer: Schema,
    // A block can define variations (it should include the stock, default one)
    variations: {
      default: { label: 'Default' },
      custom: {
        label: 'Custom',
        // The variation level schema Enhancer function
        schemaEnhancer: Schema,
      },
    },
  },

  cclButtonComponent: {
    id: 'cclButtonComponent', // The name (id) of the block
    title: 'Button', // The display name of the block
    icon: linkSVG, // The icon used in the block chooser
    group: 'common', // The group (blocks can be grouped, displayed in the chooser)
    view: CclButtonBlockView, // The view mode component
    edit: CclButtonBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: true, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
    blockHasValue: (data) => {
      // Returns true if the provided block data represents a value for the current block.
      // Required for alternate default block types implementations.
      // See also [Settings reference](/configuration/settings-reference)
    },
    // A block can have an schema enhancer function with the signature: (schema) => schema
    // It can be either be at block level (it's applied always) or at a variation level
    // The variation level one takes precedence.
    schemaEnhancer: Schema,
    // A block can define variations (it should include the stock, default one)
    variations: {
      default: { label: 'Default' },
      custom: {
        label: 'Custom',
        // The variation level schema Enhancer function
        schemaEnhancer: Schema,
      },
    },
  },

  cardBlock: {
    id: 'cardBlock', // The name (id) of the block
    title: 'Card Block', // The display name of the block
    icon: cardSVG, // The icon used in the block chooser
    group: 'common', // The group (blocks can be grouped, displayed in the chooser)
    view: CclCardBlockView, // The view mode component
    edit: CclCardBlockEdit, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: true, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 1, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
    blockHasValue: (data) => {
      // Returns true if the provided block data represents a value for the current block.
      // Required for alternate default block types implementations.
      // See also [Settings reference](/configuration/settings-reference)
    },
    // A block can have an schema enhancer function with the signature: (schema) => schema
    // It can be either be at block level (it's applied always) or at a variation level
    // The variation level one takes precedence.
    schemaEnhancer: Schema,
    // A block can define variations (it should include the stock, default one)
    variations: {
      default: { label: 'Default' },
      custom: {
        label: 'Custom',
        // The variation level schema Enhancer function
        schemaEnhancer: Schema,
      },
    },
  },

  productLeftMenu: {
    id: 'productLeftMenu', // The name (id) of the block
    title: 'Product Left Menu', // The display name of the block
    icon: leftMenuSVG, // The icon used in the block chooser
    group: 'common', // The group (blocks can be grouped, displayed in the chooser)
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
    blockHasValue: (data) => {
      // Returns true if the provided block data represents a value for the current block.
      // Required for alternate default block types implementations.
      // See also [Settings reference](/configuration/settings-reference)
    },
    // A block can have an schema enhancer function with the signature: (schema) => schema
    // It can be either be at block level (it's applied always) or at a variation level
    // The variation level one takes precedence.
    schemaEnhancer: Schema,
    // A block can define variations (it should include the stock, default one)
    variations: {
      default: { label: 'Default' },
      custom: {
        label: 'Custom',
        // The variation level schema Enhancer function
        schemaEnhancer: Schema,
      },
    },
  },
};

export default customBlocks;
