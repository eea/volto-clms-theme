export const checkAllChildren = (value, option) => {
  if (!option?.childrens || option.childrens.length === 0) {
    return [...value, { label: option.label, value: option.value }];
  }
  option.childrens.forEach((ch) => {
    if (value.filter((v) => v.value === ch.value).length === 0) {
      value.push(ch);
    }
  });
  return [...value, { label: option.label, value: option.value }];
};

export const uncheckOptionAndChildren = (value, option) => {
  return value
    .filter((item) => item.value !== option.value)
    .filter((item) => {
      if (option.childrens?.length > 0) {
        return !option.childrens.map((ch) => ch.value).includes(item.value);
      } else {
        return true;
      }
    });
};

export const enhanceExpandedByDefault = ({ schema, formData }) => {
  return expandedByDefault(schema);
};

export const doubleRangeFacetSchemaEnhancer = ({ schema, formData }) => {
  // adds (enables) the 'multiple' field after the 'type' dropdown
  let { fields } = schema.fieldsets[0];
  const pos = fields.indexOf('type') + 1;
  fields = [
    ...fields.slice(0, pos),
    'step',
    'multiple',
    ...fields.slice(pos, fields.length),
  ];

  schema.properties = {
    ...schema.properties,
    step: { title: 'Step', type: 'number', default: 1 },
  };
  schema.fieldsets[0].fields = fields;
  return expandedByDefault(schema);
};

export const expandedByDefault = (schema) => {
  schema.properties = {
    ...schema.properties,
    expandedByDefault: {
      title: 'Expanded by default',
      type: 'boolean',
      default: false,
    },
  };
  schema.fieldsets[0].fields.push('expandedByDefault');
  return schema;
};
