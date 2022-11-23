import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { getRegistry } from '@eeacms/volto-clms-theme/actions';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';

import './ccl-login-modal.css';

/**
 * Login Modal component doc.
 * @function CclLoginModal
 * @example <CclLoginModal />
 *
 */
function CclLoginModal(props) {
  let {
    classname = 'header-login-link',
    triggerComponent = () => (
      <span className={classname}>
        <FormattedMessage id="loginRegister" defaultMessage="Register/Login" />
      </span>
    ),
    otherPath = undefined,
  } = props;
  const dispatch = useDispatch();
  const registryRecords = useSelector((state) => state.registry.records);
  const [loginUrl, setLoginUrl] = React.useState('');
  const registry_key = config.settings?.registry?.login_url || null;

  useEffect(() => {
    if (registryRecords && registry_key in registryRecords) {
      if (otherPath) {
        setLoginUrl(`${registryRecords[registry_key]}?came_from=${otherPath}`);
      } else {
        setLoginUrl(
          `${registryRecords[registry_key]}?came_from=${window.location.href}`,
        );
      }
    }
  }, [otherPath, registryRecords, registry_key]);

  function modalStatus(status) {
    if (status === true) {
      dispatch(getRegistry(registry_key));
    }
  }

  return (
    <CclModal
      trigger={triggerComponent()}
      size="tiny"
      modalStatus={modalStatus}
    >
      <div className="content">
        <div className="modal-login-title">
          This website uses EU Login for user authentication.
        </div>
        <div className="modal-login-text">
          <p>
            {' '}
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
            {' '}
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
            to create it.
          </p>
          <p>
            If you have other questions, please contact our
            <UniversalLink openLinkInNewTab href="/en/service-desk">
              {' '}
              Service desk
            </UniversalLink>
            .
          </p>
        </div>
      </div>
      <div className="actions">
        <div className="modal-buttons">
          <a href={loginUrl || '#'} className="ccl-button ccl-button-green">
            Login using EU Login
          </a>
        </div>
      </div>
    </CclModal>
  );
}

export default CclLoginModal;
