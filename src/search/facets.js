import globalSearchBaseConfig from '@eeacms/volto-globalsearch/config/global-search-base-config.js';

// TODO clean
export const copernicus_components = {
  field: 'taxonomy_copernicus_components.keyword',
  factory: 'MultiTermFacet',
  label: 'Copernicus components',
  showInFacetsList: true,
  filterType: 'any',
  isFilterable: false,
  show: 10000,
  isMulti: true,
};

// TODO clean
export const copernicus_services = {
  field: 'copernicus_services.keyword',
  factory: 'MultiTermFacet',
  label: 'Copernicus services',
  showInFacetsList: true,
  filterType: 'any',
  isFilterable: false,
  show: 10000,
  isMulti: true,
};

const facets = [
  copernicus_components,
  copernicus_services,
  ...globalSearchBaseConfig.facets,
];

export default facets;
