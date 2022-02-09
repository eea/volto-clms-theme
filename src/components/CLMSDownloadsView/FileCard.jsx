/**
 * FileCard container.
 * @module components/CLMSDownloadsView/FileCard
 */

import './filecard.less';

import { Grid, Header, Loader, Popup, Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '@plone/volto/components';
import React from 'react';
import alertSVG from '@plone/volto/icons/alert.svg';
import errorSVG from '@plone/volto/icons/error.svg';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import packSVG from '@plone/volto/icons/pack.svg';
import removeSVG from '@plone/volto/icons/delete.svg';

const prettyBytes = require('pretty-bytes');

const messages = defineMessages({
  PrePackaged: {
    id: 'Pre-packaged',
    defaultMessage: 'Pre-packaged',
  },
  Download: {
    id: 'Download file',
    defaultMessage: 'Download file',
  },
});

const DatasetNaming = (props) => {
  const { formatMessage } = useIntl();
  const { dataset } = props;
  return (
    <>
      {`${dataset['name']} -
    ${
      dataset?.OutputFormat
        ? dataset?.OutputFormat
        : formatMessage(messages.PrePackaged)
    }`}
      {((dataset?.NUTSName || dataset?.NUTSID) &&
        ` (NUTS: ${dataset?.NUTSName || dataset?.NUTSID})`) ||
        (dataset?.BoundingBox && ' (Bounding Box)')}{' '}
    </>
  );
};

const FileCard = (props) => {
  const { item, showDeleteTaskLoading, deleteTaskInProgress } = props;
  const { formatMessage } = useIntl();
  if (item?.FinalizationDateTime) {
    var FinalizationDate = new Date(Date.parse(item?.FinalizationDateTime));
    var today = new Date();
    var daysDiff = Math.floor(
      (today.getTime() - FinalizationDate.getTime()) / (1000 * 3600 * 24),
    );
  }

  return (
    <Segment color="olive">
      <Grid
        divided
        centered
        columns={item?.Status !== 'In_progress' ? 2 : 3}
        padded
        className="filecard"
      >
        <Grid.Row>
          <Grid.Column verticalAlign="middle" textAlign="center" width={2}>
            {item?.Status === 'In_progress' && (
              <Popup
                content="In progress"
                size="small"
                trigger={<Loader active inline indeterminate size="medium" />}
              />
            )}
            {item?.Status === 'Finished_ok' && (
              <Popup
                content="Finished correctly"
                size="small"
                trigger={
                  <Icon
                    name={packSVG}
                    size={50}
                    color="#a0b128"
                    title={'Finished correctly'}
                  />
                }
              />
            )}
            {item?.Status === 'Finished_nok' && (
              <Popup
                content="Finished with errors"
                size="small"
                trigger={
                  <Icon
                    name={errorSVG}
                    size={50}
                    color="#e40166"
                    title={'Finished with errors'}
                  />
                }
              />
            )}
            {item?.Status === 'Rejected' && (
              <Popup
                content="Rejected download"
                size="small"
                trigger={
                  <Icon
                    name={alertSVG}
                    size={50}
                    color="#e40166"
                    title={'Rejected download'}
                  />
                }
              />
            )}
          </Grid.Column>
          <Grid.Column width={item?.Status === 'In_progress' ? 8 : 10}>
            <Header as="h3">{`Task ID: ${item?.TaskID}`}</Header>
            <Segment basic className="file-datetimes">
              Start date:{' '}
              {new Date(item?.RegistrationDateTime).toLocaleString('en-GB', {
                timeZone: 'UTC',
              })}{' '}
              <span
                className="info-icon"
                tooltip="Dates and times are in UTC"
                direction="up"
              >
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <br />
              {item?.FinalizationDateTime && (
                <>
                  End date:{' '}
                  {new Date(item?.FinalizationDateTime).toLocaleString(
                    'en-GB',
                    {
                      timeZone: 'UTC',
                    },
                  )}
                  <span
                    className="info-icon"
                    tooltip="Dates and times are in UTC"
                    direction="up"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span>
                </>
              )}
            </Segment>
            {item?.Datasets.length > 0 && (
              <ul>
                {item?.Datasets.map((dataset) => (
                  <li>
                    <DatasetNaming dataset={dataset} />
                  </li>
                ))}
              </ul>
            )}
            {item?.Status === 'Finished_ok' && 10 - daysDiff > -1 && (
              <Segment basic className="file-download">
                {item?.DownloadURL && (
                  <a href={item.DownloadURL} target="_blank" rel="noreferrer">
                    {formatMessage(messages.Download)}
                  </a>
                )}
                {item?.FileSize && ` (${prettyBytes(item.FileSize)})`}
                {item?.FinalizationDateTime &&
                  ` | Expires in ${10 - daysDiff} days`}
              </Segment>
            )}
          </Grid.Column>
          {item?.Status === 'In_progress' && (
            <Grid.Column
              width={2}
              verticalAlign="middle"
              textAlign="center"
              className="trashcontainer"
            >
              {showDeleteTaskLoading === item?.TaskID ? (
                <Loader
                  active
                  inline
                  indeterminate
                  size="small"
                  className="red-loader"
                />
              ) : (
                <Popup
                  content="Remove in progress task"
                  size="small"
                  trigger={
                    <button
                      onClick={() => {
                        deleteTaskInProgress(item?.TaskID);
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        color: 'inherit',
                        border: 'none',
                        padding: 0,
                        font: 'inherit',
                        cursor: 'pointer',
                        outline: 'inherit',
                      }}
                    >
                      <Icon
                        name={removeSVG}
                        size={30}
                        color="#e40166"
                        title={'Remove in progress task'}
                      />
                    </button>
                  }
                />
              )}
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default FileCard;