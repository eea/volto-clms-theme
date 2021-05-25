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
    };
    const type = 'raster';
    const url = '.register';
    const datasetDownload = renderer
      .create(
        <MemoryRouter>
          <DownloadDataSetContent data={data} url={url} type={type}>
            <p>Dataset download view test</p>
          </DownloadDataSetContent>
        </MemoryRouter>,
      )
      .toJSON();
    expect(datasetDownload).toBeDefined();
  });
});
