/**
 * @module components/theme/Unauthorized/Unauthorized
 */
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';
// import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';

import { UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { getRegistry } from '@eeacms/volto-clms-theme/actions';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';
import { toBase64 } from '../../../../../components/CclUtils';

const CclLoginModal = (props) => {
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
  const registryRecords = useSelector((state) => state?.registry?.records);
  const [loginUrl, setLoginUrl] = React.useState('');
  const registry_key = config.settings?.registry?.login_url || null;

  useEffect(() => {
    if (registryRecords && registry_key in registryRecords) {
      if (otherPath) {
        setLoginUrl(
          `${registryRecords[registry_key]}?came_from=${toBase64(otherPath)}`,
        );
      } else {
        setLoginUrl(
          `${registryRecords[registry_key]}?came_from=${toBase64(
            window.location.href,
          )}`,
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
            <UniversalLink openLinkInNewTab href="/en/contact-service-helpdesk">
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
};

/**
 * unauthorized function.
 * @function Unauthorized
 * @returns {string} Markup of the unauthorized page.
 */
const Unauthorized = () => {
  const error_message = useSelector((state) => state.apierror.message);

  return (
    <Container className="view-wrapper">
      <h1>
        <FormattedMessage id="Unauthorized" defaultMessage="Unauthorized" />
      </h1>
      <h3>{error_message}</h3>
      <p className="description">
        <FormattedMessage
          id="You are trying to access a protected resource, please {login} first."
          defaultMessage="You are trying to access a protected resource, please {login} first."
          values={{
            login: (
              <CclLoginModal
                triggerComponent={() => (
                  <span className="unauthorized-login-link">
                    <FormattedMessage
                      id="register-login"
                      defaultMessage="Register / Login"
                    />
                  </span>
                )}
              />
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="If you are certain you have the correct web address but are encountering an error, please contact the {site_admin}."
          defaultMessage="If you are certain you have the correct web address but are encountering an error, please contact the {site_admin}."
          values={{
            site_admin: (
              <Link to="/contact-form">
                <FormattedMessage
                  id="Site Administration"
                  defaultMessage="Site Administration"
                />
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage id="Thank you." defaultMessage="Thank you." />
      </p>
    </Container>
  );
};

export default withServerErrorCode(401)(Unauthorized);
