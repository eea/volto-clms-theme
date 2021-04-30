/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import CopernicusImage from '@eeacms/volto-clms-theme/../theme/clms/img/EU-Cop-logo.svg';
import LandImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-land-text.svg';

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
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  const intl = useIntl();

  return (
    <div className="ccl-header-logos-container">
      <div className="ccl-header-logo-container">
        <Link
          to={settings.isMultilingual ? `/${lang}` : '/'}
          title={intl.formatMessage(messages.copernicussite)}
          className="ccl-header-logo ccl-service-button"
        >
          <Image
            src={CopernicusImage}
            alt={intl.formatMessage(messages.copernicuslogo)}
            title={intl.formatMessage(messages.copernicuslogo)}
            height={44}
          />
        </Link>
        <Link
          to={settings.isMultilingual ? `/${lang}` : '/'}
          title={intl.formatMessage(messages.site)}
          className="ccl-header-logo ccl-service-button"
        >
          <Image
            src={LandImage}
            alt={intl.formatMessage(messages.plonesite)}
            title={intl.formatMessage(messages.plonesite)}
            height={44}
          />
        </Link>
      </div>
    </div>
  );
};

export default Logo;
