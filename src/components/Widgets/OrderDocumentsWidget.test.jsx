import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import OrderDocumentsWidget from './OrderDocumentsWidget';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

jest.mock('@plone/volto/actions', () => ({
  searchContent: jest.fn(() => ({
    type: 'SEARCH_CONTENT',
    path: 'en/technical-library',
    subrequest: 'test-widget',
  })),
}));

describe('OrderDocumentsWidget', () => {
  const SPACE = { keyCode: 32 };
  const ARROW_UP = { keyCode: 38 };
  const ARROW_DOWN = { keyCode: 40 };

  let store;
  let mockOnChange;
  let initialState;

  beforeEach(() => {
    initialState = {
      intl: {
        locale: 'en',
        messages: {},
      },
      search: {
        subrequests: {
          testId: {
            items: [
              { '@id': 'doc1', title: 'Document 1' },
              { '@id': 'doc2', title: 'Document 2' },
              { '@id': 'doc3', title: 'Document 3' },
            ],
          },
        },
      },
    };
    store = mockStore(initialState);
    mockOnChange = jest.fn();
    store.dispatch = jest.fn(() => Promise.resolve());
  });

  it('renders the widget with documents', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <OrderDocumentsWidget
              id="testId"
              formData={{ UID: 'someUID' }}
              onChange={mockOnChange}
              value={{ items: [] }}
            />
          </MemoryRouter>
        </Provider>,
      );
    });
    await Promise.resolve();

    expect(screen.getByText('Technical Document Title')).toBeInTheDocument();
    expect(screen.getByText('Document 1')).toBeInTheDocument();
    expect(screen.getByText('Document 2')).toBeInTheDocument();
    expect(screen.getByText('Document 3')).toBeInTheDocument();
  });

  it('shows loading state when fetching documents', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <OrderDocumentsWidget
              id="testId"
              formData={{ UID: 'someUID' }}
              onChange={mockOnChange}
              value={{ items: [] }}
            />
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(screen.getByText('Loading documents...')).toBeInTheDocument();
  });

  it('calls onChange with reordered documents after drag-and-drop', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderDocumentsWidget
            id="testId"
            formData={{ UID: 'someUID' }}
            onChange={mockOnChange}
            value={{
              items: [
                { id: 'doc1', title: 'Document 1' },
                { id: 'doc2', title: 'Document 2' },
                { id: 'doc3', title: 'Document 3' },
              ],
            }}
          />
        </MemoryRouter>
      </Provider>,
    );

    await Promise.resolve();

    const dragItem = container.querySelector(
      'div[aria-label="Draggable item: Document 1"]',
    );

    fireEvent.keyDown(dragItem, SPACE);
    fireEvent.keyDown(dragItem, ARROW_DOWN);
    fireEvent.keyDown(dragItem, SPACE);

    expect(mockOnChange).toHaveBeenCalledWith('testId', {
      items: [
        { id: 'doc2', title: 'Document 2' },
        { id: 'doc1', title: 'Document 1' },
        { id: 'doc3', title: 'Document 3' },
      ],
    });

    const dragItem2 = container.querySelector(
      'div[aria-label="Draggable item: Document 3"]',
    );

    fireEvent.keyDown(dragItem2, SPACE);
    fireEvent.keyDown(dragItem2, ARROW_UP);
    fireEvent.keyDown(dragItem2, SPACE);

    expect(mockOnChange).toHaveBeenCalledWith('testId', {
      items: [
        { id: 'doc2', title: 'Document 2' },
        { id: 'doc3', title: 'Document 3' },
        { id: 'doc1', title: 'Document 1' },
      ],
    });
  });

  it('updates state when new documents are fetched from Redux', async () => {
    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderDocumentsWidget
            id="testId"
            formData={{ UID: 'someUID' }}
            onChange={mockOnChange}
            value={{ items: [] }}
          />
        </MemoryRouter>
      </Provider>,
    );

    await Promise.resolve();

    const updatedState = {
      intl: {
        locale: 'en',
        messages: {},
      },
      search: {
        subrequests: {
          testId: {
            items: [
              { '@id': 'doc1', title: 'Document 1' },
              { '@id': 'doc2', title: 'Document 2' },
              { '@id': 'doc3', title: 'Document 3' },
              { '@id': 'doc4', title: 'Document 4' },
            ],
          },
        },
      },
    };

    const updatedStore = mockStore(updatedState);
    mockOnChange = jest.fn();
    updatedStore.dispatch = jest.fn(() => Promise.resolve());

    act(() => {
      rerender(
        <Provider store={updatedStore}>
          <MemoryRouter>
            <OrderDocumentsWidget
              id="testId"
              formData={{ UID: 'someUID' }}
              onChange={mockOnChange}
              value={{ items: [] }}
            />
          </MemoryRouter>
        </Provider>,
      );
    });

    await Promise.resolve();

    expect(screen.getByText('Document 1')).toBeInTheDocument();
    expect(screen.getByText('Document 2')).toBeInTheDocument();
    expect(screen.getByText('Document 3')).toBeInTheDocument();
    expect(screen.getByText('Document 4')).toBeInTheDocument();
  });
});
