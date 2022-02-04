/**
 * CLMSDownloadsView.
 * @module components/CLMSDownloadsView/CLMSDownloadsView
 */

import { Forbidden, Unauthorized } from '@plone/volto/components';
import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  getDatasetsByUid,
  getExtraBreadcrumbItems,
  getDownloadtool,
} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import CLMSDownloadTask from './CLMSDownloadTasks';
import { Helmet } from '@plone/volto/helpers';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';

const CLMSDownloadsView = (props) => {
  const dispatch = useDispatch();
  const downloadtool = useSelector((state) => state.downloadtool);
  const { isLoggedIn } = useCartState();

  const { formatMessage } = useIntl();
  const messages = defineMessages({
    CartDownloads: {
      id: 'Downloads',
      defaultMessage: 'Downloads',
    },
  });

  useEffect(() => {
    dispatch(
      getExtraBreadcrumbItems([
        {
          title: formatMessage(messages.CartDownloads),
          pathname: props.location.pathname,
        },
      ]),
    );
    // returned function will be called on component unmount
    return () => {
      dispatch(getExtraBreadcrumbItems([]));
    };
  }, [
    dispatch,
    formatMessage,
    messages.CartDownloads,
    props.location.pathname,
  ]);

  function getUIDList(download_data) {
    let uidList = [];
    let data_keys = Object.keys(download_data);
    if (data_keys?.length !== 0) {
      uidList = [
        ...new Set(
          data_keys
            .map((taskID) =>
              download_data[taskID].Datasets.map(
                (dataset) => dataset.DatasetID,
              ),
            )
            .reduce((elem1, elem2) => elem1.concat(elem2)),
        ),
      ];
    }
    return uidList;
  }

  useEffect(() => {
    if (
      downloadtool?.download_in_progress &&
      downloadtool?.download_finished_ok &&
      downloadtool?.download_finished_nok &&
      downloadtool?.download_rejected
    ) {
      let downloadInProgressUidsList = getUIDList(
        downloadtool?.download_in_progress,
      );
      let finishedOKUidsList = getUIDList(downloadtool?.download_finished_ok);
      let finishedNOKUidsList = getUIDList(downloadtool?.download_finished_nok);
      let rejectedUidsList = getUIDList(downloadtool?.download_rejected);
      let uidsList = [
        ...new Set(
          rejectedUidsList.concat(
            finishedNOKUidsList.concat(
              finishedOKUidsList.concat(downloadInProgressUidsList),
            ),
          ),
        ),
      ];
      if (uidsList.length > 0) {
        dispatch(getDatasetsByUid(uidsList));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadtool, dispatch]);

  useEffect(() => {
    if (downloadtool.delete_download_in_progress) {
      dispatch(getDownloadtool());
    }
  }, [dispatch, downloadtool.delete_download_in_progress]);

  return (
    <>
      <Helmet title={formatMessage(messages.CartDownloads)} />
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
              {formatMessage(messages.CartDownloads)}
            </h1>
            <div className="ccl-container">
              <CLMSDownloadTask />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CLMSDownloadsView;
