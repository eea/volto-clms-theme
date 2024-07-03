import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CclModal from './CclModal';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore();

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables();
});

describe('CclModal', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    apierror: {
      message: 'You are not authorized to access this resource',
    },
  });
  it('Check external link', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <CclModal
            trigger={
              <div className="header-lang-icon">
                <i className="ccl-icon-language"></i>
                <span className="header-lang-code">EN</span>
              </div>
            }
          >
            <p>Hello test!</p>
          </CclModal>
        </Provider>,
      )
      .toJSON();
    expect(component).toBeDefined();
  });

  it('Check if clicks works', () => {
    // const mockClicks = jest.fn();
    // const wrapper = mount(
    //   ,
    // );

    const mockCallBack = jest.fn();
    const component = mount(
      <CclModal
        trigger={
          <a href="/login" className="header-login-link" onClick={mockCallBack}>
            Login/Register
          </a>
        }
        size="tiny"
      >
        <p>Hello test!</p>
      </CclModal>,
    );
    // const spy = jest.spyOn(component.instance(), 'toggleSort');
    const mobileLang = component.find('.header-login-link');
    mobileLang.simulate('click');

    const closeModal = component.find('.ccl-icon-close');
    closeModal.simulate('click').simulate('keydown');
    // component.find('.header-login-link').at(0).simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
    // const mobileSel = wrapper.find('div.header-lang-icon');
    // mobileSel.simulate('click');

    // const mobileLang = wrapper.find('.language-link a');
    // mobileLang.simulate('click');

    // // mobileSel.simulate('click');

    // const deskSel = wrapper.find('.header-lang-text span');
    // deskSel.simulate('click');

    // const deskLang = wrapper.find('.header-lang-text .language-link a');
    // deskLang.simulate('click');
    // expect(component).toBeDefined();
  });
});
