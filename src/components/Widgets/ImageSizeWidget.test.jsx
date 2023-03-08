import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import ImageSizeWidget from './ImageSizeWidget';

const mockStore = configureStore();

test('renders an image sizes widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <ImageSizeWidget
          id="image_size"
          title="Image Size"
          fieldSet="default"
          onChange={() => {}}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
