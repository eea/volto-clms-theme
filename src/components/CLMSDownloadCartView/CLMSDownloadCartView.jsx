/**
 * CLMSDownloadCartView container.
 * @module components/CLMSDownloadCartView/CLMSDownloadCartView
 */

import { Forbidden, Unauthorized } from '@plone/volto/components';
import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { getDatasetsByUid, getExtraBreadcrumbItems } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import { CART_SESSION_KEY } from '@eeacms/volto-clms-utils/cart/useCartState';
import CLMSCartContent from './CLMSCartContent';
import CLMSTasksInProgress from './CLMSTasksInProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { Helmet } from '@plone/volto/helpers';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';

const CLMSDownloadCartView = (props) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.users.user.id);
  const [localSessionCart, setLocalSessionCart] = useState([]);
  const download_in_progress = useSelector(
    (state) => state.downloadtool.download_in_progress,
  );
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

  useEffect(() => {
    const CART_SESSION_USER_KEY = CART_SESSION_KEY.concat(`_${user_id}`);
    setLocalSessionCart(
      JSON.parse(localStorage.getItem(CART_SESSION_USER_KEY)) || [],
    );
  }, [user_id]);

  useEffect(() => {
    let localsessionUidsList = [];
    let downloadInProgressUidsList = [];
    if (localSessionCart?.length !== 0) {
      localsessionUidsList = [
        ...new Set(localSessionCart.map((item) => item.UID || item.id)),
      ];
    }
    let progress_keys = Object.keys(download_in_progress);
    if (progress_keys?.length !== 0) {
      downloadInProgressUidsList = [
        ...new Set(
          progress_keys
            .map((taskID) =>
              download_in_progress[taskID].Datasets.map(
                (dataset) => dataset.DatasetID,
              ),
            )
            .reduce((elem1, elem2) => elem1.concat(elem2)),
        ),
      ];
    }
    let uidsList = [
      ...new Set(localsessionUidsList.concat(downloadInProgressUidsList)),
    ];
    if (uidsList.length > 0) {
      dispatch(getDatasetsByUid(uidsList));
    }
  }, [
    download_in_progress,
    localSessionCart,
    localSessionCart.length,
    dispatch,
  ]);

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
              <CLMSCartContent localSessionCart={localSessionCart} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CLMSDownloadCartView;
