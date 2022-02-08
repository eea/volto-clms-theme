import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import CclContextNavigationBlockView from './CclContextNavigationBlockView';
import { MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();

describe('CclContextNavigationBlockView', () => {
  it('Check context navigation view', () => {
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
    const pathname = '/example';

    const ContextNavigationBlockView = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CclContextNavigationBlockView pathname={pathname}>
            <p>Search block edit test</p>
          </CclContextNavigationBlockView>
        </MemoryRouter>
      </Provider>,
    );
    const json = ContextNavigationBlockView.toJSON();
    expect(json).toMatchSnapshot();
  });
});
