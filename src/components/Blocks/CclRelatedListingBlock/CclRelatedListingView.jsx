import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Input, Pagination } from 'semantic-ui-react';

import { searchContent } from '@plone/volto/actions';
import { Icon } from '@plone/volto/components';
import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';
import config from '@plone/volto/registry';

import { useFilteredPagination } from '../../CclUtils/useFilteredPagination';

const CclRelatedListingView = (props) => {
  const {
    data,
    id,
    properties,
    metadata,
    associated_elements = 'products',
  } = props;
  const use_pagination = useFilteredPagination([]);
  const p_functions = use_pagination.functions;
  const p_data = use_pagination.data;
  const { pagination, currentPage, paginationSize, dataList } = p_data;

  const dispatch = useDispatch();
  const searchSubrequests = useSelector(
    (state) => state.search.subrequests?.[id],
  );
  const uid = metadata ? metadata['UID'] : properties['UID'];
  const associated =
    associated_elements === 'products'
      ? { associated_products: uid }
      : { associated_datasets: uid };
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
    //if documentation_sorting is null the TechnicalLibrary is not stored in libraries [BACKEND]
    sort_on = ['documentation_sorting', 'sortable_title'];
    sort_order = ['ascending', 'ascending'];
  } else if (data.content_type === 'UseCase') {
    sort_on = 'sortable_title';
    sort_order = 'ascending';
  }
  const ref = React.useRef();

  const handleScroll = (ref) => {
    ref.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (searchSubrequests?.loaded) {
      p_functions.setOriginalDataList([...searchSubrequests.items]);
      p_functions.setDataList([...searchSubrequests.items]);
    }

    uid &&
      !searchSubrequests?.loading &&
      !searchSubrequests?.loaded &&
      !searchSubrequests?.error &&
      dispatch(
        searchContent(
          '/',
          {
            portal_type: data.content_type || 'News Item',
            ...associated,
            metadata_fields: '_all',
            sort_on: sort_on,
            sort_order: sort_order,
            sort_limit: 99999,
          },
          id,
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id, uid, dispatch, searchSubrequests]);

  return (
    <>
      {searchSubrequests?.loaded && libraries.length > 0 ? (
        <div ref={ref}>
          {paginationSize < libraries.length && (
            <div className="block search">
              <div className="search-wrapper">
                <div className="search-input">
                  <Input
                    id={`${id}-searchtext`}
                    placeholder={'Search in the following items'}
                    fluid
                    onChange={(event, value) => {
                      p_functions.applySearch(event, value, 'title');
                      p_functions.setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <TemplateView items={pagination} variation={template_id} />
          {dataList.length / paginationSize > 1 && (
            <div className="pagination-wrapper">
              <Pagination
                activePage={currentPage}
                totalPages={Math.ceil(dataList.length / paginationSize)}
                onPageChange={(e, { activePage }) => {
                  if (ref.current) handleScroll(ref.current);
                  p_functions.setCurrentPage(activePage);
                }}
                firstItem={null}
                lastItem={null}
                prevItem={{
                  content: <Icon name={paginationLeftSVG} size="18px" />,
                  icon: true,
                  'aria-disabled': currentPage === 1,
                  className: currentPage === 1 ? 'disabled' : null,
                }}
                nextItem={{
                  content: <Icon name={paginationRightSVG} size="18px" />,
                  icon: true,
                  'aria-disabled':
                    currentPage === Math.ceil(dataList.length / paginationSize),
                  className:
                    currentPage === Math.ceil(dataList.length / paginationSize)
                      ? 'disabled'
                      : null,
                }}
              ></Pagination>
            </div>
          )}
        </div>
      ) : (
        <p>There are no related items.</p>
      )}
      {searchSubrequests?.loading && <Segment loading></Segment>}
    </>
  );
};

export default CclRelatedListingView;
