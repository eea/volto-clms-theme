import { Button, Grid, Segment } from 'semantic-ui-react';
import {
  Facets,
  SearchDetails,
  SortOn,
} from '@plone/volto/components/manage/Blocks/Search/components';
import { defineMessages, useIntl } from 'react-intl';
import SearchInput from './SearchInput';
import FilterList from './FilterList';
import CclFiltersModal from '@eeacms/volto-clms-theme/components/CclFiltersModal/CclFiltersModal';
import { Icon } from '@plone/volto/components';
import React from 'react';
import filterSVG from '@plone/volto/icons/filter.svg';
import { flushSync } from 'react-dom';
import { usesGlobalSearchDesign } from './searchDesign';

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

const getSortLabel = (value, querystring) => {
  const title = querystring?.sortable_indexes?.[value]?.title || value;
  if (
    ['effective', 'publication_date', 'modified'].includes(value) ||
    /publication date/i.test(title)
  ) {
    return 'Time';
  }
  if (value === 'sortable_title') {
    return 'Title';
  }
  if (value === 'relevance') {
    return 'Relevance';
  }
  return title?.replace(/^Sort by /, '') || value;
};

const GlobalSortOn = ({
  data,
  querystring,
  isEditMode,
  sortOn,
  sortOrder,
  onChange,
}) => {
  const configuredOptions = data.sortOnOptions || [];
  const concreteOptions = configuredOptions.filter(
    (option) => !['SearchableText', 'relevance'].includes(option),
  );
  const options = ['relevance', ...concreteOptions];
  const activeSortOn = sortOn && options.includes(sortOn) ? sortOn : options[0];

  if (!options.length) return null;

  return (
    <div className="sorting global-search-sorting">
      <span className="global-search-sort-label">Sort by:</span>
      {options.map((option) => {
        const isActive = activeSortOn === option;
        return (
          <button
            key={option}
            type="button"
            className={isActive ? 'active' : ''}
            onClick={() => {
              if (isEditMode) return;
              if (option === 'relevance') {
                onChange(null, null);
                return;
              }
              const nextOrder =
                isActive && sortOrder === 'ascending'
                  ? 'descending'
                  : 'ascending';
              onChange(option, nextOrder);
            }}
          >
            {getSortLabel(option, querystring)}
            {isActive && option !== 'relevance' && (
              <span className="global-search-sort-direction">
                {sortOrder === 'descending' ? '▼' : '▲'}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

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
  const hasGlobalSearchDesign = usesGlobalSearchDesign(props);
  const intl = useIntl();
  // Should we generalize this to an external function?
  if (querystring?.sortable_indexes?.effective?.title) {
    querystring.sortable_indexes.effective.title = 'Publication date';
  }
  if (querystring?.sortable_indexes?.sortable_title?.title) {
    querystring.sortable_indexes.sortable_title.title = 'Sort by title';
  }
  if (querystring?.sortable_indexes?.modified?.title) {
    querystring.sortable_indexes.modified.title = 'Last edited';
  }
  if (querystring?.sortable_indexes?.publication_date?.title) {
    querystring.sortable_indexes.publication_date.title = 'Publication date';
  }
  if (querystring?.sortable_indexes?.version?.title) {
    querystring.sortable_indexes.version.title = 'Version';
  }

  const updateFacets = setFacetsHandler(
    setFacets,
    onTriggerSearch,
    searchedText,
  );

  const facetsModal = data.facets?.length ? (
    <CclFiltersModal
      trigger={
        <div className="filters-element">
          <div className="filters-title">
            {hasGlobalSearchDesign ? (
              <span
                className="global-search-categories-icon"
                aria-hidden="true"
              >
                <Icon
                  className="global-search-categories-filter-icon"
                  name={filterSVG}
                  size="10px"
                  color="#fff"
                />
              </span>
            ) : (
              <Icon className="ui" name={filterSVG} size={'20'} />
            )}
            <span className="filters-title-bold">
              {hasGlobalSearchDesign ? 'Show Categories' : data.facetsTitle}
            </span>
          </div>
        </div>
      }
      data={data}
      setFacets={updateFacets}
    >
      <div id="right-modal-facets" className="facets">
        <Facets
          querystring={querystring}
          data={data}
          facets={facets}
          isEditMode={isEditMode}
          setFacets={updateFacets}
          facetWrapper={FacetWrapper}
        />
      </div>
    </CclFiltersModal>
  ) : null;

  return (
    <Grid
      className={[
        'searchBlock-facets right-column-facets',
        hasGlobalSearchDesign ? 'global-search-facets' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      stackable
    >
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
            <>
              {hasGlobalSearchDesign ? (
                <SearchInput
                  {...props}
                  isLive={isLive}
                  useSearchlibSearchDesign={hasGlobalSearchDesign}
                />
              ) : (
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
              <div className="search-box-hint">
                <p>
                  Hint: you can use double quotes to search for exact phrases.
                  Ex: "High resolution vegetation"
                </p>
              </div>
            </>
          )}

          {hasGlobalSearchDesign ? (
            <>
              <div className="global-search-count">
                <SearchDetails total={totalItems} data={data} as="div" />
              </div>
              <div className="above-results global-search-above-results">
                <div className="global-search-filters-left">
                  {facetsModal}
                  <FilterList
                    {...props}
                    variant="globalSearch"
                    isEditMode={isEditMode}
                    setFacets={updateFacets}
                  />
                </div>
                {data.showSortOn && (
                  <GlobalSortOn
                    data={data}
                    querystring={querystring}
                    isEditMode={isEditMode}
                    sortOrder={sortOrder}
                    sortOn={sortOn}
                    onChange={(sortOnParam, sortOrderParam) => {
                      flushSync(() => {
                        setSortOn(sortOnParam || undefined);
                        setSortOrder(sortOrderParam || undefined);
                        onTriggerSearch(
                          searchedText || '',
                          facets,
                          sortOnParam,
                          sortOrderParam,
                        );
                      });
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <FilterList
                  {...props}
                  isEditMode={isEditMode}
                  setFacets={updateFacets}
                />
              </div>

              <div className="search-results-count-sort search-filters">
                <SearchDetails total={totalItems} data={data} />
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
                          onTriggerSearch(
                            searchedText || '',
                            facets,
                            sortOnParam,
                          );
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
                  {facetsModal}
                </div>
              </div>
            </>
          )}
          {children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RightModalFacets;
