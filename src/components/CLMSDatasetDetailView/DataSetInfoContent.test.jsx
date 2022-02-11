import React from 'react';
import renderer from 'react-test-renderer';
import DataSetInfoContent from './DataSetInfoContent';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('DataSetInfoContent', () => {
  it('Check dataset info view', () => {
    const mockStore = configureStore();

    const store = mockStore({
      userSession: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0NDM4MzA0NCwiZnVsbG5hbWUiOm51bGx9.cB_q3Q0Jhu8h2m_SDmmknodpDxDLfb4o-qY6Y2plE04',
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
    });

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
      dataResourceTitle: 'example dataResourceTitle',
      validation: {
        title: 'example title',
        description: 'example description',
        tooltip: 'example tooltip',
        data: 'Validation',
      },
    };
    const datasetInfo = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <DataSetInfoContent props={data}>
              <p>Dataset info view test</p>
            </DataSetInfoContent>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(datasetInfo).toBeDefined();
  });
});
