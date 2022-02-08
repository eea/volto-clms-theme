import CclModal from './CclModal';
import renderer from 'react-test-renderer';
import React from 'react';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('CclModal', () => {
  it('Check external link', () => {
    const component = renderer
      .create(
        <CclModal
          trigger={
            <div className="header-lang-icon">
              <i className="ccl-icon-language"></i>
              <span className="header-lang-code">EN</span>
            </div>
          }
        >
          <p>Hello test!</p>
        </CclModal>,
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
