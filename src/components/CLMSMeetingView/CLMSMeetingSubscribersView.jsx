import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { defineMessages, injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Checkbox } from 'semantic-ui-react';

import { Toast } from '@plone/volto/components';
import { Unauthorized } from '@plone/volto/components';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

import {
  MeetingSubscribers,
  MeetingSubscribersManipulation,
} from '../../actions';

export const CLMSMeetingSubscribersView = (props) => {
  const { content, intl } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const subscribers = useSelector((state) => state.subscribers.items);
  const messages = defineMessages({
    user_name: {
      id: 'user_name',
      defaultMessage: 'User Name',
    },
    name: {
      id: 'name',
      defaultMessage: 'Name',
    },
    email: {
      id: 'email',
      defaultMessage: 'Email',
    },
    organisation: {
      id: 'organisation',
      defaultMessage: 'Organisation',
    },
    state: {
      id: 'state',
      defaultMessage: 'State',
    },
    no_results: {
      id: 'no_results',
      defaultMessage: 'There is no results',
    },
    delete_selected: {
      id: 'delete_selected',
      defaultMessage: 'Delete selected',
    },
    approve_selected: {
      id: 'approve_selected',
      defaultMessage: 'Approve selected',
    },
    reject_selected: {
      id: 'reject_selected',
      defaultMessage: 'Reject selected',
    },
    download_selected: {
      id: 'download_selected',
      defaultMessage: 'Download selected as CSV',
    },
  });
  const [subscriberSelection, setSubscriberSelection] = useState([]);
  const [downloadData, setDownloadData] = useState([]);

  const selectRow = (subscriber, checked) => {
    const subscirberData = {
      'User Name': subscriber.title,
      Name: subscriber.userid,
      Email: subscriber.email,
      State: subscriber.review_state,
    };
    if (checked) {
      setDownloadData(downloadData.concat(subscirberData));
      setSubscriberSelection(subscriberSelection.concat(subscriber.id));
    } else {
      setSubscriberSelection(
        subscriberSelection.filter((arr_id) => arr_id !== subscriber.id),
      );
      setDownloadData(
        downloadData.filter(
          (arr_subscriber) => arr_subscriber.Email !== subscirberData.Email,
        ),
      );
    }
  };

  const selectAllRows = (checked) => {
    if (checked) {
      setDownloadData(
        subscribers?.map((item, key) => {
          return {
            'User Name': item.title,
            Name: item.userid,
            Email: item.email,
            State: item.review_state,
          };
        }),
      );
      setSubscriberSelection(subscribers?.map((item, key) => item.id));
    } else {
      setDownloadData([]);
      setSubscriberSelection([]);
    }
  };
  React.useEffect(() => {
    dispatch(MeetingSubscribers(location.pathname));
    /* eslint-disable-next-line */
  }, []);

  function handleSubscribersManipulationClick(manipulation_type) {
    dispatch(
      MeetingSubscribersManipulation(
        location.pathname,
        subscriberSelection,
        manipulation_type,
      ),
    )
      .then((response) => {
        toast.success(
          <Toast
            success
            autoClose={5000}
            title={'Success'}
            content={response.message}
          />,
        );
      })
      .catch(() => {
        toast.error(
          <Toast
            error
            autoClose={5000}
            title={'Error'}
            content={'There was an error handling your request'}
          />,
        );
      });
    setSubscriberSelection([]);
  }

  const isManager = useSelector((state) =>
    state.users?.user.roles.includes('Manager'),
  );

  return (
    <div className="ccl-container">
      {!isManager && (
        <Unauthorized
          pathname={props.pathname}
          staticContext={props.staticContext}
        />
      )}
      {isManager && (
        <>
          <h1 className="page-title">{content.title}</h1>
          {subscribers && (
            <div className="ccl-container">
              <div className="event-detail">
                <div className="custom-table dataset-table">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <Checkbox
                            onChange={(e, data) => selectAllRows(data.checked)}
                            checked={subscribers
                              ?.map((item, key) => item.id)
                              .every(function (val) {
                                return subscriberSelection.indexOf(val) !== -1;
                              })}
                          />
                        </th>
                        <th>{intl.formatMessage(messages.user_name)}</th>
                        <th>{intl.formatMessage(messages.name)}</th>
                        <th>{intl.formatMessage(messages.email)}</th>
                        <th>{intl.formatMessage(messages.state)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.length > 0 ? (
                        subscribers?.map((subscriber, index) => (
                          <tr key={index}>
                            <td>
                              <Checkbox
                                onChange={(e, data) =>
                                  selectRow(subscriber, data.checked)
                                }
                                checked={subscriberSelection.includes(
                                  subscriber.id,
                                )}
                              />
                            </td>
                            <td>{subscriber.id}</td>
                            <td>{subscriber.title}</td>
                            <td>{subscriber.email}</td>
                            <td>{subscriber.review_state}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">
                            <p>{intl.formatMessage(messages.no_results)}</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <CclButton
                    disabled={subscriberSelection.length === 0}
                    onClick={() => handleSubscribersManipulationClick('delete')}
                  >
                    {intl.formatMessage(messages.delete_selected)}
                  </CclButton>
                  <CclButton
                    disabled={subscriberSelection.length === 0}
                    onClick={() =>
                      handleSubscribersManipulationClick('approve')
                    }
                  >
                    {intl.formatMessage(messages.approve_selected)}
                  </CclButton>
                  <CclButton
                    disabled={subscriberSelection.length === 0}
                    onClick={() => handleSubscribersManipulationClick('reject')}
                  >
                    {intl.formatMessage(messages.reject_selected)}
                  </CclButton>
                  <CSVLink
                    disabled={subscriberSelection.length === 0}
                    data={downloadData}
                    className="ccl-button ccl-button--default"
                    filename={content.id + '.csv'}
                    target="_blank"
                  >
                    {intl.formatMessage(messages.download_selected)}
                  </CSVLink>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default injectIntl(CLMSMeetingSubscribersView);
