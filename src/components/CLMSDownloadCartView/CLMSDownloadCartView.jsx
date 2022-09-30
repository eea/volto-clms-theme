/**
 * CLMSDownloadCartView container.
 * @module components/CLMSDownloadCartView/CLMSDownloadCartView
 */

import { Forbidden, Unauthorized } from '@plone/volto/components';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import React, { useEffect } from 'react';
import {
  getDatasetsByUid,
  getExtraBreadcrumbItems,
  getNutsNames,
} from '../../actions';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';
import { useDispatch, useSelector } from 'react-redux';

import CLMSCartContent from './CLMSCartContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { getFormatConversionTable, getProjections } from '../../actions';

const CLMSDownloadCartView = (props) => {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.intl?.locale);
  const cart = useSelector((state) => state.cart_items.items);
  const { isLoggedIn } = useCartState();
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    Cart: {
      id: 'Cart',
      defaultMessage: 'Cart',
    },
  });

  useEffect(() => {
    dispatch(getProjections());
    dispatch(getFormatConversionTable());
  }, [dispatch]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname]);

  useEffect(() => {
    let localsessionUidsList = [];
    if (cart?.length !== 0) {
      localsessionUidsList = [
        ...new Set(cart.map((item) => item.UID || item.id)),
      ];
    }
    let localsessionNutsIDList = [...new Set(getNutsIDList(cart))];
    let uidsList = [...new Set(localsessionUidsList)];
    if (uidsList.length > 0) {
      dispatch(getDatasetsByUid(uidsList));
    }
    if (localsessionNutsIDList.length > 0) {
      dispatch(getNutsNames(localsessionNutsIDList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, dispatch]);

  function getNutsIDList(cart_data) {
    const nuts_ids = [];
    cart_data?.length > 0 &&
      cart_data.forEach((cart_item) => {
        cart_item.area?.type === 'nuts' && nuts_ids.push(cart_item.area.value);
      });
    return nuts_ids;
  }

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
            <div className="ccl-container">
              <div className="message-block">
                <div className="message-icon">
                  <FontAwesomeIcon icon={['far', 'comment-alt']} fixedWidth />
                </div>
                <div className="message-text">
                  <p>
                    <FormattedMessage id="Note:" defaultMessage="Note:" />
                  </p>
                  <ul>
                    <li>
                      Select the files you want to download and click the button
                      'Start downloading' to start the download process.
                    </li>
                    <li>
                      You can visit the{' '}
                      <Link to={`/${locale}/cart-downloads`}>
                        downloading process page
                      </Link>{' '}
                      to check the status of your downloads.
                    </li>
                  </ul>
                </div>
              </div>
              <CLMSCartContent localSessionCart={cart} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CLMSDownloadCartView;
