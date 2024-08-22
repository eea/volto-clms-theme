import { render } from '@testing-library/react';
import CclListingCards from './CclListingCards';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import React from 'react';
import configureStore from 'redux-mock-store';

// Setup mock Redux store
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
        download:
          'https://localhost:3000/news/new/@@images/image/filename.jpg',
      },
    },
  ];

  it('renders News listing card with internal link', () => {
    const { container } = render(
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
    expect(container).toBeInTheDocument();
  });

  it('renders Line-color listing card with external link', () => {
    const { container } = render(
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
    expect(container).toBeInTheDocument();
  });

  it('renders Line listing card with external link', () => {
    const { container } = render(
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
    expect(container).toBeInTheDocument();
  });

  it('renders card without linkHref', () => {
    const { container } = render(
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
    expect(container).toBeInTheDocument();
  });

  it('renders internal link card without linkTitle', () => {
    const { container } = render(
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
    expect(container).toBeInTheDocument();
  });

  it('renders external link card without linkTitle', () => {
    const { container } = render(
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
    expect(container).toBeInTheDocument();
  });
});
