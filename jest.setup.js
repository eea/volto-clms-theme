import { jest } from '@jest/globals';
import loadable from '@loadable/component';

var config = jest.requireActual('@plone/volto/registry').default;

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

  ...config.settings.loadables,
};
