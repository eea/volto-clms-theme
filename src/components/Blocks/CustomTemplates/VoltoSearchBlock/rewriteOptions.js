export const portal_types_labels = {
  DataSet: 'Dataset',
  Product: 'Product',
  'News Item': 'News',
  'eea.meeting': 'Event',
  UseCase: 'Use case',
  WorkOpportunity: 'Work opportunity',
  Tender: 'Tender',
  TechnicalLibrary: 'Product documentation',
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
  return result;
};

export default rewriteOptions;
