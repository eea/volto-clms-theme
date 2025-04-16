/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

// import LandImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-land-text-2.svg';
import CopernicusImage from '@eeacms/volto-clms-theme/../theme/clms/img/EU-Cop-logo.svg';
// import config from '@plone/volto/registry';

const messages = defineMessages({
  site: {
    id: 'Land Monitoring Service Site',
    defaultMessage: 'Land Monitoring Service Site',
  },
  plonesite: {
    id: 'Copernicus Land Logo',
    defaultMessage: 'Copernicus Land Logo',
  },
  copernicuslogo: {
    id: 'Copernicus Logo',
    defaultMessage: 'Copernicus Logo',
  },
  copernicussite: {
    id: 'Copernicus Site',
    defaultMessage: 'Copernicus Site',
  },
});

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = () => {
  // const { settings } = config;
  // const lang = useSelector((state) => state.intl.locale);
  const intl = useIntl();

  return (
    <div className="ccl-header-logos-container">
      <div className="ccl-header-logo-container">
        <Image
          src={CopernicusImage}
          alt={intl.formatMessage(messages.copernicuslogo)}
          title={intl.formatMessage(messages.copernicuslogo)}
          height={44}
          width={212}
        />

        <a
          href="https://ask.copernicus.eu/en"
          target="_blank"
          rel="noreferrer"
          className="ccl-header-logo ccl-service-button"
        >
          | <h1>Ask Copernicus - Observia AI</h1>
        </a>
      </div>
    </div>
  );
};

export default Logo;
