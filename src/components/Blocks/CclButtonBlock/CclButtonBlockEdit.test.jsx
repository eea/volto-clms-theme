import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import CclButtonBlockEdit from './CclButtonBlockEdit';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();
test('renders an CclButtonBlockEditView hero block component', () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const data = {
    href: 'https://www.google.com',
    disabled: false,
    style: 'default',
    download: false,
  };
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <CclButtonBlockEdit
          data={data}
          selected={false}
          block="1234"
          content={{}}
          request={{
            loading: false,
            loaded: false,
          }}
          pathname="/news"
          onChangeBlock={() => {}}
          onSelectBlock={() => {}}
          onDeleteBlock={() => {}}
          createContent={() => {}}
          onFocusPreviousBlock={() => {}}
          onFocusNextBlock={() => {}}
          handleKeyDown={() => {}}
          index={1}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
