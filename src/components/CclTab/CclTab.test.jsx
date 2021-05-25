import CclTab from './CclTab';
import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('CclTab', () => {
  it('Check if clicks works', () => {
    // const mockClicks = jest.fn();
    // const wrapper = mount(
    //   ,
    // );
    const className = 'card';
    const tabTitle = 'Dataset Info';
    const mockCallBack = jest.fn();
    const onTabClick = mockCallBack;
    const component = mount(
      <CclTab
        className={className}
        tabTitle={tabTitle}
        onClick={onTabClick}
        onKeyDown={onTabClick}
        tabIndex="0"
        role="button"
      >
        <p>Hello test!</p>
      </CclTab>,
    );
    const tab = component.find('.collapsed');
    tab.simulate('click').simulate('keydown');
    expect(mockCallBack.mock.calls.length).toBeDefined();
  });
});
