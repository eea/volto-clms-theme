/**
 * CLMSInProgressTask container.
 * @module components/CLMSInProgressTask/CLMSInProgressTask
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadtool, deleteDownloadtool } from '../../actions';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from 'semantic-ui-react';
import removeSVG from '@plone/volto/icons/circle-dismiss.svg';
import { Icon } from '@plone/volto/components';
import './task_in_progress.less';

const CLMSTasksInProgress = (props) => {
  const dispatch = useDispatch();
  const [taskInProgress, setTaskInProgress] = useState([]);
  const download_in_progress = useSelector(
    (state) => state.downloadtool.download_in_progress,
  );

  const user_id = useSelector((state) => state.users.user.id);
  const [showDeleteTaskLoading, setShowDeleteTaskLoading] = useState(false);

  useEffect(() => {
    dispatch(getDownloadtool(user_id));
  }, [user_id, dispatch]);

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
  const deleteTaskInProgress = (task_id) => {
    setShowDeleteTaskLoading(task_id);
    dispatch(deleteDownloadtool(user_id, task_id));
    setTimeout(() => {
      dispatch(getDownloadtool(user_id));
      setShowDeleteTaskLoading(false);
    }, 1000); // We need delete response to check if remove_task request is completed successfully
  };
  return (
    <>
      {taskInProgress.length !== 0 && (
        <div className="custom-table cart-table">
          <table>
            <thead>
              <tr>
                <th>DatasetFormat</th>
                <th>DatasetID || unique_id</th>
                <th>OutputFormat</th>
                <th>Status</th>
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
                    <td className="table-td-format">{item.DatasetFormat}</td>
                    <td>{item.DatasetID}</td>
                    <td>{item.OutputFormat}</td>

                    <td>
                      <Loader active inline indeterminate size="small" />

                      {/* <FontAwesomeIcon icon="spinner" spin /> */}
                    </td>
                    <td>
                      {showDeleteTaskLoading === item.TaskID ? (
                        <Loader
                          active
                          inline
                          indeterminate
                          size="small"
                          className="red-loader"
                        />
                      ) : (
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
                            title={'remove'}
                          />
                        </button>
                      )}
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
