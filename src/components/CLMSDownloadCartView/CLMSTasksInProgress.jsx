/**
 * CLMSInProgressTask container.
 * @module components/CLMSInProgressTask/CLMSInProgressTask
 */

import './task_in_progress.less';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader, Popup } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { deleteDownloadtool, getDownloadtool } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from '@plone/volto/components';
import cancelledSVG from '@plone/volto/icons/spam.svg';
import downloadSVG from '@plone/volto/icons/download.svg';
import removeSVG from '@plone/volto/icons/delete.svg';

const CLMSTasksInProgress = (props) => {
  const dispatch = useDispatch();
  const [taskInProgress, setTaskInProgress] = useState([]);
  const [showDeleteTaskLoading, setShowDeleteTaskLoading] = useState(false);
  const download_in_progress = useSelector(
    (state) => state.downloadtool.download_in_progress,
  );

  const user_id = useSelector((state) => state.users.user.id);
  const datasets = useSelector((state) => state.datasetsByUid.datasets.items);

  useEffect(() => {
    dispatch(getDownloadtool());
  }, [dispatch]);

  useEffect(() => {
    let progress_keys = Object.keys(download_in_progress);
    let tasks_in_progress = [];
    progress_keys.forEach((progress_key) => {
      tasks_in_progress.push({
        ...download_in_progress[progress_key],
        TaskID: progress_key,
      });
    });
    setTaskInProgress(tasks_in_progress);
  }, [download_in_progress]);

  useEffect(() => {
    if (datasets?.length > 0) {
      addDatasetName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasets]);

  function addDatasetName() {
    let tasks_in_progress = [...taskInProgress];
    tasks_in_progress.forEach((task) => {
      task.Datasets.forEach((dataset) => {
        const requestedItem = datasets.find(
          (requestedItem) => requestedItem.UID === dataset.DatasetID,
        );
        if (requestedItem) {
          dataset.name = requestedItem.title;
        }
      });
    });
    setTaskInProgress(tasks_in_progress);
  }

  const deleteTaskInProgress = (task_id) => {
    setShowDeleteTaskLoading(task_id);
    dispatch(deleteDownloadtool(task_id));
    setTimeout(() => {
      dispatch(getDownloadtool(user_id));
      setShowDeleteTaskLoading(false);
    }, 1000); // We need delete response to check if remove_task request is completed successfully
  };
  return (
    <>
      {taskInProgress.length !== 0 && (
        <div className="custom-table cart-table">
          <h2>Tasks In Progress</h2>
          <table>
            <thead>
              <tr>
                <th>TaskID</th>
                <th>List of datasets</th>
                <th>OutputFormat</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {taskInProgress &&
                taskInProgress.map((item, key) => (
                  <tr
                    key={key}
                    style={{ opacity: 0.5, backgroundColor: '#f5f5f5' }}
                  >
                    <td>{item.TaskID}</td>
                    <td>
                      {item.Datasets.length === 1 && item.Datasets[0].name}
                      {item.Datasets.length > 1 && (
                        <ul>
                          {item.Datasets.map((dataset) => (
                            <li>{dataset['name']}</li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td>
                      {item.Datasets.length === 1 &&
                        item.Datasets[0].OutputFormat}
                      {item.Datasets.length > 1 && (
                        <ul>
                          {item.Datasets.map((dataset) => {
                            return dataset['OutputFormat'] ? (
                              <li>{dataset['OutputFormat']}</li>
                            ) : (
                              <li>-</li>
                            );
                          })}
                        </ul>
                      )}
                    </td>

                    <td>
                      {item.Status === 'In_progress' && (
                        <Popup
                          content="In progress"
                          size="small"
                          trigger={
                            <Loader active inline indeterminate size="small" />
                          }
                        />
                      )}
                      {item.Status === 'Cancelled' && (
                        <Popup
                          content="Cancelled task"
                          size="small"
                          trigger={
                            <Icon
                              name={cancelledSVG}
                              size="32px"
                              title={'Cancelled task'}
                            />
                          }
                        />
                      )}
                    </td>
                    <td>
                      {item.Status !== 'Cancelled' && (
                        <Popup
                          content="Download (Pending)"
                          size="small"
                          trigger={
                            <button
                              // disabled={true}
                              onClick={() => {
                                // deleteTaskInProgress(item.TaskID);
                              }}
                              style={{
                                backgroundColor: 'none',
                                color: 'inherit',
                                border: 'none',
                                padding: 0,
                                font: 'inherit',
                                cursor: 'pointer',
                                outline: 'inherit',
                              }}
                            >
                              <Icon
                                name={downloadSVG}
                                size="32px"
                                color="#A0B128"
                                title={'Download'}
                              />
                            </button>
                          }
                        />
                      )}
                    </td>
                    <td>
                      {item.Status !== 'Cancelled' &&
                        (showDeleteTaskLoading === item.TaskID ? (
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
                                  deleteTaskInProgress(item.TaskID);
                                }}
                                style={{
                                  backgroundColor: 'none',
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
                                  size="32px"
                                  color="#e40166"
                                  title={'Remove in progress task'}
                                />
                              </button>
                            }
                          />
                        ))}
                      {/* <FontAwesomeIcon
                      icon={['fas', 'trash']}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        deleteTaskInProgress(item.TaskID);
                      }}
                    /> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default CLMSTasksInProgress;
