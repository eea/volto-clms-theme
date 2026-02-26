import installMainSearch from './config';

const extra = {
  text_fields: ['title^7', 'subject^3', 'description^3', 'all_fields_for_freetext^1'],
  score_mode: 'sum',
};

const applyConfig = (config) => {
  config.settings.searchlib = installMainSearch(config.settings.searchlib);

  config.settings.searchlib.searchui.clmsSearchTechnicalLibrary.extraQueryParams = extra;

  return config;
};
export default applyConfig;
