import React from 'react';
import renderer from 'react-test-renderer';
import DownloadDataSetContent from './DownloadDataSetContent';
import { MemoryRouter } from 'react-router-dom';

describe('DownloadDataSetContent', () => {
  it('Check dataset download view', () => {
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
    const url = '/register';
    const location = {
      pathname: '/register',
    };
    const datasetDownload = renderer
      .create(
        <MemoryRouter>
          <DownloadDataSetContent
            data={data}
            url={url}
            type={type}
            // eslint-disable-next-line no-use-before-define
            location={location.pathname}
          >
            <p>Dataset download view test</p>
          </DownloadDataSetContent>
        </MemoryRouter>,
      )
      .toJSON();
    expect(datasetDownload).toBeDefined();
  });
  it('Check dataset download view with token === "" ', () => {
    const data2 = {
      token: '',
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
          {
            '@id': '5becde46-9fdf-46ff-ad2c-c928a1ef0a3b',
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
      mapviewer_viewservice: [
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
        {
          '@id': '5becde46-9fdf-46ff-ad2c-c928a1ef0a3b',
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
    };
    const type2 = 'raster';
    const url2 = '/register';
    const location2 = {
      pathname: '/register',
    };
    const datasetDownload = renderer
      .create(
        <MemoryRouter>
          <DownloadDataSetContent
            data={data2}
            url={url2}
            type={type2}
            // eslint-disable-next-line no-use-before-define
            location={location2.pathname}
          >
            <p>Dataset download view test</p>
          </DownloadDataSetContent>
        </MemoryRouter>,
      )
      .toJSON();
    expect(datasetDownload).toBeDefined();
  });
});
