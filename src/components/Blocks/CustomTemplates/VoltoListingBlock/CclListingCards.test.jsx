import { render, screen } from '@testing-library/react';
import CclListingCards from './CclListingCards';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import React from 'react';
import configureStore from 'redux-mock-store';

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
  vocabularies: {
    'collective.taxonomy.technical_library_categorization': {
      loaded: false,
      loading: false,
      items: [],
    },
  },
});

const internalLink = [{ '@id': '/news' }];
const externalLink = [{ '@id': 'https://www.google.com' }];

describe('CclListingCards', () => {
  const items = [
    {
      title: 'Card Title',
      description: 'Card description',
      image: {
        download: 'https://localhost:3000/news/new/@@images/image/filename.jpg',
      },
    },
  ];

  it('renders a news listing card with an internal link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            linkHref={internalLink}
            linkTitle="More news"
            isEditMode={true}
            variation="CclCardsnews"
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Card Title')).toBeDefined();
  });

  it('renders a line-color listing card with an external link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            linkHref={externalLink}
            linkTitle="More line-color"
            isEditMode={true}
            variation="CclCardsline-color"
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Card Title')).toBeDefined();
  });

  it('renders a line listing card with an external link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            linkHref={externalLink}
            linkTitle="More line"
            isEditMode={true}
            variation="CclCardsline"
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Card Title')).toBeDefined();
  });

  it('renders a card without a linkHref', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            isEditMode={true}
            variation="CclCardsnews"
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Card Title')).toBeDefined();
  });

  it('renders a card with an internal link but without a linkTitle', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            linkHref={internalLink}
            isEditMode={true}
            variation="CclCardsnews"
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Card Title')).toBeDefined();
  });

  it('renders a card with an external link but without a linkTitle', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CclListingCards
            items={items}
            linkHref={externalLink}
            isEditMode={true}
            variation="CclCardsnews"
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Card Title')).toBeDefined();
  });
});
