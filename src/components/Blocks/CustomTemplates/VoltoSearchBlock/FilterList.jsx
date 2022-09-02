import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { structure_taxonomy_terms } from '@eeacms/volto-clms-theme/components';

const messages = defineMessages({
  currentFilters: {
    id: 'Current filters applied',
    defaultMessage: 'Current filters applied',
  },
  clearFilters: {
    id: 'Clear filters',
    defaultMessage: 'Clear filters',
  },
});

const FilterList = (props) => {
  const { facets, setFacets, isEditMode, data, querystring } = props;
  const showFilterList = !Object.values(facets).every((facet) => !facet.length);

  const baseFacets = data.facets;
  const currentFilters = Object.fromEntries(
    Object.entries(facets)
      .filter((v) => v[1] && v[0] !== 'SearchableText')
      .filter(
        (v) =>
          v[1] &&
          baseFacets.length > 0 &&
          baseFacets.map((bf) => bf.field?.value).includes(v[0]),
      ),
  );
  const fieldsToAvoidChildren =
    data?.facets?.length > 0
      ? data.facets
          .filter((item) => item.type === 'checkboxTreeParentFacet')
          .map((item) => item.field.value)
      : [];
  let filtersToAvoid = [];
  if (querystring.loaded) {
    filtersToAvoid = fieldsToAvoidChildren
      .map((field) => {
        let result = [];
        const fieldValuesDict = querystring?.indexes[field]?.values;
        const fieldValues = Object.keys(fieldValuesDict).map((fieldKey) => {
          return { value: fieldKey, label: fieldValuesDict[fieldKey].title };
        });
        const fieldStructuredValues = structure_taxonomy_terms(fieldValues);
        fieldStructuredValues.forEach((parent) => {
          parent.childrens.forEach((children) => result.push(children.value));
        });
        return result;
      })
      .flat(1);
  }
  const filtersToAvoidSet = new Set(filtersToAvoid);

  // if (choices?.length > 0) {
  //   options = structure_taxonomy_terms(choices);
  // }
  const currentFiltersToCount = {};
  Object.keys(currentFilters).forEach((filterKey) => {
    currentFiltersToCount[filterKey] =
      typeof currentFilters[filterKey] === 'object'
        ? currentFilters[filterKey].filter((filter) => {
            return !filtersToAvoidSet.has(filter);
          })
        : null;
  });
  // const totalFilters = [].concat.apply([], Object.values(currentFilters))
  //   .length;

  const totalFilters = [].concat.apply([], Object.values(currentFiltersToCount))
    .length;
  const intl = useIntl();

  return showFilterList && Object.keys(currentFilters).length ? (
    <div className="accordion ui filter-listing">
      <div
        className="filter-list-header"
        style={{ cursor: 'auto' }}
        active={false}
      >
        <div className="filter-list-title">
          {intl.formatMessage(messages.currentFilters)}: {totalFilters}
        </div>
        <Button
          icon
          basic
          compact
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            !isEditMode && setFacets({});
          }}
        >
          <Icon name="trash" />
          {intl.formatMessage(messages.clearFilters)}
        </Button>
      </div>
    </div>
  ) : null;
};

export default FilterList;
