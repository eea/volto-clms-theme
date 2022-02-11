import DistributionInfoComponent from './DistributionInfoComponent';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
//jest test for   DistributionInfoComponent
describe('DistributionInfoComponent', () => {
  //test for DistributionInfoComponent rendering
  it('Check if DistributionInfoComponent is rendered', () => {
    const resource = {
      resourceLocator: 'http://example.com/resource',
      services: 'http://example.com/services',
    };
    const wrapper = mount(
      <MemoryRouter>
        <DistributionInfoComponent resource={resource} />
      </MemoryRouter>,
    );
    expect(wrapper).toBeDefined();
  });
});
