import React from 'react';
import renderer from 'react-test-renderer';
import DataSetInfoContent from './DataSetInfoContent';
import { MemoryRouter } from 'react-router-dom';

describe('DataSetInfoContent', () => {
  it('Check dataset info view', () => {
    const data = {
      dataResourceAbstract: {
        title: 'example title',
        description: 'example description',
        tooltip: 'example tooltip',
        data: 'Resource Abstract example',
      },
      dataSources: {
        title: 'example title',
        description: 'example description',
        tooltip: 'example tooltip',
        data: 'Source data',
      },
      dataResourceLocator: 'Resource locator',
    };
    const datasetInfo = renderer
      .create(
        <MemoryRouter>
          <DataSetInfoContent data={data}>
            <p>Dataset info view test</p>
          </DataSetInfoContent>
        </MemoryRouter>,
      )
      .toJSON();
    expect(datasetInfo).toBeDefined();
  });
});
