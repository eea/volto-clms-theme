import BoundingBoxComponent from './BoundingBoxComponent';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

//jest test for BoundingBoxComponent
describe('BoundingBoxComponent', () => {
  //test for BoundingBoxComponent rendering
  it('Check if BoundingBoxComponent is rendered', () => {
    const boundingBox = {
      west: -180,
      east: 180,
      north: 90,
      south: -90,
    };
    const wrapper = mount(
      <MemoryRouter>
        <BoundingBoxComponent bbox={boundingBox} />
      </MemoryRouter>,
    );
    expect(wrapper).toBeDefined();
  });
});
