import React from 'react';

import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = {
  title: 'Text link',
  properties: {
    text: {
      title: 'Text',
      type: 'string',
    },
    link: {
      title: 'Link',
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: ['Title', 'Description', '@type', '@id'],
      allowExternals: true,
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Bounding-Box',
      fields: ['text', 'link'],
    },
  ],
  required: [],
};

const TextLinkWidget = (props) => {
  return (
    <ObjectListWidget
      schema={ItemSchema}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default TextLinkWidget;
