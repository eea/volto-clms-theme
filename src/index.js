import CLMSDocumentView from '@eeacms/volto-clms-theme/components/CLMSDocumentView/CLMSDocumentView';
import CLMSDatasetDetailView from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView/CLMSDatasetDetailView';

import customBlocks, {
  customGroupBlocksOrder,
} from '@eeacms/volto-clms-theme/components/Blocks/customBlocks';
import TabsWidget from './components/Blocks/CustomTemplates/VoltoTabsBlock/TabsWidget';

const applyConfig = (config) => {
  config.views = {
    ...config.views,
    contentTypesViews: {
      ...config.contentTypesViews,
      Document: CLMSDocumentView,
      DataSet: CLMSDatasetDetailView,
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
  config.widgets.type.tabs = TabsWidget;
  return config;
};
export default applyConfig;
