import React from 'react';
import renderer from 'react-test-renderer';
import CclTable from './CclTable';
import { MemoryRouter } from 'react-router-dom';

describe('CclTable', () => {
  it('Check event card', () => {
    const table = renderer
      .create(
        <MemoryRouter>
          <CclTable
            title="title example"
            description="description example"
            year="YYYY"
            resolution="000m"
            type="raster"
            datasetType="Raster"
            format="Format"
            version="v0.0"
            size="000.0MB"
          >
            <p>Table test</p>
          </CclTable>
        </MemoryRouter>,
      )
      .toJSON();
    expect(table).toBeDefined();
  });
});
