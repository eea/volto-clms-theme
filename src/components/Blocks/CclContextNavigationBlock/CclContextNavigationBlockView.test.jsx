import React from 'react';
import renderer from 'react-test-renderer';
import CclContextNavigationBlockView from './CclContextNavigationBlockView';
import { MemoryRouter } from 'react-router-dom';

describe('CclContextNavigationBlockView', () => {
  it('Check context navigation block view', () => {
    const props = {
      pathname: './example',
    };
    const ContextNavigationBlockView = renderer.create(
      <MemoryRouter>
        <CclContextNavigationBlockView pathname={props.pathname} />,
      </MemoryRouter>,
    );
    const json = ContextNavigationBlockView.toJSON();
    expect(json).toMatchSnapshot();
  });
});
