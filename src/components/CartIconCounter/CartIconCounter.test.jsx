import { onlyInLeft, CartIconCounter } from './CartIconCounter';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('onlyInLeft', () => {
  it('should return an array with items that are only in the left array', () => {
    const left = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];
    const right = [
      { id: 2, name: 'Item 2' },
      { id: 4, name: 'Item 4' },
    ];
    const compareFunction = (leftValue, rightValue) =>
      leftValue.id === rightValue.id;

    const result = onlyInLeft(left, right, compareFunction);

    expect(result).toEqual([
      { id: 1, name: 'Item 1' },
      { id: 3, name: 'Item 3' },
    ]);
  });

  it('should return an empty array when left array is empty', () => {
    const left = [];
    const right = [
      { id: 2, name: 'Item 2' },
      { id: 4, name: 'Item 4' },
    ];
    const compareFunction = (leftValue, rightValue) =>
      leftValue.id === rightValue.id;

    const result = onlyInLeft(left, right, compareFunction);

    expect(result).toEqual([]);
  });

  it('should return the left array when the right array is empty', () => {
    const left = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];
    const right = [];
    const compareFunction = (leftValue, rightValue) =>
      leftValue.id === rightValue.id;

    const result = onlyInLeft(left, right, compareFunction);

    expect(result).toEqual(left);
  });
});

describe('CartIconCounter', () => {
  it('should display the correct number of items in the cart', () => {
    const store = mockStore({
      cart_items: {
        items: ['one', 'two', 'three'],
      },
      users: {
        user: {
          id: 'g678gfd678',
        },
      },
      datasetTimeseries: {
        datasets: [],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CartIconCounter />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('3')).toBeInTheDocument();
  });
});
