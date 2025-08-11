import CclInfoDescription from './CclInfoDescription';
import renderer from 'react-test-renderer';
import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables();
});

jest.mock('@eeacms/volto-clms-utils/helpers', () => ({
  withFontAwesomeLibs: jest.fn((Component) => Component),
}));

const mockStore = configureStore();
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
  content: {
    data: {
      '@components': {
        translations: {
          items: [{ language: 'es', '@id': '/es' }],
        },
      },
    },
  },
});

describe('CclInfoDescription', () => {
  it('Check values', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <CclInfoDescription
            title="Validation status"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
        mauris ante, a iaculis leo placerat quis."
          ></CclInfoDescription>
        </Provider>,
      )
      .toJSON();
    expect(component).toBeDefined();
  });
});
