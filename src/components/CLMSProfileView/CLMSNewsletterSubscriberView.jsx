/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { getNewsletterSubscriber } from '../../actions';
import { CSVDownload } from 'react-csv';

/**
 * CLMSProfileView class.
 * @class CLMSProfileView
 * @extends Component
 */
class CLMSNewsletterSubscriberView extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      download: false,
      headers: [{ label: 'Newsletter subscribers', key: 'email' }],
    };
  }
  componentDidMount() {
    this.props.getNewsletterSubscriber();
  }
  handleClick(e) {
    this.setState({
      download: true,
    });
  }
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container>
        <div>
          <h1 className="page-title">
            Download a list of newsletter subscribers
          </h1>
          <p>
            Click in the button below to download a list of all the newsletter
            subscribers.
          </p>
          <CclButton mode={'filled'} onClick={this.handleClick}>
            Download
          </CclButton>
          {this.state.download && (
            <CSVDownload
              data={this.props.subscribers.items}
              headers={this.state.headers}
            />
          )}
        </div>
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      subscribers: state.newsletter_subscribers,
    }),
    { getNewsletterSubscriber },
  ),
)(CLMSNewsletterSubscriberView);
