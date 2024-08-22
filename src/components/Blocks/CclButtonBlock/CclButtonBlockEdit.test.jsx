import CclButtonBlockEdit from './CclButtonBlockEdit';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';

const mockStore = configureStore();

describe('CclButtonBlockEdit', () => {
  it('CclButtonBlockEdit block clicks', () => {
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

    const data = {
      href: 'https://www.google.com',
      disabled: false,
      style: 'default',
      download: false,
    };

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CclButtonBlockEdit
            data={data}
            selected={false}
            block="1234"
            onChangeBlock={() => 'test'}
            setSidebarTab={() => 'test'}
          />
        </MemoryRouter>
      </Provider>,
    );

    const legend = container.querySelector('.ccl-block-editor-header legend');
    fireEvent.click(legend);
    expect(legend).toBeDefined();
  });

  it('renders a CclButtonBlockEdit block component', () => {
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

    const data = {
      href: ['https://www.google.com', 'https://www.google.com'],
      disabled: true,
    };

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CclButtonBlockEdit
            data={data}
            selected={false}
            block="1234"
            onChangeBlock={() => 'test'}
            onSelectBlock={() => 'test'}
            onChangeField={() => 'test'}
            setSidebarTab={() => 'test'}
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('CclButtonBlockEdit onChangeBlock', () => {
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

    const data = {
      href: ['https://www.google.com', 'https://www.google.com'],
      disabled: true,
    };

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CclButtonBlockEdit
            data={data}
            selected={false}
            block="1234"
            onChangeBlock={() => 'test'}
            onSelectBlock={() => 'test'}
            onChangeField={() => 'test'}
            setSidebarTab={() => 'test'}
          />
        </MemoryRouter>
      </Provider>,
    );

    const legend = container.querySelector('.ccl-block-editor-header legend');
    fireEvent.click(legend);
  });
});
