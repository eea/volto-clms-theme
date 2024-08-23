import { render } from '@testing-library/react';
import ContactComponent from './ContactComponent';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// Jest test for ContactComponent
describe('ContactComponent', () => {
  // Test for ContactComponent rendering
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

    const { container } = render(
      <MemoryRouter>
        <ContactComponent contact={contact} />
      </MemoryRouter>,
    );

    expect(container).toBeDefined();
  });
});
