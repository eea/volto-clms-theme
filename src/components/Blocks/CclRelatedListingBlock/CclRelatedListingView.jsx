import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import config from '@plone/volto/registry';

const CclReatedListingView = (props) => {
  const { data, id, properties, metadata } = props;
  const dispatch = useDispatch();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const path = metadata ? metadata['@id'] : properties['@id'];
  const uid = metadata ? metadata['UID'] : properties['UID'];
  let libraries = searchSubrequests?.[props.id]?.items || [];
  const variationsConfig =
    config.blocks.blocksConfig['relatedListing'].variations;
  let TemplateView = '';
  let template_id = '';
  for (let variation in variationsConfig) {
    if (variationsConfig[variation].id === data?.variation) {
      TemplateView = variationsConfig[variation].template;
      template_id = variationsConfig[variation].id;
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

  return <TemplateView items={libraries} variation={template_id} />;
};

export default CclReatedListingView;
