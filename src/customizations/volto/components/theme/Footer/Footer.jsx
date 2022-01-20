/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import CopernicusImage from '@eeacms/volto-clms-theme/../theme/clms/img/copernicus_eu_logo_white.svg';
import AtmosphereImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-atmosphere.svg';
import MarineImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-marine.svg';
import LandImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-land.svg';
import SecurityImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-security.svg';
import ClimateImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-climate.svg';
import EmergencyImage from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-icon-emergency.svg';
import ECImage from '@eeacms/volto-clms-theme/../theme/clms/img/eea-logo.svg';
import EEAImage from '@eeacms/volto-clms-theme/../theme/clms/img/ec-logo-white.svg';
import CclFooterMenu from '@eeacms/volto-clms-theme/components/CclTopMainMenu/CclFooterMenu';
import CclFooterColumn from '@eeacms/volto-clms-theme/components/CclFooterColumn/CclFooterColumn';
import { defineMessages } from 'react-intl';
import { ReactSVG } from 'react-svg';
import '@eeacms/volto-clms-theme/../theme/clms/css/footer.css';
import { Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';
import { subscribeNewsletter } from '../../../../../actions';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
    defaultMessage: 'I agree to the {link}',
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
    defaultMessage: 'DG Joint Research Center',
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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    this.setState({
      value: undefined,
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  emptyFieldErrorToast = () => {
    toast.error(
      <Toast error title={'Error'} content={'Write your email in the field'} />,
    );
  };

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.value) {
      this.props
        .subscribeNewsletter(this.state.value)
        .then(() => {
          this.props.subscribe_loaded &&
            toast.success(
              <Toast
                success
                title={this.props.intl.formatMessage(messages.success)}
                content={this.props.intl.formatMessage(messages.saved)}
              />,
            );
        })
        .catch(() => {
          this.props.subscribe_error &&
            toast.error(
              <Toast
                error
                title={this.props.intl.formatMessage(messages.error)}
                content={this.props.intl.formatMessage(messages.errorMessage)}
              />,
            );
        });
    } else {
      this.emptyFieldErrorToast();
    }
  }

  render() {
    // const intl = injectIntl();
    // const lang = useSelector((state) => state.intl.locale);
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
              <div className="ccl-footer-form-title">
                Sign up to our newsletter
              </div>
              <form action="" className="ccl-footer-form">
                <div className="ccl-footer-newsletter">
                  <input
                    placeholder="Enter an email adress"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  <button
                    type="submit"
                    className="footer-privacy-button"
                    onClick={this.onSubmit}
                  >
                    {this.props.intl.formatMessage(messages.subscribe)}
                  </button>
                </div>
                <div className="ccl-form footer-privacy-check">
                  <div className="ccl-form-group">
                    <input
                      type="checkbox"
                      id="footer_privacy"
                      name="footerPrivacy"
                      value=""
                      className="ccl-checkbox ccl-form-check-input"
                      required={true}
                    />
                    <label
                      className="ccl-form-check-label"
                      htmlFor="footer_privacy"
                    >
                      {this.props.intl.formatMessage(
                        messages.agreePrivacyPolicy,
                        {
                          link: (
                            <a
                              href={`/personal-data-protection`}
                              target="_blank"
                              rel="noreferrer"
                              key="key-personal-data-protection"
                            >
                              {this.props.intl.formatMessage(
                                messages.agreePrivacyPolicyLinkText,
                              )}
                            </a>
                          ),
                        },
                      )}
                    </label>
                  </div>
                </div>
              </form>

              <div className="ccl-footer-col-title">
                {this.props.intl.formatMessage(messages.followUs)}
              </div>
              <div className="ccl-footer-social">
                <a
                  href="https://www.youtube.com/channel/UCpuwnbuwGG20enAdE50g6TA"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Youtube"
                >
                  <span className="ccl-icon-youtube"></span>
                </a>
                <a
                  href="https://twitter.com/CopernicusLand"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                >
                  <span className="ccl-icon-twitter"></span>
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
              <div className="footer-implemented footer-implemented-ec">
                <a
                  href="https://ec.europa.eu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ReactSVG
                    src={EEAImage}
                    beforeInjection={(svg) => {
                      svg.setAttribute(
                        'class',
                        'ccl-svg ccl-service-button-icon ccl-svg--processed',
                      );
                    }}
                    className="ccl-ec-svg-wrapper"
                    wrapper="div"
                  />
                </a>
                <span>
                  {this.props.intl.formatMessage(messages.jointResearchCenter)}
                </span>
              </div>
              {/* <div className="ccl-footer-col-title">
              {intl.formatMessage(messages.expertSupportProvidedBy)}
            </div>
            <p>{intl.formatMessage(messages.EIONETActionGroup)}</p> */}
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
  injectIntl,
  connect(
    (state) => ({
      subscribe_loaded: state.subscribe_to_newsletter.subscribe.loaded,
      subscribe_loading: state.subscribe_to_newsletter.subscribe.loading,
      subscribe_error: state.subscribe_to_newsletter.subscribe.error,
    }),
    {
      subscribeNewsletter,
    },
  ),
)(Footer);
