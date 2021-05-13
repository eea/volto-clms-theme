import CLMSDatasetDetailView from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView/CLMSDatasetDetailView';
import EventsView from '@eeacms/volto-clms-theme/components/CLMSEvents/EventsView';
import customBlocks, {
  customGroupBlocksOrder,
} from '@eeacms/volto-clms-theme/components/Blocks/customBlocks';
import TabsWidget from './components/Blocks/CustomTemplates/VoltoTabsBlock/TabsWidget';

const applyConfig = (config) => {
  config.views = {
    ...config.views,
    contentTypesViews: {
      ...config.contentTypesViews,
      DataSet: CLMSDatasetDetailView,
      Event: EventsView,
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
