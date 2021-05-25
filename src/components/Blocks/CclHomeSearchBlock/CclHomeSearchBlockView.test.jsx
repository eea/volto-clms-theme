import React from 'react';
import renderer from 'react-test-renderer';
import CclSearchBlockView from './CclHomeSearchBlockView';
import CclSearchBlockEdit from './CclHomeSearchBlockEdit';
import { MemoryRouter } from 'react-router-dom';

describe('CclSearchBlock', () => {
  it('Check search block view', () => {
    const SearchBlockView = renderer
      .create(
        <MemoryRouter>
          <CclSearchBlockView>
            <p>Search block view test</p>
          </CclSearchBlockView>
        </MemoryRouter>,
      )
      .toJSON();
    expect(SearchBlockView).toMatchSnapshot();
  });
  it('Check search block edit', () => {
    const SearchBlockEdit = renderer
      .create(
        <MemoryRouter>
          <CclSearchBlockEdit>
            <p>Search block edit test</p>
          </CclSearchBlockEdit>
        </MemoryRouter>,
      )
      .toJSON();
    expect(SearchBlockEdit).toMatchSnapshot();
  });
});
