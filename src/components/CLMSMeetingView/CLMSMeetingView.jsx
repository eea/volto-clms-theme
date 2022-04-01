import './meetingstyles.less';

import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Header, Image, Message, Segment } from 'semantic-ui-react';
import { Icon, Toast } from '@plone/volto/components';
import {
  Recurrence,
  When,
} from '@plone/volto/components/theme/View/EventDatesInfo';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import React from 'react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import checkSVG from '@plone/volto/icons/check.svg';
import { createContent } from '@plone/volto/actions';
import jwtDecode from 'jwt-decode';
import { postMeetingRegister } from '../../actions';
import { toast } from 'react-toastify';
import { LightGalleryListing } from './CclLightGallery';

export const CLMSMeetingView = (props) => {
  const { content, intl } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const meeting_register = useSelector((store) => store.meeting_register);
  const user = useSelector((state) => state.users?.user);
  let history = useHistory();

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
    hosting_organisation: {
      id: 'hosting_organisation',
      defaultMessage: 'Hosting organisation',
    },
    form_is_not_published: {
      id: 'Form is not published',
      defaultMessage: 'Form is not published',
    },
    no_email_customfield: {
      id: 'Email field field_custom_id parameter is not "email"',
      defaultMessage: 'Email field field_custom_id parameter is not "email"',
    },
    no_fullname_customfield: {
      id: 'Full name field field_custom_id parameter is not "fullname"',
      defaultMessage:
        'Full name field field_custom_id parameter is not "fullname"',
    },
    form_not_ready: {
      id: 'Some anonymous registration form parameters are not ready to go',
      defaultMessage:
        'Some anonymous registration form parameters are not ready to go',
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
  const RegistrationButton = ({ rContent, rMeeting_register, rIsLoggedIn }) => {
    return (
      <>
        {rContent.is_registered ||
        (rMeeting_register.logged_user_registration &&
          !rMeeting_register.error) ? (
          <Message color="olive" size="large">
            <Icon size={20} name={checkSVG} />{' '}
            <FormattedMessage
              id="You are already registered"
              defaultMessage="You are already registered"
            />
          </Message>
        ) : (
          rIsLoggedIn && (
            <CclButton onClick={() => handleRegister()}>
              <FormattedMessage
                id="Register to this meeting"
                defaultMessage="Register to this meeting"
              />
            </CclButton>
          )
        )}
      </>
    );
  };

  const handleRegister = () => {
    dispatch(postMeetingRegister(location.pathname)).then((response) => {
      var responseJSON = JSON.parse(response.replace(/'/g, '"'));
      responseJSON.email
        ? toast.success(
            <Toast
              success
              autoClose={5000}
              title={'Registration for ' + responseJSON.email}
              content={responseJSON.message}
            />,
          )
        : toast.error(
            <Toast
              error
              autoClose={5000}
              title={'Registration'}
              content={responseJSON.message}
            />,
          );
    });
  };

  var formErrorMessagesList = [];
  !content.anonymous_registration_form?.published &&
    formErrorMessagesList.push(
      intl.formatMessage(messages.form_is_not_published),
    );
  !content.anonymous_registration_form?.email &&
    formErrorMessagesList.push(
      intl.formatMessage(messages.no_email_customfield),
    );
  !content.anonymous_registration_form?.fullname &&
    formErrorMessagesList.push(
      intl.formatMessage(messages.no_fullname_customfield),
    );

  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>
      {user.roles && user.roles.includes('Manager') && (
        <Segment.Group compact horizontal>
          {content.allow_anonymous_registration && (
            <Segment padded={'very'} color={'olive'} circular>
              <strong>
                <FormattedMessage
                  id="Anonymous registration form"
                  defaultMessage="Anonymous registration form"
                />
              </strong>
              <br />
              <br />
              {content.anonymous_registration_form ? (
                <CclButton
                  url={content.anonymous_registration_form?.url + '/edit'}
                >
                  <FormattedMessage id="Edit form" defaultMessage="Edit form" />
                </CclButton>
              ) : (
                content.allow_anonymous_registration && (
                  <CclButton onClick={createForm} isButton={true}>
                    <FormattedMessage
                      id="Create form"
                      defaultMessage="Create form"
                    />
                  </CclButton>
                )
              )}
              {content.anonymous_registration_form &&
                (!content.anonymous_registration_form?.email ||
                  !content.anonymous_registration_form?.fullname ||
                  !content.anonymous_registration_form?.published) && (
                  <p>
                    <br />
                    <Message
                      negative
                      compact
                      size="large"
                      header={intl.formatMessage(messages.form_not_ready)}
                      list={formErrorMessagesList}
                    ></Message>
                  </p>
                )}
            </Segment>
          )}
          <Segment padded={'very'} color={'olive'} circular>
            {content.allow_register && content.subscribers_link && (
              <>
                <strong>
                  <FormattedMessage
                    id="Meeting register information"
                    defaultMessage="Meeting register information"
                  />
                </strong>
                <br />
                <br />
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
                  {content.anonymous_registration_form?.published &&
                    content.anonymous_registration_form?.email &&
                    content.anonymous_registration_form?.fullname && (
                      <CclButton url={content.anonymous_registration_form?.url}>
                        <FormattedMessage
                          id="Register to this meeting"
                          defaultMessage="Register to this meeting"
                        />
                      </CclButton>
                    )}
                </>
              ) : (
                <RegistrationButton
                  rContent={content}
                  rMeeting_register={meeting_register}
                  rIsLoggedIn={isLoggedIn}
                />
              )}
            </div>
          </div>
        )}
      </Segment>
      <Segment basic>
        {content?.image && (
          <figure>
            <Image
              src={content?.image?.scales?.preview?.download}
              alt={content?.image ? content?.image?.filename : 'Placeholder'}
            />
            <figcaption>{content?.image_caption}</figcaption>
          </figure>
        )}
        <StringToHTML string={content.text?.data || ''} />
        <LightGalleryListing />
      </Segment>
    </div>
  );
};

export default injectIntl(CLMSMeetingView);
