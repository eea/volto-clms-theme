import React from 'react';
import renderer from 'react-test-renderer';
import CclHomeProductsBlockView from './CclHomeProductsBlockView';

describe('renders a CclHomeProductsBlockView component', () => {
  it('iconless style', () => {
    const data = {
      products: {
        blocks_layout: {
          items: ['uid1', 'uid2'],
        },
        blocks: {
          uid1: {
            title: 'example title1',
            productIcon: 'iconless',
            linkSelector: '/example',
          },
          uid2: {
            title: 'example title2',
            productIcon: 'iconless',
            linkSelector: '/example',
          },
        },
      },
    };

    const component = renderer.create(<CclHomeProductsBlockView data={data} />);
    expect(component).toMatchSnapshot();
  });
  it('home-product style', () => {
    const data = {
      products: {
        blocks_layout: {
          items: ['uid1', 'uid2'],
        },
        blocks: {
          uid1: {
            title: 'example title1',
            productIcon: 'home-product',
            linkSelector: '/example',
          },
          uid2: {
            title: 'example title2',
            productIcon: 'home-product',
            linkSelector: '/example',
          },
        },
      },
    };

    const component = renderer.create(<CclHomeProductsBlockView data={data} />);
    expect(component).toMatchSnapshot();
  });
});
