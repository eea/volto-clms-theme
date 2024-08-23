import { render } from '@testing-library/react';
import DistributionInfoComponent from './DistributionInfoComponent';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

describe('DistributionInfoComponent', () => {
  it('Check if DistributionInfoComponent is rendered', () => {
    const resource = {
      resourceLocator: 'http://example.com/resource',
      services: 'http://example.com/services',
    };

    const { container } = render(
      <MemoryRouter>
        <DistributionInfoComponent resource={resource} />
      </MemoryRouter>,
    );

    expect(container).toBeDefined();
  });
});
