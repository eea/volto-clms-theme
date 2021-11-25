import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistry } from '@eeacms/volto-clms-theme/actions';
import { FormattedMessage } from 'react-intl';
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
  const registry_key = 'clms.addon.login_url_controlpanel.login_url';
  useEffect(() => {
    dispatch(getRegistry(registry_key));
  }, [dispatch]);

  useEffect(() => {
    if (registryRecords && registry_key in registryRecords) {
      setLoginUrl(registryRecords[registry_key]);
    }
  }, [registryRecords]);
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
    >
      <div class="modal-login-title">Login</div>
      <div class="modal-login-text">
        Registration is free. Personal data will only be used internally. more
        details, see the{' '}
        <a href="./personal-data-protection.html" target="_blank">
          Personal data protection
        </a>
        .
      </div>
      <CclButton url={loginUrl || ''} mode="filled">
        Login
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
