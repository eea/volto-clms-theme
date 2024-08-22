import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import CclContextNavigationBlockView from './CclContextNavigationBlockView';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();

describe('CclContextNavigationBlockView', () => {
  it('renders CclContextNavigationBlockView correctly', () => {
    const store = mockStore({
      content: {
        create: {},
        data: {},
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const pathname = '/example';

    const { container, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CclContextNavigationBlockView pathname={pathname}>
            <p>Search block edit test</p>
          </CclContextNavigationBlockView>
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Search block edit test')).not.toBeNull();

    const contextNavigationBlock = container.querySelector(
      '.ccl-context-navigation-block',
    );
    expect(contextNavigationBlock).not.toBeNull();
  });
});
