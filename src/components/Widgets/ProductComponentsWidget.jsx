import React from 'react';
import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = () => ({
  title: 'Product component',
  properties: {
    name: {
      title: 'Name',
      description: 'Enter the name of this component.',
      type: 'string',
    },
    description: {
      title: 'Description',
      description: 'Enter the description of this component.',
      type: 'text',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Component',
      fields: ['name', 'description'],
    },
  ],
  required: [],
});

const ProductComponentsWidget = (props) => {
  return (
    <ObjectListWidget
      schema={ItemSchema()}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default ProductComponentsWidget;
