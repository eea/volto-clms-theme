import React from 'react';
import renderer from 'react-test-renderer';
import CclExpandableFilter from './CclExpandableFilter';
import { MemoryRouter } from 'react-router-dom';

import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('CclExpandableFilter', () => {
  it('Check CclExpandableFilter', () => {
    const expandableFilter = renderer
      .create(
        <MemoryRouter>
          <CclExpandableFilter
            title="title example"
            children="children example"
          >
            <p>Expandable filter test</p>
          </CclExpandableFilter>
        </MemoryRouter>,
      )
      .toJSON();
    expect(expandableFilter).toBeDefined();
  });
  it('Check if clicks works', () => {
    // const mockClicks = jest.fn();
    // const wrapper = mount(
    //   ,
    // );
    const expanded = false;
    const clicktest = jest.fn();
    const component = mount(
      <CclExpandableFilter
        trigger={
          <div
            className="ccl-dropdown__link  ccl-expandable__button"
            aria-expanded={expanded}
            onClick={clicktest}
            onKeyDown={clicktest}
            tabIndex="0"
            role="button"
          >
            Filter
          </div>
        }
      >
        <p>Hello test!</p>
      </CclExpandableFilter>,
    );

    const keydown = component.find(
      '.ccl-dropdown__link',
      '.ccl-expandable__button',
    );
    keydown.simulate('click').simulate('keydown');
    expect(clicktest.mock.calls.length).toBeDefined();
  });
});
