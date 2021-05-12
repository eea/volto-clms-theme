import React from 'react';
import renderer from 'react-test-renderer';
import CclLanguageSelector from './CclLanguageSelector';

test('Renders', () => {
  const component = renderer.create(
    <CclLanguageSelector title="test">children text</CclLanguageSelector>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
