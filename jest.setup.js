import { jest } from '@jest/globals';
import loadable from '@loadable/component';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { blocksConfig } from '@plone/volto/config/Blocks';
import installSlate from '@plone/volto-slate/index';

var mockSemanticComponents = jest.requireActual('semantic-ui-react');
var mockComponents = jest.requireActual('@plone/volto/components');
var config = jest.requireActual('@plone/volto/registry').default;

config.blocks.blocksConfig = {
  ...blocksConfig,
  ...config.blocks.blocksConfig,
};

config.settings.loadables = {
  fontAwesome: loadable.lib(() => import('@fortawesome/react-fontawesome')),
  fontAwesomeLibrary: loadable.lib(() =>
    import('@fortawesome/fontawesome-svg-core'),
  ),
  fontAwesomeSolid: loadable.lib(() =>
    import('@fortawesome/free-solid-svg-icons'),
  ),
  fontAwesomeRegular: loadable.lib(() =>
    import('@fortawesome/free-regular-svg-icons'),
  ),
  fontAwesomeBrands: loadable.lib(() =>
    import('@fortawesome/free-brands-svg-icons'),
  ),
  ...config.settings.loadables,
};

jest.doMock('semantic-ui-react', () => ({
  __esModule: true,
  ...mockSemanticComponents,
  Popup: ({ content, trigger }) => {
    return (
      <div className="popup">
        <div className="trigger">{trigger}</div>
        <div className="content">{content}</div>
      </div>
    );
  },
}));

jest.doMock('@plone/volto/components', () => {
  return {
    __esModule: true,
    ...mockComponents,
    SidebarPortal: ({ children }) => <div id="sidebar">{children}</div>,
  };
});

jest.doMock('@plone/volto/registry', () =>
  [installSlate].reduce((acc, apply) => apply(acc), config),
);

const mockStore = configureStore([thunk]);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

global.store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
    formatMessage: jest.fn(),
  },
  content: {
    create: {},
    subrequests: [],
  },
  connected_data_parameters: {},
  screen: {
    page: {
      width: 768,
    },
  },
});
