export const portal_types_labels = {
  DataSet: 'Dataset',
  Product: 'Product',
  'News Item': 'News',
  'eea.meeting': 'Event',
  UseCase: 'Use case',
  WorkOpportunity: 'Vacancy',
  Tender: 'Tender',
  TechnicalLibrary: 'Product documentation',
  ProductionUpdates: 'Production updates',
  Document: 'Other content',
  FAQ: 'FAQ',
  File: 'Files',
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
    'Product',
    'DataSet',
    'TechnicalLibrary',
    'FAQ',
    'UseCase',
    'News Item',
    'eea.meeting',
    'Tender',
    'WorkOpportunity',
    'Document',
    'File',
    'ProductionUpdates',
  ];

  const dataset_geographical_classification = [
    'EEA',
    'Northern hemisphere',
    'Southern hemisphere',
    'Global',
  ];

  if (name === 'portal_type') {
    result = choices
      .filter((opt) => portal_types.includes(opt.value))
      .map((opt) => {
        return { ...opt, label: portal_types_labels[opt.value] };
      })
      .sort((a, b) => {
        return portal_types.indexOf(a.value) - portal_types.indexOf(b.value);
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
  // if (name === 'taxonomy_technical_library_categorization') {
  //   result = choices
  //     .sort((a, b) => {
  //       if (a.label < b.label) {
  //         return -1;
  //       } else if (a.label > b.label) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //     .map((opt) => {
  //       return { ...opt, label: opt.label.replace(/^[0-9][0-9]#/, '') };
  //     });
  // }
  if (name === 'component_title') {
    result = choices
      .sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        } else if (a.label > b.label) {
          return 1;
        }
        return 0;
      })
      .map((opt) => {
        return { ...opt, label: opt.label.replace(/^[0-9][0-9]#/, '') };
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

  if (name === 'dataset_geographical_classification') {
    result = choices.sort((a, b) => {
      return (
        dataset_geographical_classification.indexOf(a.value) -
        dataset_geographical_classification.indexOf(b.value)
      );
    });
  }

  return result;
};

export default rewriteOptions;
