import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import loadable from '@loadable/component';
import config from '@plone/volto/registry';

import Unauthorized from './Unauthorized';

const mockStore = configureStore();

// this doesnt work => loadables does not contain fontAwesome, fontAwesomeLibrary, fontAwesomeSolid, fontAwesomeRegular
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables();
});

describe('Unauthorized', () => {
  // for some reason this does not work, it does not set the loadables in the config

  it('renders a not found component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      apierror: {
        message: 'You are not authorized to access this resource',
      },
    });

    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Unauthorized />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
