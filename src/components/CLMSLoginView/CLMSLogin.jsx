import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
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
            This site uses EU Login to handle user registration and login. You
            can read more about this service in the{' '}
            <a href="https://ecas.ec.europa.eu/cas/about.html">
              EU Login site help
            </a>
            .
          </p>
          <p>
            {' '}
            When you clik on the following link, you will be sent to EU Login
            and after a successful login there you will be redirected back to
            this site.
          </p>
          <p>
            If you have any issues or questions, please contact us using the
            <a href="/en/contact-service-helpdesk"> helpdesk</a>.
          </p>
        </div>
      </div>
      <div className="login-button">
        <div className="modal-buttons">
          <a
            href={toPublicURL(loginUrl) || '#'}
            className="ccl-button ccl-button-green"
          >
            Login using EU Login
          </a>
        </div>
      </div>
    </>
  );
}
export default CLMSLoginView;
