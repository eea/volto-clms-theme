import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Segment, Input, Pagination } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

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
    directQuery = {},
    directRelation = false,
    searchParamsExecution = () => {},
  } = props;
  const use_pagination = useFilteredPagination(
    [],
    10,
    id,
    searchParamsExecution,
  );
  const p_functions = use_pagination.functions;
  const p_data = use_pagination.data;
  const { pagination, currentPage, paginationSize, dataList } = p_data;

  const dispatch = useDispatch();
  const uid = metadata ? metadata['UID'] : properties['UID'];
  const allSearchSubrequests = useSelector((state) => state.search.subrequests);
  const searchSubrequests = allSearchSubrequests?.[`${id}-${uid}`];
  const sLoaded = searchSubrequests?.loaded;
  const sLoading = searchSubrequests?.loading;

  const associated = directRelation
    ? directQuery
    : associated_elements === 'products'
    ? { associated_products: uid }
    : { associated_datasets: uid };

  let libraries = searchSubrequests?.items || [];
  const variationsConfig =
    config.blocks.blocksConfig['relatedListing'].variations;
  let TemplateView = <></>;
  let template_id = '';
  var defaultVariation = variationsConfig.find(
    (configVar) => configVar.isDefault,
  );

  if (variationsConfig.some((configVar1) => configVar1.id === data.variation)) {
    var variation = variationsConfig.find(
      (configVar1) => configVar1.id === data.variation,
    );
    TemplateView = variation.template;
    template_id = variation.id;
    data.variation = template_id;
  } else {
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
    uid &&
      id &&
      !searchSubrequests?.loading &&
      !sLoaded &&
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
            b_size: 99999,
          },
          `${id}-${uid}`,
        ),
      );
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id, uid, dispatch]);

  React.useEffect(() => {
    if (sLoaded && properties?.technical_documents_order) {
      const orderMap = new Map(
        properties?.technical_documents_order.items?.map((item, index) => [
          item.id,
          index,
        ]) || [],
      );

      // Sort libraries based on the technical_documents_order
      const sorted = [...libraries].sort(
        (a, b) =>
          (orderMap.get(a['@id']) ?? Infinity) -
          (orderMap.get(b['@id']) ?? Infinity),
      );

      p_functions.setOriginalDataList([...sorted]);
      p_functions.setDataList([...sorted]);
    }
    if (sLoaded && !properties?.technical_documents_order) {
      p_functions.setOriginalDataList([...libraries]);
      p_functions.setDataList([...libraries]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sLoaded, properties.technical_documents_order, libraries]);

  return (
    <>
      {sLoaded && libraries.length > 0 ? (
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
      ) : sLoading ? (
        <Loader active inline="centered">
          <FormattedMessage id="Loading..." defaultMessage="Loading..." />
        </Loader>
      ) : (
        <p>There are no related items.</p>
      )}
      {searchSubrequests?.loading && <Segment loading></Segment>}
    </>
  );
};

export default CclRelatedListingView;
