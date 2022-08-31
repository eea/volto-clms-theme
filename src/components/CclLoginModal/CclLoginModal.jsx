import React, { useEffect } from 'react';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistry } from '@eeacms/volto-clms-theme/actions';
import { FormattedMessage } from 'react-intl';
import config from '@plone/volto/registry';
import { toPublicURL } from '@plone/volto/helpers/Url/Url';
import { UniversalLink } from '@plone/volto/components';
import './ccl-login-modal.css';
/**
 * Login Modal component doc.
 * @function CclLoginModal
 * @example <CclLoginModal />
 *
 */
function CclLoginModal(props) {
  let { classname = 'header-login-link' } = props;
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
        <span className={classname}>
          <FormattedMessage
            id="loginRegister"
            defaultMessage="Register/Login"
          />
        </span>
      }
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
      <div className="actions">
        <div className="modal-buttons">
          <UniversalLink
            href={toPublicURL(loginUrl) || '#'}
            openLinkInNewTab
            className="ccl-button ccl-button-green"
          >
            Login using EU Login
          </UniversalLink>
        </div>
      </div>
    </CclModal>
  );
}

export default CclLoginModal;
