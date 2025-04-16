/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { UniversalLink } from '@plone/volto/components';
import { ReactSVG } from 'react-svg';
import { compose } from 'redux';

import { FontAwesomeIcon } from '@eeacms/volto-clms-utils/components';
import { withFontAwesomeLibs } from '@eeacms/volto-clms-utils/helpers';

import { subscribeTo } from '../../../../../actions';

import AtmosphereImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-atmosphere.svg';
import ClimateImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-climate.svg';
import EmergencyImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-emergency.svg';
import LandImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-land.svg';
import MarineImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-marine.svg';
import SecurityImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-security.svg';
import CopernicusImage from '@eeacms/volto-clms-theme/../theme/clms/img/copernicus_eu_logo_white.svg';
import EEAImage from '@eeacms/volto-clms-theme/../theme/clms/img/ec-logo-white.svg';
import ECImage from '@eeacms/volto-clms-theme/../theme/clms/img/eea-logo.svg';
import CclFooterColumn from '@eeacms/volto-clms-theme/components/CclFooterColumn/CclFooterColumn';
import CclFooterMenu from '@eeacms/volto-clms-theme/components/CclTopMainMenu/CclFooterMenu';

const messages = defineMessages({
  copernicusServices: {
    id: 'copernicusServices',
    defaultMessage: 'Copernicus Services',
  },
  footerAtmosphere: {
    id: 'footerAtmosphere',
    defaultMessage: 'Atmosphere',
  },
  footerMarine: {
    id: 'footerMarine',
    defaultMessage: 'Marine',
  },
  footerLand: {
    id: 'footerLand',
    defaultMessage: 'Land',
  },
  footerSecurity: {
    id: 'footerSecurity',
    defaultMessage: 'Security',
  },
  footerClimateChange: {
    id: 'footerClimateChange',
    defaultMessage: 'Climate Change',
  },
  footerEmergency: {
    id: 'footerEmergency',
    defaultMessage: 'Emergency',
  },
  subscribe: {
    id: 'subscribe',
    defaultMessage: 'Subscribe',
  },
  agreePrivacyPolicy: {
    id: 'agreePrivacyPolicy',
    defaultMessage: 'I agree to the ',
  },
  agreePrivacyPolicyLinkText: {
    id: 'agreePrivacyPolicyLinkText',
    defaultMessage: 'privacy policy.',
  },
  followUs: {
    id: 'followUs',
    defaultMessage: 'Follow us',
  },
  jointResearchCenter: {
    id: 'jointResearchCenter',
    defaultMessage: 'DG Joint Research Centre',
  },
  expertSupportProvidedBy: {
    id: 'expertSupportProvidedBy',
    defaultMessage: 'Expert support provided by',
  },
  EIONETActionGroup: {
    id: 'EIONETActionGroup',
    defaultMessage: 'EIONET Action Group on Land monitoring in Europe (EAGLE)',
  },
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Confirmation email sent',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  invalid_mail: {
    id: 'The entered mail address is not valid',
    defaultMessage: 'The entered email address is not valid',
  },
  agreePrivacyPolicyCheck: {
    id: 'agreePrivacyPolicyCheck',
    defaultMessage: 'You have to agree to the privacy policy',
  },
  errorMessage: {
    id: 'An error has occured. Please try again',
    defaultMessage: 'An error has occured. Please try again',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
/**
 * CLMSProfileView class.
 * @class CLMSProfileView
 * @extends Component
 */

class Footer extends Component {
  render() {
    return (
      <footer className="ccl-footer">
        <div className="ccl-footer-main">
          <div className="ccl-footer-logo">
            <a
              href="https://www.copernicus.eu/en"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="ccl-footer-logo-img"
                src={CopernicusImage}
                alt={'Copernicus'}
                width={290}
                height={70}
              />
            </a>
          </div>
          <div className="ccl-container ccl-container-flex">
            <CclFooterColumn
              title={this.props.intl.formatMessage(messages.copernicusServices)}
            >
              <div className="ccl-footer-services">
                <a
                  href="https://atmosphere.copernicus.eu/"
                  target="_blank"
                  rel="noreferrer"
                  className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-atmosphere"
                >
                  <ReactSVG
                    src={AtmosphereImage}
                    beforeInjection={(svg) => {
                      svg.setAttribute(
                        'class',
                        'ccl-svg ccl-service-button-icon ccl-svg--processed',
                      );
                    }}
                  />
                  {this.props.intl.formatMessage(messages.footerAtmosphere)}
                </a>
                <a
                  href="https://marine.copernicus.eu/"
                  target="_blank"
                  rel="noreferrer"
                  className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-marine"
                >
                  <ReactSVG
                    src={MarineImage}
                    beforeInjection={(svg) => {
                      svg.setAttribute(
                        'class',
                        'ccl-svg ccl-service-button-icon ccl-svg--processed',
                      );
                    }}
                  />
                  {this.props.intl.formatMessage(messages.footerMarine)}
                </a>
                <a
                  href="https://land.copernicus.eu/"
                  target="_blank"
                  rel="noreferrer"
                  className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-land"
                >
                  <ReactSVG
                    src={LandImage}
                    beforeInjection={(svg) => {
                      svg.setAttribute(
                        'class',
                        'ccl-svg ccl-service-button-icon ccl-svg--processed',
                      );
                    }}
                  />
                  {this.props.intl.formatMessage(messages.footerLand)}
                </a>
                <a
                  href="https://www.copernicus.eu/en/services/security"
                  target="_blank"
                  rel="noreferrer"
                  className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-security"
                >
                  <ReactSVG
                    src={SecurityImage}
                    beforeInjection={(svg) => {
                      svg.setAttribute(
                        'class',
                        'ccl-svg ccl-service-button-icon ccl-svg--processed',
                      );
                    }}
                  />
                  {this.props.intl.formatMessage(messages.footerSecurity)}
                </a>
                <a
                  href="https://climate.copernicus.eu/"
                  target="_blank"
                  rel="noreferrer"
                  className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-climate"
                >
                  <ReactSVG
                    src={ClimateImage}
                    beforeInjection={(svg) => {
                      svg.setAttribute(
                        'class',
                        'ccl-svg ccl-service-button-icon ccl-svg--processed',
                      );
                    }}
                  />
                  {this.props.intl.formatMessage(messages.footerClimateChange)}
                </a>
                <a
                  href="https://emergency.copernicus.eu/"
                  target="_blank"
                  rel="noreferrer"
                  className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-emergency"
                >
                  <ReactSVG
                    src={EmergencyImage}
                    beforeInjection={(svg) => {
                      svg.setAttribute(
                        'class',
                        'ccl-svg ccl-service-button-icon ccl-svg--processed',
                      );
                    }}
                  />
                  {this.props.intl.formatMessage(messages.footerEmergency)}
                </a>
              </div>
            </CclFooterColumn>
            <div className="ccl-footer-col">
              <div className="ccl-footer-col-title">
                {this.props.intl.formatMessage(messages.followUs)}
              </div>
              <div className="ccl-footer-social">
                <a
                  href="https://www.linkedin.com/showcase/copernicus-eea"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Linkedin"
                >
                  <FontAwesomeIcon icon={['fab', 'linkedin']} />
                </a>
                <a
                  href="https://www.facebook.com/CopernicusEU"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <span className="ccl-icon-facebook"></span>
                </a>
              </div>
            </div>

            <CclFooterColumn title={'Implemented by'}>
              <div className="footer-implemented footer-implemented-eea">
                <a
                  href="https://www.eea.europa.eu/"
                  target="_blank"
                  rel="noreferrer"
                  title="European Environment Agency"
                >
                  <ReactSVG
                    src={ECImage}
                    beforeInjection={(svg) => {
                      svg.setAttribute(
                        'class',
                        'ccl-svg ccl-service-button-icon ccl-svg--processed',
                      );
                      svg.setAttribute('id', 'ccl-svg--_img_eea_logo_svg');
                    }}
                  />
                </a>
              </div>
              <div className="footer-implemented footer-implemented-ec"></div>
            </CclFooterColumn>
          </div>
        </div>
        <div className="ccl-footer-bottom">
          <ul className="ccl-footer-legal">
            <CclFooterMenu></CclFooterMenu>
          </ul>
        </div>
      </footer>
    );
  }
}

export default compose(
  withFontAwesomeLibs,
  injectIntl,
  connect(
    (state) => ({
      subscribe_loaded: state.subscription.loaded,
      subscribe_loading: state.subscription.loading,
      subscribe_error: state.subscription.error,
      subscribe_error_message: state.subscription.error_message,
    }),
    {
      subscribeTo,
    },
  ),
)(Footer);
