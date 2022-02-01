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
  getNutsNames,
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

  function getNutsIDList(download_data) {
    const nuts_ids = [];
    download_data?.length > 0 &&
      download_data.forEach((task) => {
        task.Datasets?.length > 0 &&
          task.Datasets.forEach((dataset) => {
            if (dataset.NUTSID) {
              nuts_ids.push(dataset.NUTSID);
            }
          });
      });
    return nuts_ids;
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
      let downloadInProgressNutsList = getNutsIDList(
        downloadtool?.download_in_progress,
      );
      // let downloadCancelledUidsList = getUIDList(
      //   downloadtool?.download_cancelled,
      // );
      let finishedOKUidsList = getUIDList(downloadtool?.download_finished_ok);
      let finishedOKNutsList = getNutsIDList(
        downloadtool?.download_finished_ok,
      );
      let finishedNOKUidsList = getUIDList(downloadtool?.download_finished_nok);
      let finishedNOKNutsList = getNutsIDList(
        downloadtool?.download_finished_nok,
      );
      let rejectedUidsList = getUIDList(downloadtool?.download_rejected);
      let rejectedNutsList = getNutsIDList(downloadtool?.download_rejected);
      let uidsList = [
        ...new Set(
          rejectedUidsList.concat(
            finishedNOKUidsList.concat(
              finishedOKUidsList.concat(downloadInProgressUidsList),
            ),
          ),
        ),
      ];
      let nutsNamesList = [
        ...new Set(
          rejectedNutsList.concat(
            finishedNOKNutsList.concat(
              finishedOKNutsList.concat(downloadInProgressNutsList),
            ),
          ),
        ),
      ];
      if (uidsList.length > 0) {
        dispatch(getDatasetsByUid(uidsList));
      }
      if (nutsNamesList.length > 0) {
        dispatch(getNutsNames(nutsNamesList));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadtool, dispatch]);

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
            <hr />
          </>
        )}
      </div>
    </>
  );
};

export default CLMSDownloadsView;
