import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import CclHomeUsersBlockView from './CclHomeUsersBlockView';
import renderer from 'react-test-renderer';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();

test('renders a CclHomeUsersBlockView component', () => {
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
    customCards: {
      blocks_layout: {
        items: ['uid1', 'uid2'],
      },
      blocks: {
        uid1: {
          type: 'card',
          title: 'example title1',
          description: 'Here goes the description text',
          productIcon: 'iconless',
          linkSelector: '/example',
          image: {
            alt: 'example.jpg',
            url: '/example.jpg',
          },
        },
        uid2: {
          type: 'card',
          title: 'example title2',
          description: 'Here goes the description text',
          productIcon: 'iconless',
          linkSelector: '/example',
        },
      },
    },
  };

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <CclHomeUsersBlockView data={data} />
      </MemoryRouter>
    </Provider>,
  );

  expect(component).toBeDefined();
});
