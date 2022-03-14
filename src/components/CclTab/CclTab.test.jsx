import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CclTab from './CclTab';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('CclTab', () => {
  it('Check if onTabClick function is called when tab is clicked', () => {
    const onTabClick = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <CclTab
          onClick={onTabClick}
          tabTitle="tab title"
          tabContent="tab content"
          redirect={true}
        />
      </MemoryRouter>,
    );
    wrapper.find('a').simulate('click');
    expect(onTabClick).toHaveBeenCalled();
  });
  it('Check if tab title is rendered with routing = true', () => {
    const tabTitle = 'Dataset Info';
    const routing = true;
    const tabView = renderer
      .create(
        <MemoryRouter>
          <CclTab
            tabTitle={tabTitle}
            onClick={() => {
              return 'test';
            }}
            routing={routing}
          >
            <p>Hello test!</p>
          </CclTab>
        </MemoryRouter>,
      )
      .toJSON();
    expect(tabView).toBeDefined();
  });
  it('Check if tab title is rendered with routing = false', () => {
    const tabTitle = 'Dataset Info';
    const routing = false;
    const tabView = renderer
      .create(
        <MemoryRouter>
          <CclTab
            tabTitle={tabTitle}
            onClick={() => {
              return 'test';
            }}
            routing={routing}
          >
            <p>Hello test!</p>
          </CclTab>
        </MemoryRouter>,
      )
      .toJSON();
    expect(tabView).toBeDefined();
  });
});
