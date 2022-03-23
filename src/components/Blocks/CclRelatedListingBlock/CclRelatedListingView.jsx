import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import config from '@plone/volto/registry';
import { searchContent } from '@plone/volto/actions';
import { Segment } from 'semantic-ui-react';

const CclRelatedListingView = (props) => {
  const { data, id, properties, metadata } = props;
  const dispatch = useDispatch();
  const searchSubrequests = useSelector(
    (state) => state.search.subrequests?.[props.id],
  );
  const uid = metadata ? metadata['UID'] : properties['UID'];
  let libraries = searchSubrequests?.items || [];
  const variationsConfig =
    config.blocks.blocksConfig['relatedListing'].variations;
  let TemplateView = '';
  let template_id = '';
  var defaultVariation = variationsConfig.filter(
    (configVar) => configVar.isDefault,
  )[0];

  if (!data?.variation) {
    TemplateView = defaultVariation.template;
    template_id = defaultVariation.id;
    data.variation = template_id;
  } else {
    var variation = variationsConfig.filter(
      (configVar1) => configVar1.id === data.variation,
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

  // Configure sorting for the related items
  let sort_on = 'effective';
  let sort_order = 'descending';
  if (data.content_type === 'eea.meeting') {
    sort_on = 'start';
    sort_order = 'descending';
  } else if (data.content_type === 'TechnicalLibrary') {
    sort_on = 'documentation_sorting';
    sort_order = 'ascending';
  }

  React.useEffect(() => {
    uid &&
      !searchSubrequests?.loading &&
      !searchSubrequests?.loaded &&
      !searchSubrequests?.error &&
      dispatch(
        searchContent(
          '/',
          {
            portal_type: data.content_type || 'News Item',
            associated_products: uid,
            metadata_fields: '_all',
            sort_on: sort_on,
            sort_order: sort_order,
          },
          id,
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id, uid, dispatch, searchSubrequests]);

  return (
    <>
      {searchSubrequests?.loaded && libraries.length > 0 ? (
        <TemplateView items={libraries} variation={template_id} />
      ) : (
        <p>There are no related items.</p>
      )}
      {searchSubrequests?.loading && <Segment loading></Segment>}
    </>
  );
};

export default CclRelatedListingView;
