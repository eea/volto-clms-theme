import React from 'react';
import renderer from 'react-test-renderer';
import CclButtonBlockView from './CclButtonBlockView';

test('renders a CclButtonBlockView component', () => {
  const data = {
    href: [{ '@type': 'File', '@id': 'https://www.google.com' }],
    disabled: true,
    download: true,
  };
  const component = renderer.create(<CclButtonBlockView data={data} />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();

  const data2 = {
    href: [{ '@type': 'News Item', '@id': 'https://www.google.com' }],
    disabled: true,
  };
  const component2 = renderer.create(<CclButtonBlockView data={data2} />);
  const json2 = component2.toJSON();
  expect(json2).toMatchSnapshot();
});
