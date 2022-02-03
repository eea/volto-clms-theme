import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';

const CclReatedListingEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;
  const schema = config.blocks.blocksConfig['relatedListing'].blockSchema;
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const types = useSelector((state) => state.types.types);
  const types_schema = types.map((type) => [type.title, type.title]);
  let libraries = searchSubrequests?.[props.id]?.items || [];
  const variationsConfig =
    config.blocks.blocksConfig['relatedListing'].variations;
  let TemplateView = '';
  let template_id = '';
  for (let variation in variationsConfig) {
    if (!data?.variation && variationsConfig[variation].isDefault) {
      TemplateView = variationsConfig[variation].template;
      template_id = variationsConfig[variation].id;
      data.variation = template_id;
    }
    if (variationsConfig[variation].id === data?.variation) {
      TemplateView = variationsConfig[variation].template;
      template_id = variationsConfig[variation].id;
    }
  }
  if (template_id === '') {
    for (let variation in variationsConfig) {
      if (variationsConfig[variation].isDefault) {
        TemplateView = variationsConfig[variation].template;
        template_id = variationsConfig[variation].id;
        data.variation = template_id;
      }
    }
  }
  if (!data.content_type) {
    data.content_type = 'News Item';
  }
  return (
    <>
      <div className="technical-libraries">
        <h2>Related Listings</h2>
        {libraries.length > 0 ? (
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

export default CclReatedListingEdit;
