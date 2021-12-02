import React from 'react';

import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = {
  title: 'Contact',
  properties: {
    organisationName: {
      title: 'Organisation Name',
      description: 'Enter the Organisation Name of the contact.',
      type: 'string',
    },
    deliveryPoint: {
      title: 'Delivery Point',
      description: 'Enter the Delivery Point of the contact.',
      type: 'string',
    },
    city: {
      title: 'City',
      description: 'Enter the City of the contact.',
      type: 'string',
    },
    administrativeArea: {
      title: 'Administrative Area',
      description: 'Enter the Administrative Area of the contact.',
      type: 'string',
    },
    postalCode: {
      title: 'Postal Code',
      description: 'Enter the Postal Code of the contact.',
      type: 'string',
    },
    country: {
      title: 'Country',
      description: 'Enter the Country of the contact.',
      type: 'string',
    },
    electronicMailAddress: {
      title: 'Electronic Mail Address',
      description: 'Enter the Electronic Mail Address of the contact.',
      type: 'string',
    },
    roleCode: {
      title: 'Role Code',
      description: 'Enter the Role Code of the contact.',
      type: 'string',
    },
    url: {
      title: 'URL',
      description: 'Enter the URL of the contact.',
      type: 'string',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Contact',
      fields: [
        'organisationName',
        'deliveryPoint',
        'city',
        'administrativeArea',
        'postalCode',
        'country',
        'electronicMailAddress',
        'roleCode',
        'url',
      ],
    },
  ],
  required: [],
};

const ContactWidget = (props) => {
  return (
    <ObjectListWidget
      schema={ItemSchema}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default ContactWidget;
