import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { useSelector } from 'react-redux';

const CclRelatedListingEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;
  const schema = config.blocks.blocksConfig['relatedListing'].blockSchema;
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const types = useSelector((state) => state.types.types);
  const types_schema = types.map((type) => [
    type['@id'].split('/').pop(),
    type.title,
  ]);
  let libraries = searchSubrequests?.[props.id]?.items || [];
  const variationsConfig =
    config.blocks.blocksConfig['relatedListing'].variations;
  let TemplateView = <></>;
  let template_id = '';

  var defaultVariation = variationsConfig.find(
    (configVar) => configVar.isDefault,
  );
  if (variationsConfig.some((variation) => variation.id === data.variation)) {
    const theVariation = variationsConfig.find(
      (variation) => variation.id === data.variation,
    );
    TemplateView = theVariation?.template;
    template_id = theVariation.templateId;
  } else {
    TemplateView = defaultVariation.template;
    template_id = defaultVariation.id;
    data.variation = template_id;
  }
  if (!data.content_type) {
    data.content_type = 'News Item';
  }
  return (
    <>
      <div className="technical-libraries">
        <h2>Related Listings</h2>
        {libraries.length > 0 && template_id ? (
          <TemplateView items={libraries} variation={template_id} />
        ) : (
          <p>There are no related {data.content_type} items.</p>
        )}
      </div>
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={schema({ types_schema })}
          title="Related Listing block"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default CclRelatedListingEdit;
