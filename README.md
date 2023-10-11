# volto-clms-theme

[![Releases](https://img.shields.io/github/v/release/eea/volto-clms-theme)](https://github.com/eea/volto-clms-theme/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-clms-theme%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-clms-theme/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-clms-theme-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-clms-theme-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-clms-theme-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-clms-theme-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-clms-theme-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-clms-theme-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-clms-theme-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-clms-theme-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-clms-theme%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-clms-theme/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-clms-theme-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-clms-theme-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-clms-theme-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-clms-theme-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-clms-theme-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-clms-theme-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-clms-theme-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-clms-theme-develop)

[Volto](https://github.com/plone/volto) add-on

## Features

- Theme
- Custom components

## Getting started

### Try volto-clms-theme with Docker

      git clone https://github.com/eea/volto-clms-theme.git
      cd volto-clms-theme
      make
      make start

Go to http://localhost:3000

### Add volto-clms-theme to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

- If you already have a volto project, just update `package.json`:

  ```JSON
  "addons": [
      "@eeacms/volto-clms-theme"
  ],

  "dependencies": {
      "@eeacms/volto-clms-theme": "*"
  }
  ```

- If not, create one:

  ```
  npm install -g yo @plone/generator-volto
  yo @plone/volto my-volto-project --canary --addon @eeacms/volto-clms-theme
  cd my-volto-project
  ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-clms-theme/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-clms-theme/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-clms-theme/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
