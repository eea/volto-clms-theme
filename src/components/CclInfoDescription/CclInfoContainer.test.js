import CclInfoContainer from './CclInfoContainer';
import renderer from 'react-test-renderer';
import React from 'react';

describe('CclInfoContainer', () => {
  it('Check values', () => {
    const component = renderer
      .create(
        <CclInfoContainer>
          <p>Hello test!</p>
        </CclInfoContainer>,
      )
      .toJSON();
    expect(component).toBeDefined();
  });
});
