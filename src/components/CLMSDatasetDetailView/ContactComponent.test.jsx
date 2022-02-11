import ContactComponent from './ContactComponent';
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
//jest test for ContactComponent
describe('ContactComponent', () => {
  //test for ContactComponent rendering
  it('Check if ContactComponent is rendered', () => {
    const contact = {
      organisationName: 'Test',
      deliveryPoint: 'Test',
      city: 'Test',
      administrativeArea: 'Test',
      postalCode: 'Test',
      country: 'Test',
      electronicMailAddress: 'Test',
      url: 'Test',
      urlTitle: 'Test',
      roleCode: 'Test',
    };
    const contactComponent = renderer
      .create(
        <MemoryRouter>
          <ContactComponent contact={contact} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(contactComponent).toBeDefined();
  });
});
