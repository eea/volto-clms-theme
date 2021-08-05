/**
 * CLMSDownloadCartView container.
 * @module components/CLMSDownloadCartView/CLMSDownloadCartView
 */

import React, { useEffect } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { getExtraBreadcrumbItems } from '../../actions';
import useCartState from '@eeacms/volto-clms-theme/utils/useCartState';

const CLMSDownloadCartView = (props) => {
  const dispatch = useDispatch();
  const { cart } = useCartState();

  const { formatMessage } = useIntl();
  const messages = defineMessages({
    DownloadCart: {
      id: 'DownloadCart',
      defaultMessage: 'Download cart',
    },
  });

  useEffect(() => {
    dispatch(
      getExtraBreadcrumbItems([
        {
          title: formatMessage(messages.DownloadCart),
          pathname: props.location.pathname,
        },
      ]),
    );

    // console.log('cart; ', cart);
    // returned function will be called on component unmount
    return () => {
      dispatch(getExtraBreadcrumbItems([]));
    };
  }, [dispatch, formatMessage, messages.DownloadCart, props.location.pathname]);

  return (
    <div>
      <Helmet title={formatMessage(messages.DownloadCart)} />
      <h2>Download cart</h2>
      {cart && cart.map((item) => <p>{item.format}</p>)}
    </div>
  );
};

export default CLMSDownloadCartView;
