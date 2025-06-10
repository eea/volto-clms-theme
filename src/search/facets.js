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

// Change default Last 5 years with All time
const facet = facets.find((f) => f.field === 'issued.date');
if (facet && facet.default && Array.isArray(facet.default.values)) {
  facet.default.values[0] = 'All time';
}

// Disable Include archived content filter
const facet_is_archived = facets.find((f) => f.field === 'IncludeArchived');
if (facet_is_archived && facet_is_archived.showInSecondaryFacetsList) {
  facet_is_archived.showInSecondaryFacetsList = false;
}
export default facets;
