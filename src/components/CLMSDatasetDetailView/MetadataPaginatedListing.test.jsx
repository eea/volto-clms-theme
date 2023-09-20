import React from 'react';
import renderer from 'react-test-renderer';
import { MetadataPaginatedListing } from './MetadataPaginatedListing';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('MetadataPaginatedListing', () => {
  it('Check MetadataPaginatedListing view', () => {
    const mockStore = configureStore();

    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      search: {
        subrequests: {
          datasetinfocontentid: { items: [] },
        },
      },
    });

    const props = {
      id: 'metadata-paginated-listing',
      geonetwork_identifiers_items: [
        { id: 'geo-eea-id', title: 'Geo title', type: 'EEA' },
        { id: 'geo-vito-id', title: 'Geo title 2', type: 'VITO' },
      ],
    };
    const datasetInfo = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <MetadataPaginatedListing {...props} />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(datasetInfo).toBeDefined();
  });
});
