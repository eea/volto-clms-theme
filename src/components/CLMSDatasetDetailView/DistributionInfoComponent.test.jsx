import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DistributionInfoComponent from './DistributionInfoComponent';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

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
