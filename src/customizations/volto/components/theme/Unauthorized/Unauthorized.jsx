/**
 * @module components/theme/Unauthorized/Unauthorized
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';
import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';

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
            login: <CclLoginModal classname={'green-login-link'} />,
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
