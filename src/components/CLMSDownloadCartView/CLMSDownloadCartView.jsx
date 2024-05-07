import React, { useEffect } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Forbidden, Unauthorized } from '@plone/volto/components';
import { Helmet } from '@plone/volto/helpers';
import { helmetTitle } from '@eeacms/volto-clms-theme/components/CclUtils';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getNutsIDList } from './cartUtils';

import {
  getDatasetsByUid,
  getExtraBreadcrumbItems,
  getNutsNames,
  getFormatConversionTable,
  getProjections,
  getDatasetTimeseries,
  getDownloadtool,
} from '../../actions';
import CLMSCartContent from './CLMSCartContent';

/**
 * CLMSDownloadCartView container.
 * @module components/CLMSDownloadCartView/CLMSDownloadCartView
 */

const CLMSDownloadCartView = (props) => {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.intl?.locale);
  const cart = useSelector((state) => state.cart_items.items);
  const content = useSelector((state) => state.content.data);
  const datasetTimeseries = useSelector((state) => state.datasetTimeseries);
  const nutsnames = useSelector((state) => state.nutsnames);

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
    return () => {};
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
    return () => {};
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
      uidsList.forEach((uid) => {
        if (
          !datasetTimeseries.loading &&
          datasetTimeseries?.datasets[uid] === undefined
        ) {
          dispatch(getDatasetTimeseries(uid));
        }
      });
    }
    if (localsessionNutsIDList.length > 0) {
      if (nutsnames.nutsnames) {
        const missingnn = localsessionNutsIDList.filter(
          (nid) => !nutsnames.nutsnames[nid],
        );
        if (missingnn.length > 0)
          dispatch(getNutsNames(localsessionNutsIDList));
      } else {
        dispatch(getNutsNames(localsessionNutsIDList));
      }
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(getDownloadtool());
  }, [dispatch]);

  const downloadtool = useSelector((state) => state.downloadtool);
  const maxInQueue = 5;
  const howManyInQueue =
    Object.keys(downloadtool?.download_queued).length +
    Object.keys(downloadtool?.download_in_progress).length;
  const tooManyInQueue = howManyInQueue >= maxInQueue;
  return (
    <>
      <Helmet title={helmetTitle(formatMessage(messages.Cart), content)} />
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
                      'Process download request' to start the download process.
                    </li>
                    <li>
                      You can visit the{' '}
                      <Link to={`/${locale}/cart-downloads`}>
                        downloading process page
                      </Link>{' '}
                      to check the status of your downloads.
                    </li>
                    {tooManyInQueue && (
                      <li>
                        <strong>
                          You have 5 items in the download queue. Wait until the
                          queue is reduced before requesting more.
                        </strong>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <CLMSCartContent
                localSessionCart={cart}
                tooManyInQueue={tooManyInQueue}
                howManyInQueue={howManyInQueue}
                maxInQueue={maxInQueue}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CLMSDownloadCartView;
