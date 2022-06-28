import { Button, Grid, Segment } from 'semantic-ui-react';
import {
  Facets,
  SearchDetails,
  SearchInput,
  SortOn,
} from '@plone/volto/components/manage/Blocks/Search/components';
import { defineMessages, useIntl } from 'react-intl';

import FilterList from './FilterList';
import CclFiltersModal from '@eeacms/volto-clms-theme/components/CclFiltersModal/CclFiltersModal';
import { Icon } from '@plone/volto/components';
import React from 'react';
import filterSVG from '@plone/volto/icons/filter.svg';
import { flushSync } from 'react-dom';

const messages = defineMessages({
  searchButtonText: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const FacetWrapper = ({ children }) => (
  <Segment basic className="facet">
    {children}
  </Segment>
);

function setFacetsHandler(setFacets, onTriggerSearch, searchedText) {
  return (f) => {
    flushSync(() => {
      setFacets(f);
      onTriggerSearch(searchedText || '', f);
    });
  };
}

const RightModalFacets = (props) => {
  const {
    children,
    data,
    totalItems,
    facets,
    setFacets,
    setSortOn,
    setSortOrder,
    sortOn,
    sortOrder,
    onTriggerSearch,
    searchedText, // search text for previous search
    searchText, // search text currently being entered (controlled input)
    isEditMode,
    querystring = {},
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;
  const intl = useIntl();
  return (
    <Grid className="searchBlock-facets right-column-facets" stackable>
      {data?.headline && (
        <Grid.Row>
          <Grid.Column>
            {data.headline && <h2 className="headline">{data.headline}</h2>}
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row>
        <Grid.Column mobile={12} tablet={12} computer={12}>
          {(Object.keys(data).includes('showSearchInput')
            ? data.showSearchInput
            : true) && (
            <div className="search-wrapper">
              <SearchInput {...props} isLive={isLive} />
              {data.showSearchButton && (
                <Button
                  primary
                  onClick={() => onTriggerSearch(searchText)}
                  aria-label={
                    data.searchButtonLabel ||
                    intl.formatMessage(messages.searchButtonText)
                  }
                >
                  <span className="ccl-icon-zoom"></span>
                </Button>
              )}
            </div>
          )}

          <div>
            <FilterList
              {...props}
              isEditMode={isEditMode}
              setFacets={setFacetsHandler(
                setFacets,
                onTriggerSearch,
                searchedText,
              )}
            />
          </div>

          <div className="search-results-count-sort search-filters">
            <SearchDetails total={totalItems} />
            <div className="filters-container">
              {data.showSortOn && (
                <SortOn
                  data={data}
                  querystring={querystring}
                  isEditMode={isEditMode}
                  sortOrder={sortOrder}
                  sortOn={sortOn}
                  setSortOn={(sortOnParam) => {
                    flushSync(() => {
                      setSortOn(sortOnParam);
                      onTriggerSearch(searchedText || '', facets, sortOnParam);
                    });
                  }}
                  setSortOrder={(sortOrderParam) => {
                    flushSync(() => {
                      setSortOrder(sortOrderParam);
                      onTriggerSearch(
                        searchedText || '',
                        facets,
                        sortOn,
                        sortOrderParam,
                      );
                    });
                  }}
                />
              )}
              {data.facets?.length && (
                <CclFiltersModal
                  trigger={
                    <div className="filters-element">
                      <div className="filters-title">
                        <Icon className="ui" name={filterSVG} size={'20'} />
                        <span className="filters-title-bold">
                          {data.facetsTitle}
                        </span>
                      </div>
                    </div>
                  }
                  data={data}
                  setFacets={setFacetsHandler(
                    setFacets,
                    onTriggerSearch,
                    searchedText,
                  )}
                >
                  <div id="right-modal-facets" className="facets">
                    <Facets
                      querystring={querystring}
                      data={data}
                      facets={facets}
                      isEditMode={isEditMode}
                      setFacets={setFacetsHandler(
                        setFacets,
                        onTriggerSearch,
                        searchedText,
                      )}
                      facetWrapper={FacetWrapper}
                    />
                  </div>
                </CclFiltersModal>
              )}
            </div>
          </div>
          {children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RightModalFacets;
