import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import CclProductTabsWithSubtabsView from './CclProductTabsWithSubtabsView';

const mockStore = configureStore([]);

const initialState = {
  intl: {
    locale: 'en',
    messages: {},
  },
};
const store = mockStore(initialState);

describe('CclProductTabsWithSubtabsView', () => {
  const history = createMemoryHistory();
  const defaultProps = {
    tabsList: ['tab1', 'tab2', 'tab3', 'tab4'],
    tabs: {
      tab1: { title: 'First Tab', content: 'Content 1' },
      tab2: { title: 'Second Tab', content: 'Content 2' },
      tab3: { title: 'Third Tab', content: 'Content 3' },
      tab4: {
        title: 'Fourth Tab',
        content: 'Content 4',
        subTab: { subtab: true },
      },
    },
    metadata: {},
  };

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    history.push(route);
    return render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>,
    );
  };

  beforeEach(() => {
    history.push('/');
  });

  it('renders all main tabs', () => {
    renderWithRouter(<CclProductTabsWithSubtabsView {...defaultProps} />);

    expect(screen.getByText('First Tab')).toBeInTheDocument();
    expect(screen.getByText('Second Tab')).toBeInTheDocument();
    expect(screen.getByText('Third Tab')).toBeInTheDocument();
    expect(screen.queryByText('Fourth Tab')).not.toBeInTheDocument(); // Fourth tab is a subtab
  });

  it('selects first tab by default', () => {
    renderWithRouter(<CclProductTabsWithSubtabsView {...defaultProps} />);

    const firstTab = screen.getByText('First Tab').closest('.card');
    expect(firstTab).toHaveClass('active');
  });

  it('changes active tab on click', () => {
    renderWithRouter(<CclProductTabsWithSubtabsView {...defaultProps} />);

    fireEvent.click(screen.getByText('Second Tab'));

    const secondTab = screen.getByText('Second Tab').closest('.card');
    expect(secondTab).toHaveClass('active');
  });

  it('handles subtabs correctly', () => {
    const propsWithSubtabs = {
      ...defaultProps,
      tabsList: ['main1', 'main2', 'sub1', 'sub2'],
      tabs: {
        main1: { title: 'Main Tab' },
        main2: { title: 'Main Tab 2' },
        sub1: { title: 'Subtab 1', subTab: { subtab: true } },
        sub2: { title: 'Subtab 2', subTab: { subtab: true } },
      },
    };

    renderWithRouter(<CclProductTabsWithSubtabsView {...propsWithSubtabs} />);

    const firstTab = screen.getByText('Main Tab').closest('.card');
    expect(firstTab).toHaveClass('active');
    // Click main tab to expand subtabs
    fireEvent.click(screen.getByText('Main Tab 2'));

    // Check if subtabs are visible
    expect(screen.getByText('Subtab 1')).toBeInTheDocument();
    expect(screen.getByText('Subtab 2')).toBeInTheDocument();
    const firstSubTab = screen.getByText('Subtab 1').closest('.card');
    expect(firstSubTab).toHaveClass('active');
  });

  it('updates URL hash when changing tabs', () => {
    renderWithRouter(<CclProductTabsWithSubtabsView {...defaultProps} />);

    fireEvent.click(screen.getByText('Second Tab'));

    expect(history.location.hash).toBe('#tab=second_tab');
  });

  it('selects correct tab based on URL hash', () => {
    act(() => {
      renderWithRouter(<CclProductTabsWithSubtabsView {...defaultProps} />, {
        route: '/#tab=second_tab',
      });
    });

    const secondTab = screen.getByText('Second Tab').closest('.card');
    expect(secondTab).toHaveClass('active');
  });

  it('collapses expanded subtabs when clicking different main tab', () => {
    const propsWithSubtabs = {
      ...defaultProps,
      tabsList: ['main1', 'main2', 'sub1', 'sub2'],
      tabs: {
        main1: { title: 'Main Tab 1' },
        main2: { title: 'Main Tab 2' },
        sub1: { title: 'Subtab 1', subTab: { subtab: true } },
        sub2: { title: 'Subtab 2', subTab: { subtab: true } },
      },
    };

    renderWithRouter(<CclProductTabsWithSubtabsView {...propsWithSubtabs} />);

    const firstTab = screen.getByText('Main Tab 1').closest('.card');
    expect(firstTab).toHaveClass('active');

    // Expand second main tab's subtabs
    fireEvent.click(screen.getByText('Main Tab 2'));

    // Click second main tab
    fireEvent.click(screen.getByText('Main Tab 2'));

    // Verify subtabs are no longer visible
    expect(screen.queryByText('Subtab 1')).not.toBeInTheDocument();
  });

  it('renders ExtraComponent when provided', () => {
    const ExtraComponent = () => (
      <div data-testid="extra-component">Extra Content</div>
    );

    renderWithRouter(
      <CclProductTabsWithSubtabsView
        {...defaultProps}
        ExtraComponent={ExtraComponent}
      />,
    );

    expect(screen.getByTestId('extra-component')).toBeInTheDocument();
  });

  it('handles empty tabsList', () => {
    renderWithRouter(
      <CclProductTabsWithSubtabsView {...defaultProps} tabsList={[]} />,
    );

    expect(screen.getByText('No content available.')).toBeInTheDocument();
  });
});
