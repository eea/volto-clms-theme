import React from 'react';
import renderer from 'react-test-renderer';
import CclCard from './CclCard';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

const mockStore = configureStore();
export const card = {
  title: 'title example',
  description: 'description example',
  '@type': 'News Item',
  start: 'Wed May 19 2021 12:49:04 GMT+0200 (hora de verano de Europa central)',
  end: 'Wed May 26 2024 12:49:04 GMT+0200 (hora de verano de Europa central)',
  whole_day: false,
  image: {
    src: 'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
    scales: {
      mini: {
        download:
          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      },
      preview: {
        download:
          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      },
    },
    download: 'false',
    alt: 'Placeholder',
  },
  taxonomy_technical_library_categorization: ['1', '2', '3'],
  file: {
    'content-type': 'text/html',
    src: 'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
    download: 'true',
  },
  effective:
    'Wed May 19 2021 12:49:04 GMT+0200 (hora de verano de Europa central)',
};

describe('CclCard', () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
    },
    userSession: {
      token: 'xxxxx',
    },
    intl: {
      locale: 'en',
      messages: {},
    },
    users: {
      user: {
        roles: ['Manager'],
      },
    },
    vocabularies: {
      'Product manuals': ['Technical guidelines', 'User manuals'],
      'Product methodological': ['Metodology', 'Description'],
    },
    taxonomy_technical_library_categorization: ['1', '2', '3'],
  });

  it('Check doc card', () => {
    const cardtest = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CclCard type="doc" card={card}>
              <p>Doc card test</p>
            </CclCard>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });

  it('Check news card', () => {
    const cardtest = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CclCard type="news" card={card}>
              <p>News card test</p>
            </CclCard>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });

  it('Check three columns card', () => {
    const cardtest = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CclCard type="threeColumns" card={card}>
              <p>Three columns card test</p>
            </CclCard>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });

  it('Check block card', () => {
    const cardtest = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CclCard type="block" card={card}>
              <p>Block card test</p>
            </CclCard>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });

  it('Check default card', () => {
    const cardtest = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CclCard card={card}>
              <p>Default card test</p>
            </CclCard>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });

  it('Check default values', () => {
    const cardtest = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CclCard />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
});
