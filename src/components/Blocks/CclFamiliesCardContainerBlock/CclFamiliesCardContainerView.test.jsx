import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CclFamiliesCardContainerView from './CclFamiliesCardContainerView';
import { getPanels } from '../utils';

jest.mock('../utils', () => ({
  getPanels: jest.fn(),
}));

jest.mock('./FamilyCard', () => {
  return function MockFamilyCard({ card, isCustomCard, isEditMode }) {
    return <div data-testid="family-card">{card.title || 'Family Card'}</div>;
  };
});

describe('CclFamiliesCardContainerView', () => {
  const defaultProps = {
    block: 'block-123',
    data: {},
    onChangeBlock: jest.fn(),
    setSidebarTab: jest.fn(),
    setSelectedCardBlock: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getPanels.mockImplementation((data) => [
      ['card1', { title: 'Card 1' }],
      ['card2', { title: 'Card 2' }],
    ]);
  });

  it('renders without crashing', () => {
    render(<CclFamiliesCardContainerView {...defaultProps} />);
    expect(screen.getAllByTestId('family-card')).toHaveLength(2);
  });

  it('initializes with empty cards when no customCards data exists', () => {
    render(<CclFamiliesCardContainerView {...defaultProps} />);

    expect(defaultProps.onChangeBlock).toHaveBeenCalledWith(
      'block-123',
      expect.objectContaining({
        customCards: expect.any(Object),
      }),
    );
  });

  it('does not call onChangeBlock when customCards exist', () => {
    const propsWithCards = {
      ...defaultProps,
      data: {
        customCards: {
          blocks: {
            card1: { title: 'Card 1' },
            card2: { title: 'Card 2' },
          },
        },
      },
    };

    render(<CclFamiliesCardContainerView {...propsWithCards} />);
    expect(defaultProps.onChangeBlock).not.toHaveBeenCalled();
  });

  it('renders title when provided', () => {
    const propsWithTitle = {
      ...defaultProps,
      data: {
        title: 'Test Title',
        customCards: {},
      },
    };

    render(<CclFamiliesCardContainerView {...propsWithTitle} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders correct number of FamilyCard components', () => {
    const propsWithCards = {
      ...defaultProps,
      data: {
        customCards: {
          blocks: {
            card1: { title: 'Card 1' },
            card2: { title: 'Card 2' },
          },
        },
      },
    };

    render(<CclFamiliesCardContainerView {...propsWithCards} />);
    const cards = screen.getAllByTestId('family-card');
    expect(cards).toHaveLength(2);
  });

  it('passes correct props to FamilyCard components', () => {
    getPanels.mockImplementation((data) => [['card1', { title: 'Test Card' }]]);

    const propsWithCards = {
      ...defaultProps,
      data: {
        customCards: {
          blocks: {
            card1: { title: 'Test Card' },
          },
        },
      },
    };

    render(<CclFamiliesCardContainerView {...propsWithCards} />);

    const card = screen.getByText('Test Card');
    expect(card).toBeInTheDocument();
  });

  it('handles undefined data', () => {
    const propsWithUndefined = {
      ...defaultProps,
      data: undefined,
    };

    expect(() => {
      render(<CclFamiliesCardContainerView {...propsWithUndefined} />);
    }).not.toThrow();
  });
});
