import React from 'react';
import renderer from 'react-test-renderer';
import CclCitation from './CclCitation';

test('Renders', () => {
  const component = renderer.create(
    <CclCitation title="test">children text</CclCitation>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
