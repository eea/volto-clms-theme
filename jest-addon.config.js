module.exports = {
  testMatch: ['**/src/addons/**/?(*.)+(spec|test).[jt]s(x)?'],
  collectCoverageFrom: [
    'src/addons/**/src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@plone/volto/cypress': '<rootDir>/node_modules/@plone/volto/cypress',
    '@plone/volto/babel': '<rootDir>/node_modules/@plone/volto/babel',
    '@plone/volto/(.*)$': '<rootDir>/node_modules/@plone/volto/src/$1',
    '@package/(.*)$': '<rootDir>/src/$1',
    '@plone/volto-quanta/(.*)$': '<rootDir>/src/addons/volto-quanta/src/$1',
    '@eeacms/volto-clms-theme/(.*)$':
      '<rootDir>/src/addons/volto-clms-theme/src/$1',
    '@eeacms/volto-clms-utils/(.*)$':
      '<rootDir>/node_modules/@eeacms/volto-clms-utils/src/$1',
    '@kitconcept/volto-blocks-grid/(.*)$':
      '<rootDir>/node_modules/@kitconcept/volto-blocks-grid/src/$1',
    '@plone/volto-slate':
      '<rootDir>/node_modules/@plone/volto/packages/volto-slate/src',
    '~/(.*)$': '<rootDir>/src/$1',
    '@root/(.*)$': '<rootDir>/node_modules/@plone/volto/src/$1',
    'load-volto-addons':
      '<rootDir>/node_modules/@plone/volto/jest-addons-loader.js',
  },
  transform: {
    '^.+\\.js(x)?$': 'babel-jest',
    '^.+\\.(png)$': 'jest-file',
    '^.+\\.(jpg)$': 'jest-file',
    '^.+\\.(svg)$': './node_modules/@plone/volto/jest-svgsystem-transform.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@eeacms/volto-clms-utils/|@plone/volto/|slick-carousel|react-input-range))',
  ],
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },
};
