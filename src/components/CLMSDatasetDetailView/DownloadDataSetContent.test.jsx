import React from 'react';
import renderer from 'react-test-renderer';
import DownloadDataSetContent from './DownloadDataSetContent';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('DownloadDataSetContent', () => {
  it('Check dataset download view', () => {
    const mockStore = configureStore();

    const store = mockStore({
      userSession: {
        token: null,
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const data = {
      title: 'title example',
      description: 'description example',
      year: 'YYYY',
      resolution: '000m',
      datasetType: 'Raster',
      format: 'Format',
      version: 'v0.0',
      size: '000.0MB',
      downloadable_files: {
        items: [
          {
            '@id': '5becde46-9fdf-46ff-ad2c-c928a1ef0a3a',
            area: 'Area test',
            format: 'PDF',
            path: '213213',
            resolution: '1080m',
            size: '36 MB',
            source: '234',
            type: 'Raster',
            version: '1.0.0',
            year: '2021',
          },
        ],
      },
    };
    const type = 'raster';
    const url = '.register';
    const datasetDownload = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <DownloadDataSetContent data={data} url={url} type={type}>
              <p>Dataset download view test</p>
            </DownloadDataSetContent>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(datasetDownload).toBeDefined();
  });
});
