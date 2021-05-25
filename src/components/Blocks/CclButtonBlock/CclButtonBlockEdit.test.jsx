import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import CclButtonBlockEdit from './CclButtonBlockEdit';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { shallow } from 'enzyme';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();

describe('CclButtonBlockEdit', () => {
  it('CclButtonBlockEdit block clicks', () => {
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
    // const component = shallow(
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclButtonBlockEdit
            data={data}
            selected={false}
            block="1234"
            onChangeBlock={() => {}}
            setSidebarTab={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );
    const legend = component.find('.ccl-block-editor-header legend');
    legend.simulate('click');
    expect(legend).toBeDefined();
  });
  it('renders an CclButtonBlockEdit block component', () => {
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
      href: ['https://www.google.com', 'https://www.google.com'],
      disabled: true,
    };
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CclButtonBlockEdit
            data={data}
            selected={false}
            block="1234"
            onChangeBlock={() => {}}
            onSelectBlock={() => {}}
            onChangeField={() => {}}
            setSidebarTab={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );

    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
