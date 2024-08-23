import { onlyInLeft, CartIconCounter } from './CartIconCounter';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables();
});

describe('onlyInLeft', () => {
  // Returns an array with items that are only in the left array, based on a compare function
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
  // Should return an array with items that are only in the left array, based on a compare function
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
  // should return an empty array if left array is empty
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

  // should return the left array if right array is empty
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
  // should return an array with items that are only in the left array
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
});

const mockStore = configureStore();
describe('CartIconCounter', () => {
  // Cart icon displays number of items in cart
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
    // Render the component
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CartIconCounter />
        </MemoryRouter>
      </Provider>,
    );
    // const component = mount(<CartIconCounter />);

    // Expect the component toBeDefined
    expect(component).toBeDefined();
    expect(component.toJSON().children[1].children[0]).toEqual('3');
  });
});
