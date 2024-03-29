import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import { Forbidden, Unauthorized } from '@plone/volto/components';
import { Helmet } from '@plone/volto/helpers';
import { helmetTitle } from '@eeacms/volto-clms-theme/components/CclUtils';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';

import {
  getDatasetsByUid,
  getExtraBreadcrumbItems,
  getDownloadtool,
} from '../../actions';
import CLMSDownloadTask from './CLMSDownloadTasks';

/**
 * CLMSDownloadsView.
 * @module components/CLMSDownloadsView/CLMSDownloadsView
 */

const useInterval = (f, delay) => {
  const [timer, setTimer] = useState(undefined);
  const start = () => {
    if (timer) return;
    setTimer(setInterval(f, delay));
  };
  const stop = () => {
    if (!timer) return;
    setTimer(clearInterval(timer));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => stop, []);
  return start;
};

const CLMSDownloadsView = (props) => {
  const dispatch = useDispatch();
  const downloadtool = useSelector((state) => state.downloadtool);
  const datasetsByUid = useSelector((state) => state.datasetsByUid);
  const content = useSelector((state) => state.content.data);
  /* DISPATCH THE getDownloadtool ACTION EVERY 60 SECONDS */
  const start = useInterval((_) => dispatch(getDownloadtool()), 60000);
  const { isLoggedIn } = useCartState();

  const { formatMessage } = useIntl();
  const messages = defineMessages({
    CartDownloads: {
      id: 'Downloads',
      defaultMessage: 'Downloads',
    },
    HistoricCartDownloads: {
      id: 'Historic downloads',
      defaultMessage: 'Historic downloads',
    },
  });

  useEffect(() => {
    dispatch(
      getExtraBreadcrumbItems([
        {
          title: props.historicView
            ? formatMessage(messages.HistoricCartDownloads)
            : formatMessage(messages.CartDownloads),
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
    messages.HistoricCartDownloads,
    props.location.pathname,
    props.historicView,
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
      downloadtool?.download_queued &&
      downloadtool?.download_in_progress &&
      downloadtool?.download_finished_ok &&
      downloadtool?.download_finished_nok &&
      downloadtool?.download_rejected &&
      downloadtool?.download_cancelled
    ) {
      let queuedUidsList = getUIDList(downloadtool.download_queued);
      let downloadInProgressUidsList = getUIDList(
        downloadtool?.download_in_progress,
      );
      let finishedOKUidsList = getUIDList(downloadtool?.download_finished_ok);
      let finishedNOKUidsList = getUIDList(downloadtool?.download_finished_nok);
      let rejectedUidsList = getUIDList(downloadtool?.download_rejected);
      let cancelledUidsList = getUIDList(downloadtool?.download_cancelled);
      let uidsList = [
        ...new Set(
          rejectedUidsList.concat(
            finishedNOKUidsList.concat(
              finishedOKUidsList.concat(
                downloadInProgressUidsList.concat(
                  queuedUidsList.concat(cancelledUidsList),
                ),
              ),
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
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, downloadtool.delete_download_in_progress]);

  return (
    <div className="ccl-container ">
      <Helmet
        title={
          props.historicView
            ? helmetTitle(
                formatMessage(messages.HistoricCartDownloads),
                content,
              )
            : helmetTitle(formatMessage(messages.CartDownloads), content)
        }
      />
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
              {props.historicView
                ? formatMessage(messages.HistoricCartDownloads)
                : formatMessage(messages.CartDownloads)}
            </h1>
            <div className="ccl-container">
              <Segment
                basic
                loading={downloadtool.loading || datasetsByUid.loading}
              >
                <p>
                  Due to the successful launch of the new CLMS website, we are
                  experiencing a high load in our download process. Queue times
                  can be longer than expected, but please don't cancel your
                  download and try again because you will lose your position in
                  the download processing queue.
                </p>

                <CLMSDownloadTask all={props.historicView} />
              </Segment>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CLMSDownloadsView;
