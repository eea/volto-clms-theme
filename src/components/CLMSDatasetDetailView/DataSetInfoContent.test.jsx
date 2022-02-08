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
        token: 'cart_session',
      },
      intl: {
        locale: 'en',
        messages: {},
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
    };
    const datasetInfo = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <DataSetInfoContent data={data}>
              <p>Dataset info view test</p>
            </DataSetInfoContent>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(datasetInfo).toBeDefined();
  });
});
