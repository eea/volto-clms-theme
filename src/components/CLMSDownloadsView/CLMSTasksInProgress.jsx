/**
 * CLMSInProgressTask container.
 * @module components/CLMSInProgressTask/CLMSInProgressTask
 */

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { deleteDownloadtool, getDownloadtool } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import FileCard from './FileCard';
import { FormattedMessage } from 'react-intl';

const CLMSTasksInProgress = (props) => {
  const dispatch = useDispatch();
  const [taskInProgress, setTaskInProgress] = useState([]);
  // const [cancelledTasks, setCancelledTasks] = useState([]);
  const [finishedOKTasks, setFinishedOKTasks] = useState([]);
  const [finishedNOKTasks, setFinishedNOKTasks] = useState([]);
  const [rejectedTasks, setRejectedTasks] = useState([]);
  const [showDeleteTaskLoading, setShowDeleteTaskLoading] = useState(false);
  const downloadtool = useSelector((state) => state.downloadtool);

  const user_id = useSelector((state) => state.users.user.id);
  const datasets = useSelector((state) => state.datasetsByUid.datasets.items);

  useEffect(() => {
    dispatch(getDownloadtool());
  }, [dispatch]);

  useEffect(() => {
    setTaskInProgress(downloadtool.download_in_progress);
    // setCancelledTasks(downloadtool.download_cancelled);
    setFinishedOKTasks(downloadtool.download_finished_ok);
    setFinishedNOKTasks(downloadtool.download_finished_nok);
    setRejectedTasks(downloadtool.download_rejected);
  }, [downloadtool]);

  useEffect(() => {
    if (datasets?.length > 0) {
      addDatasetName(taskInProgress, setTaskInProgress);
      addDatasetName(finishedOKTasks, setFinishedOKTasks);
      addDatasetName(finishedNOKTasks, setFinishedNOKTasks);
      addDatasetName(rejectedTasks, setRejectedTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasets]);

  function addDatasetName(data, setter) {
    let intermediate = [...data];
    intermediate.forEach((task) => {
      task.Datasets.forEach((dataset) => {
        const requestedItem = datasets.find(
          (requestedItem) => requestedItem.UID === dataset.DatasetID,
        );
        if (requestedItem) {
          dataset.name = requestedItem.title;
        }
      });
    });
    setter(intermediate);
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
    <Grid columns={1} stackable padded="vertically">
      <Grid.Column>
        {taskInProgress?.length !== 0 && (
          <>
            <h2>
              <FormattedMessage
                id="Task In Progress"
                defaultMessage="Task In Progress"
              />
            </h2>
            <Grid columns={2}>
              {taskInProgress?.length > 0 &&
                taskInProgress.map((item, key) => (
                  <Grid.Column key={key}>
                    <FileCard
                      item={item}
                      showDeleteTaskLoading={showDeleteTaskLoading}
                      deleteTaskInProgress={deleteTaskInProgress}
                    />
                  </Grid.Column>
                ))}
            </Grid>
          </>
        )}
        {/* <h2>Cancelled Tasks</h2>
        {cancelledTasks?.length > 0 &&
          cancelledTasks.map((item, key) => (
            <FileCard
              item={item}
              key={key}
              showDeleteTaskLoading={showDeleteTaskLoading}
              deleteTaskInProgress={deleteTaskInProgress}
            />
          ))} */}
      </Grid.Column>
      <Grid.Column>
        {finishedOKTasks?.length !== 0 && (
          <>
            <h2>
              <FormattedMessage
                id="Finished Correctly"
                defaultMessage="Finished Correctly"
              />
            </h2>
            <Grid columns={2}>
              {finishedOKTasks?.length > 0 &&
                finishedOKTasks.map((item, key) => (
                  <Grid.Column key={key}>
                    <FileCard
                      item={item}
                      key={key}
                      showDeleteTaskLoading={showDeleteTaskLoading}
                      deleteTaskInProgress={deleteTaskInProgress}
                    />
                  </Grid.Column>
                ))}
            </Grid>
          </>
        )}
      </Grid.Column>
      <Grid.Column>
        {finishedNOKTasks?.length !== 0 && (
          <>
            <h2>
              <FormattedMessage
                id="Finished Not Correctly"
                defaultMessage="Finished Not Correctly"
              />
            </h2>
            <Grid columns={2}>
              {finishedNOKTasks?.length > 0 &&
                finishedNOKTasks.map((item, key) => (
                  <Grid.Column key={key}>
                    <FileCard
                      item={item}
                      key={key}
                      showDeleteTaskLoading={showDeleteTaskLoading}
                      deleteTaskInProgress={deleteTaskInProgress}
                    />
                  </Grid.Column>
                ))}
            </Grid>
          </>
        )}
      </Grid.Column>
      <Grid.Column>
        {rejectedTasks?.length !== 0 && (
          <>
            <h2>
              <FormattedMessage id="Rejected" defaultMessage="Rejected" />
            </h2>
            <Grid columns={2}>
              {rejectedTasks?.length > 0 &&
                rejectedTasks.map((item, key) => (
                  <Grid.Column key={key}>
                    <FileCard
                      item={item}
                      key={key}
                      showDeleteTaskLoading={showDeleteTaskLoading}
                      deleteTaskInProgress={deleteTaskInProgress}
                    />
                  </Grid.Column>
                ))}
            </Grid>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};
export default CLMSTasksInProgress;
