import React from 'react';
import config from '@plone/volto/registry';

const CclHomeBgImageBlockView = (props) => {
  const { data } = props;
  const variationsConfig = config.blocks.blocksConfig['homeBgImage'].variations;
  let BodyTemplate = '';
  for (let variation in variationsConfig) {
    if (variationsConfig[variation].id === data.variation) {
      BodyTemplate = variationsConfig[variation].template;
    }
  }

  return <BodyTemplate data={data} isEditMode={false} {...props} />;
};
export default CclHomeBgImageBlockView;
