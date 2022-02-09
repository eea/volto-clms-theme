import CclInfoDescription from './CclInfoDescription';
import renderer from 'react-test-renderer';
import React from 'react';

describe('CclInfoDescription', () => {
  it('Check values', () => {
    const component = renderer
      .create(
        <CclInfoDescription
          title="Validation status"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
        mauris ante, a iaculis leo placerat quis."
        ></CclInfoDescription>,
      )
      .toJSON();
    expect(component).toBeDefined();
  });
});
