import React, { useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  MeetingSubscribers,
  MeetingSubscribersManipulation,
} from '../../actions';
import { Checkbox } from 'semantic-ui-react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
export const CLMSMeetingSubscribersView = (props) => {
  const { content, intl } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const subscribers = useSelector((store) => store.subscribers);
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
  });
  const [subscriberSelection, setSubscriberSelection] = useState([]);
  const selectSubscriber = (id, checked) => {
    if (checked) setSubscriberSelection(subscriberSelection.concat(id));
    else
      setSubscriberSelection(
        subscriberSelection.filter((arr_id) => arr_id !== id),
      );
  };

  const selectAllSubscribers = (checked) => {
    if (checked) {
      setSubscriberSelection(subscribers.items.map((item, key) => item.id));
    } else {
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
    );
    setSubscriberSelection([]);
  }
  return (
    <div className="ccl-container">
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
                        onChange={(e, data) =>
                          selectAllSubscribers(data.checked)
                        }
                        checked={subscribers.items
                          .map((item, key) => item.id)
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
                  {subscribers.items?.map((subscriber, index) => (
                    <tr key={index}>
                      <td>
                        <Checkbox
                          onChange={(e, data) =>
                            selectSubscriber(subscriber.id, data.checked)
                          }
                          checked={subscriberSelection.includes(subscriber.id)}
                        />
                      </td>
                      <td>
                        <a href={`${subscriber['@id']}/edit`}>
                          {subscriber.title || subscriber.id}
                        </a>
                      </td>
                      <td>{subscriber.title || subscriber.id}</td>
                      <td>{subscriber.email}</td>
                      <td>{subscriber.review_state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <CclButton
                disabled={subscriberSelection.length === 0}
                onClick={() => handleSubscribersManipulationClick('delete')}
              >
                Delete selected
              </CclButton>
              <CclButton
                disabled={subscriberSelection.length === 0}
                onClick={() => handleSubscribersManipulationClick('approve')}
              >
                Approve selected
              </CclButton>
              <CclButton
                disabled={subscriberSelection.length === 0}
                onClick={() => handleSubscribersManipulationClick('reject')}
              >
                Reject selected
              </CclButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default injectIntl(CLMSMeetingSubscribersView);
