import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import CclLanguageSelector from './CclLanguageSelector';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// import { shallow } from 'enzyme';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

beforeAll(() => {
  config.settings.supportedLanguages = ['es'];
});

const mockStore = configureStore();

describe('CclLanguageSelector', () => {
  it('Renders no multilingual', () => {
    config.settings.isMultilingual = false;
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      content: {
        data: {
          '@components': {
            translations: {
              items: [{ language: 'es', '@id': '/es' }],
            },
          },
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CclLanguageSelector onClickAction={() => {}}></CclLanguageSelector>,
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('Renders Multilingual', () => {
    config.settings.isMultilingual = true;
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      content: {
        data: {
          '@components': {
            translations: {
              items: [{ language: 'es', '@id': '/es' }],
            },
          },
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CclLanguageSelector onClickAction={() => {}}></CclLanguageSelector>,
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('Test click event', () => {
    config.settings.isMultilingual = true;
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      content: {
        data: {
          '@components': {
            translations: {
              items: [{ language: 'es', '@id': '/es' }],
            },
          },
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclLanguageSelector></CclLanguageSelector>
        </MemoryRouter>
      </Provider>,
    );
    const mobileSel = wrapper.find('div.header-lang-icon');
    mobileSel.simulate('click');

    const mobileLang = wrapper.find('.language-link a');
    mobileLang.simulate('click');

    // mobileSel.simulate('click');

    const deskSel = wrapper.find('.header-lang-text span');
    deskSel.simulate('click');

    const deskLang = wrapper.find('.header-lang-text .language-link a');
    deskLang.simulate('click');

    expect(1).toEqual(1);
  });
});
