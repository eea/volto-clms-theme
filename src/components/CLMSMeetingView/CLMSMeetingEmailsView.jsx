import React, { useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import { useLocation, Link } from 'react-router-dom';

import { Pagination } from '@plone/volto/components';
export const CLMSMeetingEmailsView = (props) => {
  const { content, intl } = props;
  const dispatch = useDispatch();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const [currentPage, setcurrentPage] = useState(0);
  let location = useLocation();
  const [pageSize, setpageSize] = useState(15);
  let emails = searchSubrequests?.['emails']?.items || [];
  const total = searchSubrequests?.['emails']?.total || 0;
  const messages = defineMessages({
    from: {
      id: 'from',
      defaultMessage: 'From',
    },
    recipients: {
      id: 'recipients',
      defaultMessage: 'Recipients',
    },
    cc: {
      id: 'cc',
      defaultMessage: 'CC',
    },
    subject: {
      id: 'subject',
      defaultMessage: 'Subject',
    },
    modified: {
      id: 'modified',
      defaultMessage: 'Modified',
    },
    type: {
      id: 'type',
      defaultMessage: 'Type',
    },
    all: {
      id: 'all',
      defaultMessage: 'All',
    },
    no_results: {
      id: 'no_results',
      defaultMessage: 'There is no results',
    },
  });
  React.useEffect(() => {
    dispatch(
      searchContent(
        location.pathname,
        {
          fullobjects: 1,
          portal_type: 'eea.meeting.email',
          b_size: pageSize,
        },
        'emails',
      ),
    );
    /* eslint-disable-next-line */
  }, []);
  React.useEffect(() => {
    fetchContents();
    /* eslint-disable-next-line */
  }, [pageSize, currentPage]);

  function onChangePage(event, { value }) {
    setcurrentPage(value);
  }

  function onChangePageSize(event, { value }) {
    setcurrentPage(0);
    setpageSize(value);
  }

  function fetchContents() {
    if (pageSize === intl.formatMessage(messages.all)) {
      //'All'
      dispatch(
        searchContent(
          location.pathname,
          {
            fullobjects: 1,
            portal_type: 'eea.meeting.email',
            b_size: 100000000,
          },
          'emails',
        ),
      );
    } else {
      dispatch(
        searchContent(
          location.pathname,
          {
            fullobjects: 1,
            portal_type: 'eea.meeting.email',
            b_size: pageSize,
            b_start: currentPage * pageSize,
          },
          'emails',
        ),
      );
    }
  }
  return (
    <div className="ccl-container">
      <h1 className="page-title">{content.title}</h1>

      {emails && (
        <div className="ccl-container">
          <div className="event-detail">
            <div className="custom-table dataset-table">
              <table>
                <thead>
                  <tr>
                    <th>{intl.formatMessage(messages.from)}</th>
                    <th>{intl.formatMessage(messages.recipients)}</th>
                    <th>{intl.formatMessage(messages.cc)}</th>
                    <th>{intl.formatMessage(messages.subject)}</th>
                    <th>{intl.formatMessage(messages.modified)}</th>
                    <th>{intl.formatMessage(messages.type)}</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.length > 0 ? (
                    emails?.map((email, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={email['@id']}>{email.sender}</Link>
                        </td>
                        <td>
                          {email.receiver.map((receiver, index) => (
                            <span key={index}>
                              {index !== 0 && ', '}
                              {receiver.token}
                            </span>
                          ))}
                        </td>
                        <td>{email.cc}</td>
                        <td>{email.subject}</td>
                        <td>{new Date(email.modified).toLocaleDateString()}</td>
                        <td>{email.email_type}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <p>{intl.formatMessage(messages.no_results)}</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="contents-pagination">
                <Pagination
                  current={currentPage}
                  total={Math.ceil(total / pageSize)}
                  pageSize={pageSize}
                  pageSizes={[15, 30, 50]}
                  onChangePage={onChangePage}
                  onChangePageSize={onChangePageSize}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default injectIntl(CLMSMeetingEmailsView);
