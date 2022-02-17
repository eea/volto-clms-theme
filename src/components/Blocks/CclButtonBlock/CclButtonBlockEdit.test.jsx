import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CclButtonBlockEdit from './CclButtonBlockEdit';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import React from 'react';
import { changeBlock } from '@plone/volto/helpers';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { setSidebarTab } from '@plone/volto/actions';

Enzyme.configure({ adapter: new Adapter() });

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();

const onChangeBlock = (data, id, value) => {
  changeBlock(data, id, value);
};

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
            onChangeBlock={onChangeBlock(data, 'title', 'test')}
            setSidebarTab={setSidebarTab(1)}
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
            onChangeBlock={onChangeBlock(data, 'title', 'test')}
            onSelectBlock={() => {
              return 'test';
            }}
            onChangeField={() => {
              return 'test';
            }}
            setSidebarTab={setSidebarTab(1)}
          />
        </MemoryRouter>
      </Provider>,
    );

    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  //jest test for CclButtonBlockEdit onChangeBlock statement
  it('CclButtonBlockEdit onChangeBlock', () => {
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
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclButtonBlockEdit
            data={data}
            selected={false}
            block="1234"
            onChangeBlock={onChangeBlock(data, 'title', 'test')}
            onSelectBlock={() => {
              return 'test';
            }}
            onChangeField={() => {
              return 'test';
            }}
            setSidebarTab={setSidebarTab(1)}
          />
        </MemoryRouter>
      </Provider>,
    );
    const legend = component.find('.ccl-block-editor-header');
    legend.simulate('click');
  });
});
