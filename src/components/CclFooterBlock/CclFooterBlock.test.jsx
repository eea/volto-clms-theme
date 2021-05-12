import React from 'react';
import renderer from 'react-test-renderer';
import CclFooterBlock from './CclFooterBlock';

test('Renders', () => {
  const component = renderer.create(
    <CclFooterBlock title="Footer block title">
      <p>children component</p>
    </CclFooterBlock>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
