/**
 * CLMSDownloadCartView container.
 * @module components/CLMSDownloadCartView/CLMSDownloadCartView
 */

import { Forbidden, Unauthorized } from '@plone/volto/components';
import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  getDatasetsByUid,
  getExtraBreadcrumbItems,
  getNutsNames,
} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import { CART_SESSION_KEY } from '@eeacms/volto-clms-utils/cart/useCartState';
import CLMSCartContent from './CLMSCartContent';
// import CLMSTasksInProgress from './CLMSTasksInProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';

const CLMSDownloadCartView = (props) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.users.user.id);
  const locale = useSelector((state) => state.intl?.locale);
  const [localSessionCart, setLocalSessionCart] = useState([]);
  // const download_in_progress = useSelector(
  //   (state) => state.downloadtool.download_in_progress,
  // );
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
    // let downloadInProgressUidsList = [];
    if (localSessionCart?.length !== 0) {
      localsessionUidsList = [
        ...new Set(localSessionCart.map((item) => item.UID || item.id)),
      ];
    }
    let localsessionNutsIDList = [...new Set(getNutsIDList(localSessionCart))];

    // let progress_keys = Object.keys(download_in_progress);
    // if (progress_keys?.length !== 0) {
    //   downloadInProgressUidsList = [
    //     ...new Set(
    //       progress_keys
    //         .map((taskID) =>
    //           download_in_progress[taskID].Datasets.map(
    //             (dataset) => dataset.DatasetID,
    //           ),
    //         )
    //         .reduce((elem1, elem2) => elem1.concat(elem2)),
    //     ),
    //   ];
    // }
    let uidsList = [
      ...new Set(localsessionUidsList),
      // ...new Set(localsessionUidsList.concat(downloadInProgressUidsList)),
    ];
    if (uidsList.length > 0) {
      dispatch(getDatasetsByUid(uidsList));
    }
    if (localsessionNutsIDList.length > 0) {
      dispatch(getNutsNames(localsessionNutsIDList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSessionCart, dispatch]);
  // }, [download_in_progress, localSessionCart, dispatch]);

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
              {/* <CLMSTasksInProgress /> */}
              <CLMSCartContent localSessionCart={localSessionCart} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CLMSDownloadCartView;
