import React from 'react';
import renderer from 'react-test-renderer';
import CLMSDatasetDetailView from './CLMSDatasetDetailView';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('CLMSDatasetDetailView', () => {
  it('Check metadata view', () => {
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
      downloadable_dataset: true,
      downloadable_files: [
        {
          title: 'example title',
          description: 'example description',
          tooltip: 'example tooltip',
          url: './example',
        },
        {
          title: 'example title',
          description: 'example description',
          tooltip: 'example tooltip',
          url: './example',
        },
      ],
    };
    const store = mockStore({
      content: {
        ...content,
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      search: {
        subrequest: {
          '123': { items: [] },
        },
      },
      users: {
        user: { roles: ['Manager'] },
      },
      userSession: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0NDM4MzA0NCwiZnVsbG5hbWUiOm51bGx9.cB_q3Q0Jhu8h2m_SDmmknodpDxDLfb4o-qY6Y2plE04',
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
  it('Check metadata view without downloadable files', () => {
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
      downloadable_dataset: true,
      downloadable_files: [],
    };
    const store = mockStore({
      content: {
        ...content,
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      search: {
        subrequest: {
          '123': { items: [] },
        },
      },
      users: {
        user: { roles: ['Manager'] },
      },
      userSession: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0NDM4MzA0NCwiZnVsbG5hbWUiOm51bGx9.cB_q3Q0Jhu8h2m_SDmmknodpDxDLfb4o-qY6Y2plE04',
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
  it('Check metadata view with geonetwork_identifiers items lenght > 0 user roles exists and user roles includes manager', () => {
    const content = {
      geonetwork_identifiers: [
        {
          title: 'example title',
          description: 'example description',
          tooltip: 'example tooltip',
          url: './example',
        },
        {
          title: 'example title',
          description: 'example description',
          tooltip: 'example tooltip',
          url: './example',
        },
      ],
    };
    const store = mockStore({
      content: {
        ...content,
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      search: {
        subrequest: {
          '123': { items: [] },
        },
      },
      user: { roles: ['Manager'] },
      userSession: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0NDM4MzA0NCwiZnVsbG5hbWUiOm51bGx9.cB_q3Q0Jhu8h2m_SDmmknodpDxDLfb4o-qY6Y2plE04',
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
