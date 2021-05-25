import React from 'react';
import renderer from 'react-test-renderer';
import CLMSDatasetDetailView from './CLMSDatasetDetailView';
import { MemoryRouter } from 'react-router-dom';

describe('CLMSDatasetDetailView', () => {
  it('Check metadata view', () => {
    const content = {
      url: './example',
      download: true,
      dataResourceTitle: 'example title',
      dataResourceAbstract: {
        data: 'exampledata',
      },
      dataSources: {
        title: 'example title',
        description: 'example description',
        tooltip: 'example tooltip',
        data: 'Source data',
      },
      dataResourceLocator: 'Resource locator',
      image: {
        src:
          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
        alt: 'Placeholder',
      },
    };
    const DatasetDetailView = renderer
      .create(
        <MemoryRouter>
          <CLMSDatasetDetailView content={content}>
            <p>Metadata view test</p>
          </CLMSDatasetDetailView>
        </MemoryRouter>,
      )
      .toJSON();
    expect(DatasetDetailView).toBeDefined();
  });
});
