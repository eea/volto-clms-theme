import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { UniversalLink } from '@plone/volto/components';
import { toPublicURL } from '@plone/volto/helpers/Url/Url';
import './CLMSLogin.css';

/**
 * Login Modal component doc.
 * @function CclLoginModal
 * @example <CclLoginModal />
 *
 */
function CLMSLoginView(props) {
  const registryRecords = useSelector((state) => state.registry.records);
  const [loginUrl, setLoginUrl] = React.useState('');
  const registry_key = config.settings?.registry?.login_url || null;

  useEffect(() => {
    if (registryRecords && registry_key in registryRecords) {
      setLoginUrl(
        registryRecords[registry_key] + '?came_from=' + window.location.href,
      );
    }
  }, [registryRecords, registry_key]);

  return (
    <>
      <div className="ccl-container login">
        <h1 className="page-title">Registration / Login</h1>
        <div className="modal-login-text">
          <p>
            EU Login, the European Commission Authentication Service, enables
            you to access various web applications centrally using the same
            e-mail and password. You can read more{' '}
            <UniversalLink
              openLinkInNewTab
              href="https://ecas.ec.europa.eu/cas/about.html"
            >
              here
            </UniversalLink>
            .
          </p>
          <p>
            If you have EU Login account, please click 'Login using EU Login'.
          </p>
          <p>
            If you don't have EU Login account, please follow this{' '}
            <UniversalLink
              openLinkInNewTab
              href="https://ecas.ec.europa.eu/cas/eim/external/register.cgi"
            >
              link
            </UniversalLink>{' '}
            to create it
          </p>
          <p>
            If you have othe questions, please contact our
            <UniversalLink openLinkInNewTab href="/en/service-desk">
              {' '}
              Service desk
            </UniversalLink>
            .
          </p>
        </div>
      </div>
      <div className="login-button">
        <div className="modal-buttons">
          <UniversalLink
            href={toPublicURL(loginUrl) || '#'}
            className="ccl-button ccl-button-green"
          >
            Login using EU Login
          </UniversalLink>
        </div>
      </div>
    </>
  );
}
export default CLMSLoginView;
