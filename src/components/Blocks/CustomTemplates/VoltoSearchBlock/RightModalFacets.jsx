import React from 'react';
import {
  SearchInput,
  SearchDetails,
  Facets,
  FilterList,
  SortOn,
} from '@plone/volto/components/manage/Blocks/Search/components';
import { Grid, Segment } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { flushSync } from 'react-dom';
import { defineMessages, useIntl } from 'react-intl';
import CclFiltersModal from '@eeacms/volto-clms-theme/components/CclFiltersModal/CclFiltersModal';
import filterSVG from '@plone/volto/icons/filter.svg';
import { Icon } from '@plone/volto/components';

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
      <Grid.Row>
        <Grid.Column>
          {data.headline && <h2 className="headline">{data.headline}</h2>}
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column mobile={12} tablet={12} computer={12}>
          {(Object.keys(data).includes('showSearchInput')
            ? data.showSearchInput
            : true) && (
            <div className="search-wrapper">
              <SearchInput {...props} isLive={isLive} />
              {data.showSearchButton && (
                <Button primary onClick={() => onTriggerSearch(searchText)}>
                  {data.searchButtonLabel ||
                    intl.formatMessage(messages.searchButtonText)}
                </Button>
              )}
            </div>
          )}

          <div>
            <FilterList
              {...props}
              isEditMode={isEditMode}
              setFacets={(f) => {
                flushSync(() => {
                  setFacets(f);
                  onTriggerSearch(searchedText || '', f);
                });
              }}
            />
          </div>

          <div className="search-results-count-sort filters-container">
            <SearchDetails text={searchedText} total={totalItems} />
            {data.showSortOn && (
              <SortOn
                data={data}
                querystring={querystring}
                isEditMode={isEditMode}
                sortOrder={sortOrder}
                sortOn={sortOn}
                setSortOn={(sortOn) => {
                  flushSync(() => {
                    setSortOn(sortOn);
                    onTriggerSearch(searchedText || '', facets, sortOn);
                  });
                }}
                setSortOrder={(sortOrder) => {
                  flushSync(() => {
                    setSortOrder(sortOrder);
                    onTriggerSearch(
                      searchedText || '',
                      facets,
                      sortOn,
                      sortOrder,
                    );
                  });
                }}
              />
            )}
            {data.facets?.length && (
              <CclFiltersModal
                trigger={
                  <div className="filters-element filters-element-filter">
                    <div className="filters-title">
                      <Icon className="ui" name={filterSVG} size={20} />
                      <span className="filters-title-bold">
                        {data.facetsTitle}
                      </span>
                    </div>
                  </div>
                }
                data={data}
              >
                <div id="right-modal-facets" className="facets">
                  <Facets
                    querystring={querystring}
                    data={data}
                    facets={facets}
                    isEditMode={isEditMode}
                    setFacets={(f) => {
                      flushSync(() => {
                        setFacets(f);
                        onTriggerSearch(searchedText || '', f);
                      });
                    }}
                    facetWrapper={FacetWrapper}
                  />
                </div>
              </CclFiltersModal>
            )}
          </div>
          {children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RightModalFacets;
