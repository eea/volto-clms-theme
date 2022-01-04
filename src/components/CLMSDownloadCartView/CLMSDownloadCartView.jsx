/**
 * CLMSDownloadCartView container.
 * @module components/CLMSDownloadCartView/CLMSDownloadCartView
 */

import { Forbidden, Unauthorized } from '@plone/volto/components';
import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import CLMSCartContent from './CLMSCartContent';
import CLMSTasksInProgress from './CLMSTasksInProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { Helmet } from '@plone/volto/helpers';
import { getExtraBreadcrumbItems } from '../../actions';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';
import { useDispatch } from 'react-redux';

const CLMSDownloadCartView = (props) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useCartState();

  const { formatMessage } = useIntl();
  const messages = defineMessages({
    Cart: {
      id: 'Cart',
      defaultMessage: 'Cart',
    },
  });

  useEffect(() => {
    dispatch(
      getExtraBreadcrumbItems([
        {
          title: formatMessage(messages.Cart),
          pathname: props.location.pathname,
        },
      ]),
    );

    // returned function will be called on component unmount
    return () => {
      dispatch(getExtraBreadcrumbItems([]));
    };
  }, [dispatch, formatMessage, messages.Cart, props.location.pathname]);

  return (
    <>
      <Helmet title={formatMessage(messages.Cart)} />
      <div className="ui container">
        {!isLoggedIn && (
          <>
            {props.token ? (
              <Forbidden
                pathname={props.pathname}
                staticContext={props.staticContext}
              />
            ) : (
              <Unauthorized
                pathname={props.pathname}
                staticContext={props.staticContext}
              />
            )}
          </>
        )}
        {isLoggedIn && (
          <>
            <h1 className="page-title">
              <FormattedMessage id="Cart" defaultMessage="Cart" />
            </h1>
            <div className="page-description">
              <FormattedMessage
                id="Lorem"
                defaultMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
        mauris ante, a iaculis leo placerat quis."
              />
            </div>
            <hr />
            <div className="ccl-container">
              <div className="message-block">
                <div className="message-icon">
                  <FontAwesomeIcon icon={['far', 'comment-alt']} />
                  <i className="far fa-comment-alt"></i>
                </div>
                <div className="message-text">
                  <p>
                    This is a warning related to the funcionality of start
                    downloading the datasets
                  </p>
                  <ul>
                    <li>May be can include a link to somewhere</li>
                    <li>Or an informative text</li>
                  </ul>
                </div>
              </div>
              <CLMSTasksInProgress />
              <CLMSCartContent />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CLMSDownloadCartView;
