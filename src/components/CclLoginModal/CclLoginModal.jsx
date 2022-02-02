import React, { useEffect } from 'react';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistry } from '@eeacms/volto-clms-theme/actions';
import { FormattedMessage } from 'react-intl';
import config from '@plone/volto/registry';
import { toPublicURL } from '@plone/volto/helpers/Url/Url';
import './ccl-login-modal.css';
/**
 * Login Modal component doc.
 * @function CclLoginModal
 * @example <CclLoginModal />
 *
 */
function CclLoginModal() {
  const dispatch = useDispatch();
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

  function modalStatus(status) {
    if (status === true) {
      dispatch(getRegistry(registry_key));
    }
  }

  return (
    <CclModal
      trigger={
        <div className="header-login-link">
          <FormattedMessage
            id="loginRegister"
            defaultMessage="Register/Login"
          />
        </div>
      }
      size="tiny"
      modalStatus={modalStatus}
    >
      <div className="modal-login-title">Registration / Login</div>
      <div className="modal-login-text">
        <p>
          This site uses EU Login to handle user registration and login. You can
          read more about this service in the{' '}
          <a href="https://ecas.ec.europa.eu/cas/about.html">
            EU Login site help
          </a>
          .
        </p>
        <p>
          {' '}
          When you clik on the following link, you will be sent to EU Login and
          after a successful login there you will be redirected back to this
          site.
        </p>
        <p>
          If you have any issues or questions, please contact us using the
          <a href="/en/contact-service-helpdesk"> helpdesk</a>.
        </p>
      </div>
      <a
        href={toPublicURL(loginUrl) || '#'}
        className="ccl-button ccl-button-green"
      >
        Login using EU Login
      </a>
    </CclModal>
  );
}

export default CclLoginModal;
