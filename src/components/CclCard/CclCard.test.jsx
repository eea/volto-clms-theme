import React from 'react';
import renderer from 'react-test-renderer';
import CclCard from './CclCard';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('CclCard', () => {
  const card = {
    title: 'title example',
    description: 'description example',
    start:
      'Wed May 19 2021 12:49:04 GMT+0200 (hora de verano de Europa central)',
    end: 'Wed May 26 2024 12:49:04 GMT+0200 (hora de verano de Europa central)',
    whole_day: false,
    image: {
      src:
        'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
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
    file: {
      'content-type': 'text/html',
      src:
        'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      download: 'true',
    },
    effective:
      'Wed May 19 2021 12:49:04 GMT+0200 (hora de verano de Europa central)',
  };
  it('Check event card', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const cardtest = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CclCard type="event" card={card}>
              <p>Event card test</p>
            </CclCard>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check doc card', () => {
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard type="doc" card={card}>
            <p>Doc card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check news card', () => {
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard type="news" card={card}>
            <p>News card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check three collumns card', () => {
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard type="threeColumns" card={card}>
            <p>threeColumns card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check block card', () => {
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard type="block" card={card}>
            <p>Block card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check default card', () => {
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard card={card}>
            <p>Line card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check default values', () => {
    const card = renderer
      .create(
        <MemoryRouter>
          <CclCard />
        </MemoryRouter>,
      )
      .toJSON();
    expect(card).toBeDefined();
  });
});
