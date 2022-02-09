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

  const data3 = {
    href: [{ '@type': 'File', '@id': 'https://www.google.com' }],
    disabled: false,
    download: true,
    style: 'left menu',
  };
  const component3 = renderer.create(<CclButtonBlockView data={data3} />);
  const json3 = component3.toJSON();
  expect(json3).toMatchSnapshot();

  const data4 = {
    href: [{ '@type': 'File', '@id': 'https://www.google.com' }],
    disabled: false,
    download: false,
    style: 'left menu',
  };
  const component4 = renderer.create(<CclButtonBlockView data={data4} />);
  const json4 = component4.toJSON();
  expect(json4).toMatchSnapshot();
});
