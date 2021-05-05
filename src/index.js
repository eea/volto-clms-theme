import CLMSDocumentView from '@eeacms/volto-clms-theme/components/CLMSDocumentView/CLMSDocumentView';
import CLMSDatasetDetailView from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView/CLMSDatasetDetailView';

import customBlocks, {
  customGroupBlocksOrder,
} from '@eeacms/volto-clms-theme/components/Blocks/customBlocks';

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
    blocksConfig: { ...config.blocks.blocksConfig, ...customBlocks },
    groupBlocksOrder: [
      ...config.blocks.groupBlocksOrder,
      customGroupBlocksOrder,
    ],
  };

  return config;
};
export default applyConfig;
