import React from 'react';
import { HomeBgImageSchema } from './CclHomeBgImageSchema';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';

import config from '@plone/volto/registry';

const CclHomeBgImageBlockEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;
  const variationsConfig = config.blocks.blocksConfig['homeBgImage'].variations;
  let BodyTemplate = '';
  let variationId = '';
  if (!!data?.variation) {
    for (let variation in variationsConfig) {
      if (variationsConfig[variation].id === data.variation) {
        variationId = data.variation;
        BodyTemplate = variationsConfig[variation].template;
      }
    }
  } else {
    for (let variation in variationsConfig) {
      if (variationsConfig[variation].isDefault === true) {
        variationId = variationsConfig[variation].id;
        BodyTemplate = variationsConfig[variation].template;
      }
    }
  }
  React.useEffect(() => {
    onChangeBlock(block, {
      ...data,
      variation: variationId,
    });
    /* eslint-disable-next-line */
  }, []);
  return (
    <>
      <BodyTemplate
        onChangeBlock={onChangeBlock}
        isEditMode={true}
        {...props}
      />
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={HomeBgImageSchema(config, data.hasButton)}
          title="Carousel Div block"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </>
  );
};

export default CclHomeBgImageBlockEdit;
