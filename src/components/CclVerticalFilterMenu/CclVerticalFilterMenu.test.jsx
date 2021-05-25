import React from 'react';
import renderer from 'react-test-renderer';
import CclVerticalFilterMenu from './CclVerticalFilterMenu';
import { MemoryRouter } from 'react-router-dom';

describe('CclVerticalFilterMenu', () => {
  it('Check vertical filter menu', () => {
    const filters = [
      {
        filter: 'First filter example',
      },
      {
        filter: 'Second filter example',
      },
      {
        filter: 'Third filter example',
      },
    ];
    const verticalFilterMenu = renderer
      .create(
        <MemoryRouter>
          <CclVerticalFilterMenu filters={filters}>
            <p>Vertical filter menu test</p>
          </CclVerticalFilterMenu>
        </MemoryRouter>,
      )
      .toJSON();
    expect(verticalFilterMenu).toBeDefined();
  });
});
