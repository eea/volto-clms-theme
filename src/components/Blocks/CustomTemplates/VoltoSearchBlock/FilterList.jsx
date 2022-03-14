import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

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
  const { facets, setFacets, isEditMode } = props;
  const showFilterList = !Object.values(facets).every((facet) => !facet.length);

  const currentFilters = Object.fromEntries(
    Object.entries(facets).filter((v) => v[1] && v[0] !== 'SearchableText'),
  );

  const totalFilters = [].concat.apply([], Object.values(currentFilters))
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
