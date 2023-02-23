module.exports = {
  testMatch: ['**/src/addons/**/?(*.)+(spec|test).[jt]s(x)?'],
  collectCoverageFrom: [
    'src/addons/**/src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  moduleNameMapper: {
    '@plone/volto/cypress': '<rootDir>/node_modules/@plone/volto/cypress',
    '@plone/volto/babel': '<rootDir>/node_modules/@plone/volto/babel',
    '@plone/volto/(.*)$': '<rootDir>/node_modules/@plone/volto/src/$1',
    '@package/(.*)$': '<rootDir>/src/$1',
    '@plone/volto-quanta/(.*)$': '<rootDir>/src/addons/volto-quanta/src/$1',
    '@eeacms/(.*?)/(.*)$': '<rootDir>/src/addons/$1/src/$2',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '~/(.*)$': '<rootDir>/src/$1',
    'load-volto-addons':
      '<rootDir>/node_modules/@plone/volto/jest-addons-loader.js',
  },
  transform: {
    '^.+\\.js(x)?$': 'babel-jest',
    '^.+\\.less$': 'jest-css-modules',
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
