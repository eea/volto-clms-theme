import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CclLanguageSelector from './CclLanguageSelector';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import React from 'react';
import config from '@plone/volto/registry';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

// import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables();
});

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
          <CclLanguageSelector
            onClickAction={() => {
              return 'test';
            }}
          ></CclLanguageSelector>
          ,
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
          <CclLanguageSelector
            onClickAction={() => {
              return 'test';
            }}
          ></CclLanguageSelector>
          ,
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
