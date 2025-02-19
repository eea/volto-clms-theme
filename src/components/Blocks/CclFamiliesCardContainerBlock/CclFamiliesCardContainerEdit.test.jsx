import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CclFamiliesCardContainerEdit from './CclFamiliesCardContainerEdit';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

const initialState = {
  intl: {
    locale: 'en',
    messages: {},
  },
};
const store = mockStore(initialState);

jest.mock('../utils', () => ({
  emptyCard: jest.fn(() => ({
    blocks: {
      '123': { '@type': 'card', title: 'Card 1' },
      '456': { '@type': 'card', title: 'Card 2' },
    },
  })),
  getPanels: jest.fn((data) => Object.entries(data.blocks || {})),
}));

jest.mock('./FamilyCard', () => {
  return function MockFamilyCard({ onClickImage }) {
    return (
      <div
        data-testid="family-card"
        onClick={onClickImage}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onClickImage(e);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Family Card"
      >
        Family Card
      </div>
    );
  };
});

describe('CclFamiliesCardContainerEdit', () => {
  const defaultProps = {
    block: 'block-123',
    data: {},
    onChangeBlock: jest.fn(),
    selected: true,
    setSidebarTab: jest.fn(),
    intl: { formatMessage: jest.fn() },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with empty cards when no customCards data exists', () => {
    render(
      <Provider store={store}>
        <CclFamiliesCardContainerEdit {...defaultProps} />
      </Provider>,
    );

    expect(defaultProps.onChangeBlock).toHaveBeenCalledWith(
      'block-123',
      expect.objectContaining({
        customCards: expect.any(Object),
      }),
    );
  });

  it('displays the container title', () => {
    const props = {
      ...defaultProps,
      data: { title: 'Test Container' },
    };

    render(
      <Provider store={store}>
        <CclFamiliesCardContainerEdit {...props} />
      </Provider>,
    );
    expect(screen.getByText('Test Container')).toBeInTheDocument();
  });

  it('displays default title when no title is provided', () => {
    render(
      <Provider store={store}>
        <CclFamiliesCardContainerEdit {...defaultProps} />
      </Provider>,
    );
    expect(screen.getByText('Family card container')).toBeInTheDocument();
  });

  it('clicking container header sets sidebar tab and resets selected card', () => {
    act(() => {
      render(
        <Provider store={store}>
          <CclFamiliesCardContainerEdit {...defaultProps} />
        </Provider>,
      );
      fireEvent.click(screen.getByText('Family card container'));
    });

    expect(defaultProps.setSidebarTab).toHaveBeenCalledWith(1);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('renders family cards for each panel', () => {
    const props = {
      ...defaultProps,
      data: {
        customCards: {
          blocks: {
            '123': { title: 'Card 1' },
            '456': { title: 'Card 2' },
          },
        },
      },
    };

    render(
      <Provider store={store}>
        <CclFamiliesCardContainerEdit {...props} />
      </Provider>,
    );
    const cards = screen.getAllByTestId('family-card');
    expect(cards).toHaveLength(2);
  });

  it('shows correct sidebar portal based on card selection', () => {
    const props = {
      ...defaultProps,
      data: {
        customCards: {
          blocks: {
            '123': { title: 'Card 1' },
          },
        },
      },
    };

    render(
      <Provider store={store}>
        <CclFamiliesCardContainerEdit {...props} />
      </Provider>,
    );

    expect(screen.getByText('Card container block')).toBeInTheDocument();

    // Click on a card
    fireEvent.click(screen.getByTestId('family-card'));

    // Should now show card block form
    expect(screen.getByText('Card block')).toBeInTheDocument();
  });

  it('clicking header resets card selection and shows container form', () => {
    const props = {
      ...defaultProps,
      data: {
        customCards: {
          blocks: {
            '123': { title: 'Card 1' },
          },
        },
      },
    };

    render(
      <Provider store={store}>
        <CclFamiliesCardContainerEdit {...props} />
      </Provider>,
    );

    // First click a card to select it
    fireEvent.click(screen.getByTestId('family-card'));
    expect(screen.getByText('Card block')).toBeInTheDocument();

    // Then click the header
    fireEvent.click(screen.getByText('Family card container'));

    // Should show container form again
    expect(screen.getByText('Card container block')).toBeInTheDocument();
    expect(props.setSidebarTab).toHaveBeenCalledWith(1);
  });

  it('initializes with empty cards when no customCards data exists', () => {
    render(
      <Provider store={store}>
        <CclFamiliesCardContainerEdit {...defaultProps} />
      </Provider>,
    );

    expect(defaultProps.onChangeBlock).toHaveBeenCalledWith(
      'block-123',
      expect.objectContaining({
        customCards: expect.any(Object),
      }),
    );
  });
});
