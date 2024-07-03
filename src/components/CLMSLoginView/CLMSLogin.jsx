import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { UniversalLink } from '@plone/volto/components';
import { toBase64 } from '../CclUtils';
import { getRegistry } from '@eeacms/volto-clms-theme/actions';
import { useDispatch } from 'react-redux';
import { Segment } from 'semantic-ui-react';

/**
 * Login Modal component doc.
 * @function CclLoginModal
 * @example <CclLoginModal />
 *
 */
function CLMSLoginView(props) {
  const dispatch = useDispatch();
  const registryRecords = useSelector((state) => state.registry.records);
  const [loginUrl, setLoginUrl] = React.useState('');
  const registry_key = config.settings?.registry?.login_url || null;

  useEffect(() => {
    dispatch(getRegistry(registry_key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (registryRecords && registry_key in registryRecords) {
      setLoginUrl(
        registryRecords[registry_key] +
          '?came_from=' +
          toBase64(window.location.href),
      );
    }
  }, [registryRecords, registry_key]);

  return (
    <>
      <div className="ccl-container login">
        <h1 className="page-title">Register / Login</h1>
        <div className="login-page-container">
          <Segment padded="very" className="login-page-container-content">
            <div className="content">
              <h2 className="modal-login-title">
                This website uses EU Login for user authentication.
              </h2>
              <div className="modal-login-text">
                <p>
                  EU Login, the European Commission Authentication Service,
                  enables you to access various web applications centrally using
                  the same e-mail and password. You can read more{' '}
                  <UniversalLink
                    openLinkInNewTab
                    href="https://ecas.ec.europa.eu/cas/about.html"
                  >
                    here
                  </UniversalLink>
                  .
                </p>
                <p>
                  If you have EU Login account, please click 'Login using EU
                  Login'.
                </p>
                <p>
                  If you don't have EU Login account, please follow this{' '}
                  <UniversalLink
                    openLinkInNewTab
                    href="https://ecas.ec.europa.eu/cas/eim/external/register.cgi"
                  >
                    link
                  </UniversalLink>{' '}
                  to create it.
                </p>
                <p>
                  If you have othe questions, please contact our{' '}
                  <UniversalLink openLinkInNewTab href="/en/service-desk">
                    Service desk
                  </UniversalLink>
                  .
                </p>
              </div>
            </div>
            <div className="actions">
              <div className="modal-buttons">
                <a
                  href={loginUrl || '#'}
                  className="ccl-button ccl-button-green"
                >
                  Login using EU Login
                </a>
              </div>
            </div>
          </Segment>
        </div>
      </div>
    </>
  );
}
export default CLMSLoginView;
