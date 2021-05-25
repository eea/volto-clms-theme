import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import CclCardBlockEdit from './CclCardBlockEdit';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { shallow } from 'enzyme';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();

describe('CclCardBlockEdit', () => {
  it('CclCardBlockEdit block clicks', () => {
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
      title: 'example title',
      description: 'example description',
      image: [
        {
          scales: [
            {
              icon: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              large: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              listing: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              mini: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              preview: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              thumb: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              tile: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
            },
          ],
        },
      ],
      url: 'https://www.google.com',
    };
    // const component = shallow(
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclCardBlockEdit
            data={data}
            block="1234"
            onChangeBlock={() => {}}
            setSidebarTab={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );
    const legend = component.find('.ccl-block-editor-header legend');
    legend.simulate('click');
    expect(legend).toBeDefined();
  });
  it('renders a CclCardBlockEdit block component', () => {
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
      title: 'example title',
      description: 'example description',
      image: [
        {
          scales: [
            {
              icon: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              large: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              listing: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              mini: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              preview: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              thumb: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              tile: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
            },
          ],
        },
      ],
      url: 'https://www.google.com',
    };
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CclCardBlockEdit
            data={data}
            block="1234"
            onChangeBlock={() => {}}
            onSelectBlock={() => {}}
            onChangeField={() => {}}
            setSidebarTab={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );

    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
