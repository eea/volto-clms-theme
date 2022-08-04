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
import CclListingCards from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoListingBlock/CclListingCards';
import config from '@plone/volto/registry';
import AnimateHeight from 'react-animate-height';
import { Accordion } from 'semantic-ui-react';
import { CLMSRelatedItems } from '../CLMSRelatedItems';

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
  const files = content.items
    ? content.items.filter((item) => item['@type'] === 'File')
    : [];
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
              <FormattedMessage id="Register" defaultMessage="Register" />
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

  const [activeIndex, setActiveIndex] = React.useState([99]);

  const handleClick = ({ index }) => {
    const newIndex =
      activeIndex.indexOf(index) === -1
        ? [...activeIndex, index]
        : activeIndex.filter((item) => item !== index);

    setActiveIndex(newIndex);
  };

  const [activeDatasetIndex, setActiveDatasetIndex] = React.useState([99]);

  const handleDatasetClick = ({ datasetindex }) => {
    const newDatasetIndex =
      activeDatasetIndex.indexOf(datasetindex) === -1
        ? [...activeDatasetIndex, datasetindex]
        : activeDatasetIndex.filter((item) => item !== datasetindex);

    setActiveDatasetIndex(newDatasetIndex);
  };

  const titleIcons = config.blocks?.blocksConfig?.accordion?.titleIcons;

  function iconName(iconData, iTitleIcons) {
    return iconData?.right_arrows
      ? iTitleIcons.rightPosition
      : iTitleIcons.leftPosition;
  }

  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>
      {user.roles &&
        user.roles.includes('Manager') &&
        (content.allow_anonymous_registration ||
          (content.allow_register && content.subscribers_link)) && (
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
                    <FormattedMessage
                      id="Edit form"
                      defaultMessage="Edit form"
                    />
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
            {content.allow_register && content.subscribers_link && (
              <Segment padded={'very'} color={'olive'} circular>
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
              </Segment>
            )}
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
                          id="Register"
                          defaultMessage="Register"
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

        {files.length > 0 && (
          <CclListingCards
            variation="file"
            items={files}
            linkHref={`${files['@id']}/@@download/file`}
          />
        )}
        <div className="dataset-info-documents dropdown">
          <div className="accordion-block"></div>
          {content?.products?.length > 0 && (
            <Accordion fluid styled>
              <Accordion.Title
                as={'h2'}
                onClick={() => handleClick({ index: 0 })}
                className={'accordion-title align-arrow-right'}
              >
                {activeIndex.includes(0) ? (
                  <Icon
                    name={iconName(content, titleIcons.opened)}
                    size="24px"
                  />
                ) : (
                  <Icon
                    name={iconName(content, titleIcons.closed)}
                    size="24px"
                  />
                )}
                <span>Related products</span>
              </Accordion.Title>
              <Accordion.Content active={activeIndex.includes(0)}>
                <AnimateHeight animateOpacity duration={500} height={'auto'}>
                  <CLMSRelatedItems items={content.products} />
                </AnimateHeight>
              </Accordion.Content>
            </Accordion>
          )}
          {content?.datasets?.length > 0 && (
            <Accordion fluid styled>
              <Accordion.Title
                as={'h2'}
                onClick={() => handleDatasetClick({ datasetindex: 0 })}
                className={'accordion-title align-arrow-right'}
              >
                {activeDatasetIndex.includes(0) ? (
                  <Icon
                    name={iconName(content, titleIcons.opened)}
                    size="24px"
                  />
                ) : (
                  <Icon
                    name={iconName(content, titleIcons.closed)}
                    size="24px"
                  />
                )}
                <span>Related datasets</span>
              </Accordion.Title>
              <Accordion.Content active={activeDatasetIndex.includes(0)}>
                <AnimateHeight animateOpacity duration={500} height={'auto'}>
                  <CLMSRelatedItems items={content.datasets} />
                </AnimateHeight>
              </Accordion.Content>
            </Accordion>
          )}
        </div>
      </Segment>
    </div>
  );
};

export default injectIntl(CLMSMeetingView);
