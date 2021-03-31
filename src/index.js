import CLMSDocumentView from '@eea/volto-clms-theme/components/CLMSDocumentView/CLMSDocumentView'; 

const applyConfig = (config) => {
    config.views = {
        ...config.views,
        contentTypesViews: {
            ...config.contentTypesViews,
            Document: CLMSDocumentView
        }
    }
  return config;
};

export default applyConfig;
