/**
 * FileCard container.
 * @module components/CLMSDownloadsView/FileCard
 */

import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { Grid, Header, Loader, Popup, Segment } from 'semantic-ui-react';

import { Icon } from '@plone/volto/components';
import { cclDateTimeFormat } from '@eeacms/volto-clms-theme/components/CclUtils';

import { FontAwesomeIcon } from '@eeacms/volto-clms-utils/components';
import { withFontAwesomeLibs } from '@eeacms/volto-clms-utils/helpers';

import pauseSVG from '@plone/volto/icons/pause.svg';
import errorSVG from '@plone/volto/icons/error.svg';
import warningSVG from '@plone/volto/icons/warning.svg';
import packSVG from '@plone/volto/icons/pack.svg';
import removeSVG from '@plone/volto/icons/delete.svg';
import blockSVG from '@plone/volto/icons/block.svg';

import './filecard.less';

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
      {`${dataset['name'] || dataset['DatasetTitle'] || 'loading...'} -
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
  const {
    item,
    showDeleteTaskLoading,
    deleteTaskInProgress,
    fontAwesomeSolid,
  } = props;
  const { formatMessage } = useIntl();
  if (item?.FinalizationDateTime) {
    var FinalizationDate = new Date(Date.parse(item?.FinalizationDateTime));
    var today = new Date();
    var daysDiff = Math.floor(
      (today.getTime() - (FinalizationDate.getTime() || 0)) /
        (1000 * 3600 * 24),
    );
  }
  return (
    <Segment color="olive">
      <Grid
        divided
        centered
        columns={['In_progress', 'Queued'].includes(item?.Status) ? 2 : 3}
        padded
        className="filecard"
      >
        {/* {10 - daysDiff > -1 && ( */}
        <Grid.Row>
          <Grid.Column verticalAlign="middle" textAlign="center" width={2}>
            {item?.Status === 'Queued' && (
              <Popup
                content="Queued"
                size="small"
                trigger={
                  <Icon
                    name={pauseSVG}
                    size={50}
                    color="olive"
                    title={'Queued'}
                  />
                }
              />
            )}
            {item?.Status === 'In_progress' && (
              <Popup
                content="Preparing download files"
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
                    color="olive"
                    title={'Finished correctly'}
                  />
                }
              />
            )}
            {item?.Status === 'Cancelled' && (
              <Popup
                content="Cancelled"
                size="small"
                trigger={
                  <Icon
                    name={blockSVG}
                    size={50}
                    color="olive"
                    title={'Cancelled'}
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
                    name={warningSVG}
                    size={50}
                    color="#faa73e"
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
                    name={errorSVG}
                    size={50}
                    color="#e40166"
                    title={'Rejected download'}
                  />
                }
              />
            )}
          </Grid.Column>
          <Grid.Column
            width={['In_progress', 'Queued'].includes(item?.Status) ? 8 : 10}
          >
            <Header as="h3">{`Task ID: ${item?.TaskID}`}</Header>
            <Header.Subheader as="h4">{`Job ID: ${
              item?.cdse_task_role === 'parent'
                ? 'CDSE PROCESSING...'
                : item?.FMETaskId
            }`}</Header.Subheader>
            <Segment basic className="file-datetimes">
              {item?.RegistrationDateTime && (
                <>
                  Start date: {cclDateTimeFormat(item?.RegistrationDateTime)}
                  <span
                    className="info-icon"
                    tooltip="Dates and times are in UTC"
                    direction="up"
                  >
                    <FontAwesomeIcon icon={fontAwesomeSolid.faInfoCircle} />
                  </span>
                  <br />
                </>
              )}
              {item?.FinalizationDateTime && (
                <>
                  End date: {cclDateTimeFormat(item?.FinalizationDateTime)}
                  <span
                    className="info-icon"
                    tooltip="Dates and times are in UTC"
                    direction="up"
                  >
                    <FontAwesomeIcon icon={fontAwesomeSolid.faInfoCircle} />
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
            {item?.Status === 'Rejected' && item?.Message && (
              <Segment basic>
                <strong>Message:</strong>
                {item.Message}
              </Segment>
            )}
            {item?.Status === 'Finished_ok' && 3 - daysDiff > -1 && (
              <Segment basic className="file-download">
                {item?.DownloadURL && (
                  <a href={item.DownloadURL} target="_blank" rel="noreferrer">
                    {formatMessage(messages.Download)}
                  </a>
                )}
                {item?.FileSize && ` (${prettyBytes(item.FileSize)})`}
                {item?.FinalizationDateTime &&
                  ` | Expires in ${3 - daysDiff} days`}
              </Segment>
            )}
          </Grid.Column>
          {['In_progress', 'Queued'].includes(item?.Status) && (
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
                <span
                  className="info-icon"
                  tooltip="Remove task"
                  direction="up"
                >
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
                      title={'Remove task'}
                    />
                  </button>
                </span>
              )}
            </Grid.Column>
          )}
        </Grid.Row>
        {/* )} */}
      </Grid>
    </Segment>
  );
};

export default withFontAwesomeLibs(FileCard);
