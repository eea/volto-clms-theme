import config from '@plone/volto/registry';
import React from 'react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';

import CclLanguageSelector from './CclLanguageSelector';

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

  it('Test click event', async () => {
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
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CclLanguageSelector />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const headerDiv = container.querySelector('div.header-lang-icon');
      expect(headerDiv).toBeInTheDocument();
      fireEvent.click(headerDiv);

      const mobileLangLink = screen.getByLabelText('Switch to español');
      expect(mobileLangLink).toBeInTheDocument();

      const deskSel = container.querySelector('.header-lang-text span');
      expect(deskSel).toBeInTheDocument();
      fireEvent.click(deskSel);
    });
  });
});
