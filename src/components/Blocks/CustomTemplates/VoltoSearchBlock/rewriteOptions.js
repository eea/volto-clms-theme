export const portal_types_labels = {
  DataSet: 'Dataset',
  Product: 'Product',
  'News Item': 'News',
  'eea.meeting': 'Event',
  UseCase: 'Use case',
  WorkOpportunity: 'Job vacancy',
  Tender: 'Tender',
  TechnicalLibrary: 'Product documentation',
};

export const category_labels = {
  farming: 'Farming',
  biota: 'Biota',
  boundaries: 'Boundaries',
  climatologyMeteorologyAtmosphere: 'Climatology / Meteorology / Atmosphere',
  economy: 'Economy',
  elevation: 'Elevation',
  environment: 'Environment',
  geoscientificInformation: 'Geoscientific Information',
  health: 'Health',
  imageryBaseMapsEarthCover: 'Imagery / Base Maps / Earth Cover',
  intelligenceMilitary: 'Intelligence / Military',
  inlandWaters: 'InlandWaters',
  location: 'Location',
  oceans: 'Oceans',
  planningCadastre: 'Planning Cadastre',
  society: 'Society',
  structure: 'Structure',
  transportation: 'Transportation',
  utilitiesCommunication: 'Utilities / Communication',
};

const rewriteOptions = (name, choices) => {
  var result = choices;
  if (name === 'review_state') {
    result = choices.map((opt) => ({
      ...opt,
      label: opt.label.replace(/\[.+\]/, '').trim(),
    }));
  }
  const portal_types = [
    'DataSet',
    'Product',
    'News Item',
    'eea.meeting',
    'UseCase',
    'WorkOpportunity',
    'Tender',
    'TechnicalLibrary',
  ];
  if (name === 'portal_type') {
    result = choices
      .filter((opt) => portal_types.includes(opt.value))
      .map((opt) => {
        return { ...opt, label: portal_types_labels[opt.value] };
      })
      .sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        } else if (a.label > b.label) {
          return 1;
        }
        return 0;
      });
  }
  if (name === 'classificationTopicCategory') {
    result = choices
      .map((opt) => {
        return { ...opt, label: category_labels[opt.value] };
      })
      .sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        } else if (a.label > b.label) {
          return 1;
        }
        return 0;
      });
  }
  if (name === 'gemet') {
    result = choices.sort((a, b) => {
      if (a.label.toLowerCase() < b.label.toLowerCase()) {
        return -1;
      } else if (a.label.toLowerCase() > b.label.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  return result;
};

export default rewriteOptions;
