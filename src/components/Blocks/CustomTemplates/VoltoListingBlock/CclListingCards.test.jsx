import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CclListingCards from './CclListingCards';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import React from 'react';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({
  content: {
    create: {},
    data: {},
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
});
const internalLink = [{ '@id': '/news' }];
const externalLink = [{ '@id': 'https://wwww.google.com' }];

describe('CclListingCards', () => {
  it('News listing card internal link', () => {
    const items = [
      {
        title: 'Card Title',
        description: 'Card description',
        image: {
          download:
            'https://localhost:3000/news/new/@@images/image/filename.jpg',
        },
      },
    ];
    const linkTitle = 'More news';
    const isEditMode = true;
    const variation = 'CclCardsnews';
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            linkHref={internalLink}
            linkTitle={linkTitle}
            isEditMode={isEditMode}
            variation={variation}
          ></CclListingCards>
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toBeDefined();
  });
  it('Line-color listing card external link', () => {
    const items = [
      {
        title: 'Card Title',
        description: 'Card description',
        image: {
          download:
            'https://localhost:3000/news/new/@@images/image/filename.jpg',
        },
      },
    ];
    const linkTitle = 'More line-color';
    const isEditMode = true;
    const variation = 'CclCardsline-color';
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            linkHref={externalLink}
            linkTitle={linkTitle}
            isEditMode={isEditMode}
            variation={variation}
          ></CclListingCards>
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toBeDefined();
  });
  it('line listing card external link', () => {
    const items = [
      {
        title: 'Card Title',
        description: 'Card description',
        image: {
          download:
            'https://localhost:3000/news/new/@@images/image/filename.jpg',
        },
      },
    ];
    const linkTitle = 'More line';
    const isEditMode = true;
    const variation = 'CclCardsline';
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            linkHref={externalLink}
            linkTitle={linkTitle}
            isEditMode={isEditMode}
            variation={variation}
          ></CclListingCards>
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toBeDefined();
  });
  it('without linkHref', () => {
    const items = [
      {
        title: 'Card Title',
        description: 'Card description',
        image: {
          download:
            'https://localhost:3000/news/new/@@images/image/filename.jpg',
        },
      },
    ];
    const isEditMode = true;
    const variation = 'CclCardsnews';
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            isEditMode={isEditMode}
            variation={variation}
          ></CclListingCards>
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toBeDefined();
  });
  it('internal link without linkTitle', () => {
    const items = [
      {
        title: 'Card Title',
        description: 'Card description',
        image: {
          download:
            'https://localhost:3000/news/new/@@images/image/filename.jpg',
        },
      },
    ];
    const isEditMode = true;
    const variation = 'CclCardsnews';
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            linkHref={internalLink}
            isEditMode={isEditMode}
            variation={variation}
          ></CclListingCards>
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toBeDefined();
  });
  it('External link without linkTitle', () => {
    const items = [
      {
        title: 'Card Title',
        description: 'Card description',
        image: {
          download:
            'https://localhost:3000/news/new/@@images/image/filename.jpg',
        },
      },
    ];
    const isEditMode = true;
    const variation = 'CclCardsnews';
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            linkHref={externalLink}
            isEditMode={isEditMode}
            variation={variation}
          ></CclListingCards>
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toBeDefined();
  });
});
