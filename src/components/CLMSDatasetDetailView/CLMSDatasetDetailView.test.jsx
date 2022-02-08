import React from 'react';
import renderer from 'react-test-renderer';
import CLMSDatasetDetailView from './CLMSDatasetDetailView';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('CLMSDatasetDetailView', () => {
  it('Check metadata view', () => {
    const mockStore = configureStore();
    const content = {
      title: 'Test title!',
      url: './example',
      description: 'Description test',
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
    const store = mockStore({
      content: {
        ...content,
        // dataset: {
        //   downloadable_files: {
        //     items: {
        //       name: 'dsad',
        //       UID: '123',
        //       unique_id: 123,
        //       '@id': 123,
        //     },
        //   },
        // },

        // create: {},
        // data: {},
      },
      userSession: {
        token: '',
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const DatasetDetailView = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CLMSDatasetDetailView content={content}>
              <p>Metadata view test</p>
            </CLMSDatasetDetailView>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(DatasetDetailView).toBeDefined();
  });
});
