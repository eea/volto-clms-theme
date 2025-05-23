import installMainSearch from './config';

const extra = {
  text_fields: ['title^4', 'subject^1.5', 'description^1.5'],
  score_mode: 'sum',
};

const applyConfig = (config) => {
  config.settings.searchlib = installMainSearch(config.settings.searchlib);

  config.settings.searchlib.searchui.clmsSearchTechnicalLibrary.extraQueryParams = extra;

  return config;
};
export default applyConfig;
