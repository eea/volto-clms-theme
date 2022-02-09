import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import CclContextNavigationBlockEdit from './CclContextNavigationBlockEdit';
import { MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();

describe('CclSearchBlock', () => {
  it('Check context navigation edit', () => {
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
    const ContextNavigationBlockEdit = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CclContextNavigationBlockEdit pathname={pathname}>
              <p>Search block view test</p>
            </CclContextNavigationBlockEdit>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(ContextNavigationBlockEdit).toMatchSnapshot();
  });
});
