import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import config from '@plone/volto/registry';

const CclReatedListingView = (props) => {
  const { data, id, properties, metadata } = props;
  const dispatch = useDispatch();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const uid = metadata ? metadata['UID'] : properties['UID'];
  let libraries = searchSubrequests?.[props.id]?.items || [];
  const variationsConfig =
    config.blocks.blocksConfig['relatedListing'].variations;
  let TemplateView = '';
  let template_id = '';
  var defaultVariation = variationsConfig.filter(
    (variation) => variation.isDefault,
  )[0];

  if (!data?.variation) {
    TemplateView = defaultVariation.template;
    template_id = defaultVariation.id;
    data.variation = template_id;
  } else {
    var variation = variationsConfig.filter(
      (variation) => variation.id === data.variation,
    )[0];
    TemplateView = variation.template;
    template_id = variation.id;
    data.variation = template_id;
  }

  if (template_id === '') {
    TemplateView = defaultVariation.template;
    template_id = defaultVariation.id;
    data.variation = template_id;
  }

  if (!data.content_type) {
    data.content_type = 'News Item';
  }

  React.useEffect(() => {
    uid &&
      dispatch(
        searchContent(
          '',
          {
            fullobjects: 1,
            portal_type: data.content_type || 'News Item',
            path: '/',
            associated_products: uid,
          },
          id,
        ),
      );
  }, [data, id, uid, dispatch]);

  return (
    <>
      {libraries.length > 0 ? (
        <TemplateView items={libraries} variation={template_id} />
      ) : (
        <p>There are no related {data.content_type} items.</p>
      )}
    </>
  );
};

export default CclReatedListingView;
