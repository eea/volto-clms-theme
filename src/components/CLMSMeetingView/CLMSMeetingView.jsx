import React from 'react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import {
  When,
  Recurrence,
} from '@plone/volto/components/theme/View/EventDatesInfo';
import { defineMessages, injectIntl } from 'react-intl';
import { Header } from 'semantic-ui-react';
import { postMeetingRegister } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
export const CLMSMeetingView = (props) => {
  const { content, intl } = props;
  const dispatch = useDispatch();
  const meeting_register = useSelector((store) => store.meeting_register);
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
  function handleRegister() {
    dispatch(postMeetingRegister(content['@id']));
  }
  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>
      <div className="event-detail">
        <div className="event-detail-content">
          <p>{content.description}</p>
          <div class="ccl-container-flex">
            <div className="meeting-info-container left-content">
              <div className="dataset-info-field">
                <div className="dataset-field-title">
                  <Header>{intl.formatMessage(messages.when)}</Header>
                </div>
                <div className="dataset-field-description">
                  <When
                    start={content.start}
                    end={content.end}
                    whole_day={content.whole_day}
                    open_end={content.open_end}
                  />
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
                        itemprop="location"
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
                      <Header>
                        {intl.formatMessage(messages.contactName)}
                      </Header>
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
                      <Header>
                        {intl.formatMessage(messages.meetingtype)}
                      </Header>
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
                      <Header>
                        {intl.formatMessage(messages.meetinglevel)}
                      </Header>
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
            </div>
            <div className="meeting-info-container right-content">
              <div className="card-button">
                {content.allow_register && (
                  <>
                    {content.allow_anonymous_registration ? (
                      <>
                        {content.anonymous_registration_form_url && (
                          <>
                            <a
                              href={content.anonymous_registration_form_url}
                              className="ccl-button ccl-button--default"
                            >
                              Register to this meeting
                            </a>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {content.is_registered ||
                        meeting_register.logged_user_registration ? (
                          <>You are already registered</>
                        ) : (
                          isLoggedIn && (
                            <>
                              <CclButton onClick={handleRegister}>
                                Register to this meeting
                              </CclButton>
                            </>
                          )
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              {content.subscribers_link && (
                <>
                  <div className="card-button">
                    <a
                      href={content.subscribers_link}
                      className="ccl-button ccl-button--default"
                    >
                      Participants
                    </a>
                  </div>
                  <div className="card-button">
                    <a
                      href={content.emails_link}
                      className="ccl-button ccl-button--default"
                    >
                      Mail archive
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
          <StringToHTML string={content.text?.data || ''} />
        </div>
      </div>
    </div>
  );
};

export default injectIntl(CLMSMeetingView);
