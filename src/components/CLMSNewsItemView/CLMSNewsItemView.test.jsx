import React from 'react';
import renderer from 'react-test-renderer';
import CLMSNewsItemView from './CLMSNewsItemView';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore({
  users: {
    user: 'admin',
  },
  userSession: {
    token: null,
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('CLMSNewsItemView', () => {
  it('Check CLMSNewsItemView default values', () => {
    const content = {
      title: 'example title',
      /*image: {
        image:"https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
      }*/
    };
    const newsView = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CLMSNewsItemView content={content}>
              <p>Event view test</p>
            </CLMSNewsItemView>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(newsView).toBeDefined();
  });
  it('Check CLMSNewsItemView custom values', () => {
    const content = {
      title: 'example title',
      image: {
        image:
          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      },
    };
    const newsView = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CLMSNewsItemView content={content}>
              <p>Event view test</p>
            </CLMSNewsItemView>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(newsView).toBeDefined();
  });
});
