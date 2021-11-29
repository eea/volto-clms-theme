import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { useSelector, useDispatch } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import config from '@plone/volto/registry';

const CclReatedListingEdit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    selected,
    id,
    properties,
    metadata,
  } = props;
  const dispatch = useDispatch();
  const schema = config.blocks.blocksConfig['relatedListing'].schema;
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const path = metadata ? metadata['@id'] : properties['@id'];
  const uid = metadata ? metadata['UID'] : properties['UID'];
  let libraries = searchSubrequests?.[props.id]?.items || [];
  const variationsConfig =
    config.blocks.blocksConfig['relatedListing'].variations;
  let TemplateView = '';
  let template_id = '';
  for (let variation in variationsConfig) {
    if (!data?.variation && variationsConfig[variation].isDefault) {
      TemplateView = variationsConfig[variation].template;
      template_id = variationsConfig[variation].id;
    }
    if (variationsConfig[variation].id === data?.variation) {
      TemplateView = variationsConfig[variation].template;
      template_id = variationsConfig[variation].id;
    }
  }
  if (!template_id) {
    for (let variation in variationsConfig) {
      if (variationsConfig[variation].isDefault) {
        TemplateView = variationsConfig[variation].template;
        template_id = variationsConfig[variation].id;
      }
    }
  }
  React.useEffect(() => {
    dispatch(
      searchContent(
        path,
        {
          fullobjects: 1,
          portal_type: data.content_type || 'News Item',
          path: '/',
          associated_products: uid,
        },
        id,
      ),
    );
  }, [path, data, id, uid, dispatch]);

  return (
    <>
      <div className="technical-libraries">
        <h2>Related Listings</h2>
        <TemplateView items={libraries} variation={template_id} />
      </div>
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={schema()}
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
