import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import FamilyCard from './FamilyCard';
import { isInternalURL } from '@plone/volto/helpers';

jest.mock('@plone/volto/helpers', () => ({
  isInternalURL: jest.fn(),
  flattenToAppURL: jest.fn((url) => url),
}));

jest.mock('@eeacms/volto-clms-utils/components', () => ({
  FontAwesomeIcon: () => <span data-testid="chevron-icon">Icon</span>,
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('FamilyCard', () => {
  const defaultProps = {
    card: {
      title: 'Test Card',
      description: 'Test Description',
    },
    onClickImage: jest.fn(),
    isEditMode: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    isInternalURL.mockImplementation(() => false);
  });

  it('renders basic card content correctly', () => {
    renderWithRouter(<FamilyCard {...defaultProps} />);

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
  });

  it('handles click events', () => {
    renderWithRouter(<FamilyCard {...defaultProps} />);

    fireEvent.click(screen.getByText('Test Card'));
    expect(defaultProps.onClickImage).toHaveBeenCalled();
  });

  it('handles keyDown events', () => {
    renderWithRouter(<FamilyCard {...defaultProps} />);

    fireEvent.keyDown(screen.getByText('Test Card'));
    expect(defaultProps.onClickImage).toHaveBeenCalled();
  });

  it('renders children when provided', () => {
    renderWithRouter(
      <FamilyCard {...defaultProps}>
        <div data-testid="child-content">Child Content</div>
      </FamilyCard>,
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('does not render link in edit mode', () => {
    const propsWithLink = {
      ...defaultProps,
      isEditMode: true,
      card: {
        ...defaultProps.card,
        href: 'http://example.com',
      },
    };

    renderWithRouter(<FamilyCard {...propsWithLink} />);

    const element = screen.getByText('Test Card').closest('a, Link');
    expect(element).not.toHaveAttribute('href', 'http://example.com');
  });

  it('renders internal link correctly', () => {
    isInternalURL.mockImplementation(() => true);

    const propsWithInternalLink = {
      ...defaultProps,
      card: {
        ...defaultProps.card,
        href: '/internal/page',
      },
    };

    renderWithRouter(<FamilyCard {...propsWithInternalLink} />);

    expect(screen.getByText('Test Card').closest('a')).toHaveAttribute(
      'href',
      '/internal/page',
    );
  });

  it('renders external link correctly', () => {
    const propsWithExternalLink = {
      ...defaultProps,
      card: {
        ...defaultProps.card,
        href: 'https://example.com',
      },
    };

    renderWithRouter(<FamilyCard {...propsWithExternalLink} />);

    expect(screen.getByText('Test Card').closest('a')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('handles empty href array', () => {
    const propsWithEmptyHref = {
      ...defaultProps,
      card: {
        ...defaultProps.card,
        href: '',
      },
    };

    renderWithRouter(<FamilyCard {...propsWithEmptyHref} />);

    const element = screen.getByText('Test Card').closest('a');
    expect(element).not.toHaveAttribute('href');
  });

  it('handles direct href string', () => {
    const propsWithDirectHref = {
      ...defaultProps,
      card: {
        ...defaultProps.card,
        href: 'https://example.com',
      },
    };

    renderWithRouter(<FamilyCard {...propsWithDirectHref} />);

    expect(screen.getByText('Test Card').closest('a')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('updates hasLink state when href changes', async () => {
    const { rerender } = renderWithRouter(<FamilyCard {...defaultProps} />);

    // Initial render without href
    let element = screen.getByText('Test Card').closest('a');
    expect(element).not.toHaveAttribute('href');

    // Update props with href
    const propsWithHref = {
      ...defaultProps,
      card: {
        ...defaultProps.card,
        href: 'https://example.com',
      },
    };

    await act(async () => {
      rerender(<FamilyCard {...propsWithHref} />);
    });

    element = screen.getByText('Test Card').closest('a');
    expect(element).toHaveAttribute('href', 'https://example.com');
  });

  it('handles undefined card properties', () => {
    const propsWithUndefined = {
      ...defaultProps,
      card: {},
    };

    renderWithRouter(<FamilyCard {...propsWithUndefined} />);

    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
  });
});
