import { render } from '@testing-library/react';
import BoundingBoxComponent from './BoundingBoxComponent';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

describe('BoundingBoxComponent', () => {
  it('Check if BoundingBoxComponent is rendered', () => {
    const boundingBox = {
      west: -180,
      east: 180,
      north: 90,
      south: -90,
    };

    const { container } = render(
      <MemoryRouter>
        <BoundingBoxComponent bbox={boundingBox} />
      </MemoryRouter>,
    );

    expect(container).toBeDefined();
  });
});
