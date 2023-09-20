import React from 'react';
import renderer from 'react-test-renderer';
import RelatedNews from './RelatedNews';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { card } from '../CclCard/CclCard.test';
describe('RelatedNews', () => {
  it('Check RelatedNews view', () => {
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
        subrequests: {
          'related-news': { items: [card] },
        },
      },
    });

    const props = {
      id: 'related-news',
      UID: 'uid3894032nhhlgtrjekl',
    };

    const datasetInfo = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <RelatedNews {...props} />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(datasetInfo).toBeDefined();
  });
});
