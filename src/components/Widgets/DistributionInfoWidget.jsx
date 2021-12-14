import React from 'react';

import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = {
  title: 'DistributionInfoWidget',
  properties: {
    resourceLocator: {
      title: 'Resource Locator',
      description: 'Enter link of the resource',
      type: 'string',
    },
    services: {
      title: 'Services',
      description: 'Enter the resource protocol',
      type: 'string',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Distribution Info',
      fields: ['resourceLocator', 'services'],
    },
  ],
  required: [],
};

const DistributionInfoWidget = (props) => {
  return (
    <ObjectListWidget
      schema={ItemSchema}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default DistributionInfoWidget;
