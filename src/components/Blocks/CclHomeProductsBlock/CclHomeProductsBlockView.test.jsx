import React from 'react';
import renderer from 'react-test-renderer';
import CclHomeProductsBlockView from './CclHomeProductsBlockView';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});
describe('renders a CclHomeProductsBlockView component', () => {
  it('iconless style', () => {
    const data = {
      products: {
        blocks_layout: {
          items: ['uid1', 'uid2'],
        },
        blocks: {
          uid1: {
            title: 'example title1',
            productIcon: 'iconless',
            linkSelector: '/example',
          },
          uid2: {
            title: 'example title2',
            productIcon: 'iconless',
            linkSelector: '/example',
          },
        },
      },
    };

    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CclHomeProductsBlockView data={data} />
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });
  it('home-product style', () => {
    const data = {
      products: {
        blocks_layout: {
          items: ['uid1', 'uid2'],
        },
        blocks: {
          uid1: {
            title: 'example title1',
            productIcon: 'home-product',
            linkSelector: '/example',
          },
          uid2: {
            title: 'example title2',
            productIcon: 'home-product',
            linkSelector: '/example',
          },
        },
      },
    };

    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CclHomeProductsBlockView data={data} />
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
