import { mergeConfig } from '@eeacms/search';
import { getClientProxyAddress, getSearchThumbUrl } from './utils';
import vocabs from './vocabulary';
import facets from './facets';
import views from './views';

const clmsConfig = {
  title: 'CLMS Main',
  ...views,
};

export default function install(config) {
  const envConfig = process.env.RAZZLE_ENV_CONFIG
    ? JSON.parse(process.env.RAZZLE_ENV_CONFIG)
    : clmsConfig;

  const pjson = require('@eeacms/volto-clms-theme/../package.json');

  envConfig.app_name = pjson.name;
  envConfig.app_version = pjson.version;

  config.searchui.clmsSearchTechnicalLibrary = {
    ...mergeConfig(envConfig, config.searchui.globalsearchbase),
    elastic_index: '_es/clmsSearchTechnicalLibrary',
    index_name: 'copernicus_searchui',
    host: process.env.RAZZLE_ES_PROXY_ADDR || 'http://localhost:3000',
    ...vocabs,
  };

  const { clmsSearchTechnicalLibrary } = config.searchui;

  clmsSearchTechnicalLibrary.permanentFilters.push({
    term: {
      cluster_name: 'copernicus_land',
    },
  });

  clmsSearchTechnicalLibrary.facets = facets;

  clmsSearchTechnicalLibrary.resultItemModel = {
    factory: 'ResultModel',
    urlField: 'about',
    titleField: 'title',
    metatypeField: 'objectProvides',
    descriptionField: 'description',
    tagsField: 'topic',
    issuedField: 'issued',
    getThumbnailUrl: 'getSearchThumbUrl',
    getIconUrl: 'getGlobalsearchIconUrl',
  };

  clmsSearchTechnicalLibrary.sortOptions = [
    {
      name: 'Relevance',
      value: '',
      direction: '',
    },
    {
      name: 'Newest',
      value: 'issued.date',
      direction: 'desc',
    },
    {
      name: 'Oldest',
      value: 'issued.date',
      direction: 'asc',
    },
    {
      name: 'Version ↑',
      value: 'version.keyword',
      direction: 'asc',
    },
    {
      name: 'Version ↓',
      value: 'version.keyword',
      direction: 'desc',
    },
  ];
  config.resolve.getSearchThumbUrl = getSearchThumbUrl();

  if (typeof window !== 'undefined') {
    config.searchui.clmsSearchTechnicalLibrary.host =
      process.env.RAZZLE_ES_PROXY_ADDR || getClientProxyAddress();
  }

  return config;
}
