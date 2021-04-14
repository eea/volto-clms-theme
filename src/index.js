import CLMSDocumentView from '@eea/volto-clms-theme/components/CLMSDocumentView/CLMSDocumentView'; 


import CclContextNavigationBlockView from '@eea/volto-clms-theme/components/Blocks/CclContextNavigationBlock/CclContextNavigationBlockView';
import CclContextNavigationBlockEdit from '@eea/volto-clms-theme/components/Blocks/CclContextNavigationBlock/CclContextNavigationBlockEdit';
import navSVG from '@plone/volto/icons/nav.svg';

import Schema from '@plone/volto/components/manage/Blocks/Block/Schema';

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
        schemaEnhancer: Schema
      }
    }
  },
};


const applyConfig = (config) => {
    config.views = {
        ...config.views,
        contentTypesViews: {
            ...config.contentTypesViews,
            Document: CLMSDocumentView
        }
    }
    config.blocks = {
        ...config.blocks,
        blocksConfig: { ...config.blocks.blocksConfig, ...customBlocks },
    }
  return config;
};

export default applyConfig;
