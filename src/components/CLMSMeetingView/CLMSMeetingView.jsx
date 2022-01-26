import React from 'react';
import './meetingstyles.less';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import {
  When,
  Recurrence,
} from '@plone/volto/components/theme/View/EventDatesInfo';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { Header, Segment, Message } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import checkSVG from '@plone/volto/icons/check.svg';
import { postMeetingRegister } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { createContent } from '@plone/volto/actions';
export const CLMSMeetingView = (props) => {
  const { content, intl } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const meeting_register = useSelector((store) => store.meeting_register);
  const user = useSelector((state) => state.users?.user);
  let history = useHistory();

  let meeting_register_message = meeting_register?.registered_message || '';
  const isLoggedIn = useSelector((state) =>
    state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
  )
    ? true
    : false;
  const messages = defineMessages({
    what: {
      id: 'event_what',
      defaultMessage: 'What',
    },
    when: {
      id: 'event_when',
      defaultMessage: 'When',
    },
    allDates: {
      id: 'event_alldates',
      defaultMessage: 'All dates',
    },
    where: {
      id: 'event_where',
      defaultMessage: 'Where',
    },
    contactName: {
      id: 'event_contactname',
      defaultMessage: 'Contact Name',
    },
    contactPhone: {
      id: 'event_contactphone',
      defaultMessage: 'Contact Phone',
    },
    attendees: {
      id: 'event_attendees',
      defaultMessage: 'Attendees',
    },
    website: {
      id: 'event_website',
      defaultMessage: 'Website',
    },
    visitWebsite: {
      id: 'visit_external_website',
      defaultMessage: 'Visit external website',
    },
    meetingtype: {
      id: 'meetingtype',
      defaultMessage: 'Type',
    },
    meetinglevel: {
      id: 'meetinglevel',
      defaultMessage: 'Level',
    },
    hosting_organisation: {
      id: 'hosting_organisation',
      defaultMessage: 'Hosting organisation',
    },
  });

  function createForm() {
    dispatch(
      createContent(props.location.pathname, {
        '@type': 'AnonymousForm',
        title: 'Meeting Registration',
        id: 'form',
      }),
    );
    history.push(props.location.pathname + '/form');
  }
  const handleRegister = () => {
    dispatch(postMeetingRegister(location.pathname));
    notify();
  };

  function notify() {
    meeting_register_message && toast(meeting_register_message);
  }

  // React.useEffect(() => {
  //   notify();
  //   /* eslint-disable-next-line */
  // }, [meeting_register_message]);

  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>
      {user.roles && user.roles.includes('Manager') && (
        <Segment.Group compact horizontal>
          <Segment padded={'very'} color={'olive'} circular>
            <strong>
              <FormattedMessage
                id="Web manager section"
                defaultMessage="Web manager section"
              />
            </strong>
            <br />
            <br />
            {content.anonymous_registration_form ? (
              <CclButton
                url={content.anonymous_registration_form.url + '/edit'}
              >
                <FormattedMessage
                  id="Edit registration form"
                  defaultMessage="Edit registration form"
                />
              </CclButton>
            ) : (
              content.allow_anonymous_registration && (
                <CclButton onClick={createForm} isButton={true}>
                  <FormattedMessage
                    id="Create registration form"
                    defaultMessage="Create registration form"
                  />
                </CclButton>
              )
            )}
            {content.allow_register && content.subscribers_link && (
              <>
                <CclButton url={location.pathname + '/subscribers'}>
                  <FormattedMessage
                    id="Participants"
                    defaultMessage="Participants"
                  />
                </CclButton>
                <CclButton url={location.pathname + '/emails'}>
                  <FormattedMessage
                    id="Mail archive"
                    defaultMessage="Mail archive"
                  />
                </CclButton>
              </>
            )}
          </Segment>
        </Segment.Group>
      )}
      {content.description}
      <Segment compact padded={'very'} color={'olive'} floated="left">
        <div className="dataset-info-field">
          <div className="dataset-field-title">
            <Header>{intl.formatMessage(messages.when)}</Header>
          </div>
          <div className="dataset-field-description">
            {content.whole_day ? (
              <When
                start={content.start}
                end={content.start}
                whole_day={content.whole_day}
              />
            ) : (
              <When
                start={content.start}
                end={content.end}
                whole_day={content.whole_day}
              />
            )}
            {content.recurrence && (
              <>
                <Header dividing sub>
                  {intl.formatMessage(messages.allDates)}
                </Header>
                <Recurrence
                  recurrence={content.recurrence}
                  start={content.start}
                />
              </>
            )}
          </div>
        </div>
        {content.location && (
          <>
            <div className="dataset-info-field">
              <div className="dataset-field-title">
                <Header>{intl.formatMessage(messages.where)}</Header>
              </div>
              <div className="dataset-field-description">
                <a
                  title="View on map"
                  itemProp="location"
                  href={`http://maps.google.com?q=${content.location}`}
                >
                  {content.location}
                </a>
              </div>
            </div>
          </>
        )}

        {content.contact_name && (
          <>
            <div className="dataset-info-field">
              <div className="dataset-field-title">
                <Header>{intl.formatMessage(messages.contactName)}</Header>
              </div>
              <div className="dataset-field-description">
                <a href={`mailto:${content.contact_name}`}>
                  {content.contact_name}
                </a>
              </div>
            </div>
          </>
        )}

        {content.meeting_type && (
          <>
            <div className="dataset-info-field">
              <div className="dataset-field-title">
                <Header>{intl.formatMessage(messages.meetingtype)}</Header>
              </div>
              <div className="dataset-field-description">
                {content.meeting_type.title}
              </div>
            </div>
          </>
        )}

        {content.meeting_level && (
          <>
            <div className="dataset-info-field">
              <div className="dataset-field-title">
                <Header>{intl.formatMessage(messages.meetinglevel)}</Header>
              </div>
              <div className="dataset-field-description">
                {content.meeting_level.title}
              </div>
            </div>
          </>
        )}

        {content.hosting_organisation && (
          <>
            <div className="dataset-info-field">
              <div className="dataset-field-title">
                <Header>
                  {intl.formatMessage(messages.hosting_organisation)}
                </Header>
              </div>
              <div className="dataset-field-description">
                {content.hosting_organisation}
              </div>
            </div>
          </>
        )}

        {content.registrations_open && (
          <div className="meeting-info-container right-content">
            <div className="card-button">
              {content.allow_anonymous_registration ? (
                <>
                  {content.anonymous_registration_form?.published && (
                    <CclButton to={content.anonymous_registration_form.url}>
                      <FormattedMessage
                        id="Register to this meeting"
                        defaultMessage="Register to this meeting"
                      />
                    </CclButton>
                  )}
                </>
              ) : (
                <>
                  {content.is_registered ||
                  meeting_register.logged_user_registration ? (
                    <Message color="olive" size="large">
                      <Icon size={20} name={checkSVG} />{' '}
                      <FormattedMessage
                        id="You are already registered"
                        defaultMessage="You are already registered"
                      />
                    </Message>
                  ) : (
                    isLoggedIn && (
                      <CclButton onClick={() => handleRegister()}>
                        <FormattedMessage
                          id="Register to this meeting"
                          defaultMessage="Register to this meeting"
                        />
                      </CclButton>
                    )
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </Segment>
      <Segment basic>
        <StringToHTML string={content.text?.data || ''} />
      </Segment>
    </div>
  );
};

export default injectIntl(CLMSMeetingView);
