/**
 * FileCard container.
 * @module components/CLMSDownloadsView/FileCard
 */

import { Loader, Popup, Segment, Grid, Header } from 'semantic-ui-react';
import React from 'react';

import { Icon } from '@plone/volto/components';
// import cancelledSVG from '@plone/volto/icons/spam.svg';
import removeSVG from '@plone/volto/icons/delete.svg';
import packSVG from '@plone/volto/icons/pack.svg';
import errorSVG from '@plone/volto/icons/error.svg';
import alertSVG from '@plone/volto/icons/alert.svg';
import { defineMessages, useIntl } from 'react-intl';

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
  return (
    <Segment color="olive">
      <Grid
        divided
        centered
        columns={item?.Status !== 'In_progress' ? 2 : 3}
        padded
      >
        <Grid.Row>
          <Grid.Column verticalAlign="middle" textAlign="center" width={3}>
            {item?.Status === 'In_progress' && (
              <Popup
                content="In progress"
                size="small"
                trigger={<Loader active inline indeterminate size="big" />}
              />
            )}
            {/* {item?.Status === 'Cancelled' && (
              <Popup
                content="Cancelled"
                size="small"
                trigger={
                  <Icon
                    name={cancelledSVG}
                    size={45}
                    color="#e40166"
                    title={'Cancelled'}
                  />
                }
              />
            )} */}
            {item?.Status === 'Finished_ok' && (
              <Popup
                content="Finished correctly"
                size="small"
                trigger={
                  <Icon
                    name={packSVG}
                    size={75}
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
                    size={75}
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
                    size={75}
                    color="#e40166"
                    title={'Rejected download'}
                  />
                }
              />
            )}
          </Grid.Column>
          <Grid.Column width={item?.Status === 'In_progress' ? 7 : 9}>
            <Header>{`Task ID: ${item?.TaskID}`}</Header>
            {item?.Datasets.length === 1 && (
              <p>{`${item?.Datasets[0].name} - ${
                item.Datasets[0]['OutputFormat']
                  ? item.Datasets[0]['OutputFormat']
                  : formatMessage(messages.PrePackaged)
              }`}</p>
            )}
            {item?.Datasets.length > 1 && (
              <ul>
                {item?.Datasets.map((dataset) => (
                  <li>
                    {`${dataset['name']} - 
                      ${
                        dataset['OutputFormat']
                          ? dataset['OutputFormat']
                          : formatMessage(messages.PrePackaged)
                      }`}
                  </li>
                ))}
              </ul>
            )}
            {item?.FileSize && <p>{`${item.FileSize} MB`}</p>}
            {item?.DownloadURL && (
              <a href={item.DownloadURL} target="_blank" rel="noreferrer">
                {formatMessage(messages.Download)}
              </a>
            )}
            {item?.FinalizationDateTime &&
              ` | Expires in ${10 - daysDiff} days`}
          </Grid.Column>
          {item?.Status === 'In_progress' && (
            <Grid.Column width={2} verticalAlign="middle" textAlign="center">
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
                        size={40}
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
