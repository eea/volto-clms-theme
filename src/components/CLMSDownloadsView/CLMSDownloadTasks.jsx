/**
 * CLMSDownloadTask container.
 * @module components/CLMSDownloadTask/CLMSDownloadTask
 */

import React, { useEffect, useState } from 'react';
import { deleteDownloadtool, getDownloadtool } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import FileCard from './FileCard';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';

const CLMSDownloadTask = (props) => {
  const dispatch = useDispatch();
  const [taskInProgress, setTaskInProgress] = useState([]);
  const [finishedOKTasks, setFinishedOKTasks] = useState([]);
  const [finishedNOKTasks, setFinishedNOKTasks] = useState([]);
  const [rejectedTasks, setRejectedTasks] = useState([]);
  const [showDeleteTaskLoading, setShowDeleteTaskLoading] = useState(false);
  const downloadtool = useSelector((state) => state.downloadtool);

  const user_id = useSelector((state) => state.users.user.id);
  const datasets = useSelector((state) => state.datasetsByUid.datasets.items);
  const nutsnames = useSelector((state) => state.nutsnames.nutsnames);

  useEffect(() => {
    dispatch(getDownloadtool());
  }, [dispatch]);

  useEffect(() => {
    setTaskInProgress(downloadtool.download_in_progress);
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

  useEffect(() => {
    if (Object.keys(nutsnames).length > 0) {
      addNutsName(taskInProgress, setTaskInProgress);
      addNutsName(finishedOKTasks, setFinishedOKTasks);
      addNutsName(finishedNOKTasks, setFinishedNOKTasks);
      addNutsName(rejectedTasks, setRejectedTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nutsnames]);

  const MapTasks = (props) => {
    const { tasks, showDel, delTask } = props;
    return (
      <Grid columns={2}>
        {tasks?.length > 0 &&
          tasks.map((item, key) => (
            <Grid.Column key={key}>
              <FileCard
                item={item}
                showDeleteTaskLoading={showDel}
                deleteTaskInProgress={delTask}
              />
            </Grid.Column>
          ))}
      </Grid>
    );
  };

  function addDatasetName(data, setter) {
    let intermediate = [...data];
    intermediate.forEach((task) => {
      task.Datasets.forEach((dataset) => {
        const requestedItem = datasets.find(
          (req) => req.UID === dataset.DatasetID,
        );
        if (requestedItem) {
          dataset.name = requestedItem.title;
        }
      });
    });
    setter(intermediate);
  }

  function addNutsName(data, setter) {
    let intermediate = [...data];
    intermediate.forEach((task) => {
      task.Datasets.forEach((dataset) => {
        const requestedItem = Object.keys(nutsnames).includes(dataset.NUTSID);
        if (requestedItem) {
          dataset.NUTSName = nutsnames[dataset.NUTSID];
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
        <h2>
          <FormattedMessage id="In progress" defaultMessage="In progress" />
        </h2>
        {taskInProgress?.length !== 0 ? (
          <MapTasks
            tasks={taskInProgress}
            showDel={showDeleteTaskLoading}
            delTask={deleteTaskInProgress}
          />
        ) : (
          <p>
            <FormattedMessage
              id="There are no tasks in progress"
              defaultMessage="There are no tasks in progress"
            />
          </p>
        )}
      </Grid.Column>
      <Grid.Column>
        <h2>
          <FormattedMessage id="Completed" defaultMessage="Completed" />
        </h2>
        {finishedOKTasks?.length !== 0 ? (
          <MapTasks
            tasks={finishedOKTasks}
            showDel={showDeleteTaskLoading}
            delTask={deleteTaskInProgress}
          />
        ) : (
          <p>
            <FormattedMessage
              id="There are no completed tasks"
              defaultMessage="There are no completed tasks"
            />
          </p>
        )}
      </Grid.Column>
      <Grid.Column>
        <h2>
          <FormattedMessage
            id="Finished with errors"
            defaultMessage="Finished with errors"
          />
        </h2>
        {finishedNOKTasks?.length !== 0 ? (
          <MapTasks
            tasks={finishedNOKTasks}
            showDel={showDeleteTaskLoading}
            delTask={deleteTaskInProgress}
          />
        ) : (
          <p>
            <FormattedMessage
              id="There are no tasks finished with errors"
              defaultMessage="There are no tasks finished with errors"
            />
          </p>
        )}
      </Grid.Column>
      <Grid.Column>
        <h2>
          <FormattedMessage id="Rejected" defaultMessage="Rejected" />
        </h2>
        {rejectedTasks?.length !== 0 ? (
          <MapTasks
            tasks={rejectedTasks}
            showDel={showDeleteTaskLoading}
            delTask={deleteTaskInProgress}
          />
        ) : (
          <p>
            <FormattedMessage
              id="There are no rejected tasks"
              defaultMessage="There are no rejected tasks"
            />
          </p>
        )}
      </Grid.Column>
    </Grid>
  );
};
export default CLMSDownloadTask;
