import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistry } from '@eeacms/volto-clms-theme/actions';
import { FormattedMessage } from 'react-intl';
import config from '@plone/volto/registry';
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
      setLoginUrl(registryRecords[registry_key]);
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
      size="fullscreen"
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
      <CclButton url={loginUrl || ''} mode="filled">
        Login using EU Login
      </CclButton>
    </CclModal>
  );
}

CclLoginModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  marginBottom: PropTypes.bool,
};
export default CclLoginModal;
