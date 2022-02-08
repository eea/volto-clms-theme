import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import CclProductLeftMenuView from './CclProductLeftMenuView';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { shallow } from 'enzyme';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();

test('renders a CclProductLeftMenuView component', () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const data = {
    buttons: {
      blocks_layout: {
        items: ['uid1', 'uid2'],
      },
      blocks: {
        uid1: {
          title: 'example title1',
          description: 'Here goes the description text',
          productIcon: 'iconless',
          linkSelector: '/example',
        },
        uid2: {
          type: 'File',
          description: 'Here goes the description text',
          productIcon: 'iconless',
          linkSelector: '/example',
          download: true,
          href: [
            {
              '@type': 'File',
              '@id': 'localhost:3000/products/product/filename.pdf',
            },
          ],
        },
      },
    },
  };

  const metadata = {
    image: {
      encoding: 'base64',
      'content-type': 'image/jpeg',
      filename: 'unai.jpg',
    },
  };

  const component = mount(
    <Provider store={store}>
      <MemoryRouter>
        <CclProductLeftMenuView data={data} metadata={metadata} />
      </MemoryRouter>
    </Provider>,
  );

  expect(component).toBeDefined();
});
