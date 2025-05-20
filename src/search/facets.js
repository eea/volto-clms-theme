import globalSearchBaseConfig from '@eeacms/volto-globalsearch/config/global-search-base-config.js';

export const library_categories = {
  field: 'library_categories_facet.keyword',
  factory: 'MultiTermFacet',
  label: 'Categories',
  showInFacetsList: true,
  filterType: 'any',
  isFilterable: false,
  show: 10000,
  isMulti: true,
};

const facets = [library_categories, ...globalSearchBaseConfig.facets];

export default facets;
