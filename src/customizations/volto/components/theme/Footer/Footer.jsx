/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Button } from 'semantic-ui-react';
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

import CclFooterBlock from '@eeacms/volto-clms-theme/components/CclFooterBlock/CclFooterBlock';
import './footer.less';

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = () => (
  <footer className="ccl-footer">
    <div className="ccl-footer-main">
      <div className="ccl-footer-logo">
        <Link to="#">
          <Image
            className="ui centered image"
            src={CopernicusImage}
            height={85}
          />
        </Link>
      </div>
      <div className="ccl-container ccl-container-flex">
        <CclFooterBlock title={'Copernicus Services'}>
          <div className="ccl-footer-services">
            <div className="ccl-footer-services-row">
              <Link
                to="#"
                className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-atmosphere"
              >
                <Image src={AtmosphereImage} height={60} />
                <span>Atmosphere</span>
              </Link>
              <Link
                to="#"
                className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-marine"
              >
                <Image src={MarineImage} height={60} />
                <span>Marine</span>
              </Link>
              <Link
                to="#"
                className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-land"
              >
                <Image src={LandImage} height={60} />
                <span>Land</span>
              </Link>
            </div>
            <div className="ccl-footer-services-row">
              <Link
                to="#"
                className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-security"
              >
                <Image src={SecurityImage} height={60} />
                <span>Security</span>
              </Link>
              <Link
                to="#"
                className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-climate"
              >
                <Image src={ClimateImage} height={60} />
                <span>Climate Change</span>
              </Link>
              <Link
                to="#"
                className="ccl-service-button ccl-service-button-link ccl-service-button-w ccl-service-button-emergency"
              >
                <Image src={EmergencyImage} height={60} />
                <span>Emergency</span>
              </Link>
            </div>
          </div>
        </CclFooterBlock>
        <CclFooterBlock title={'Newsletter'} borderBottom={false}>
          <form action="" className="ccl-form">
            <div className="ccl-footer-form">
              <div className="ccl-footer-newsletter">
                <input placeholder="Enter an email adress" type="text" />
                <Button>Subscribe</Button>
              </div>
            </div>

            <div>
              <div className="ccl-form-group">
                <input
                  type="checkbox"
                  id="footer_privacy"
                  name="footerPrivacy"
                  value=""
                  className="ccl-checkbox  ccl-form-check-input"
                  required={true}
                />
                <label
                  className="ccl-form-check-label"
                  htmlFor="footer_privacy"
                >
                  I agree to the{' '}
                  <a href="./personal-data-protection.html" target="_blank">
                    privacy policy.
                  </a>
                </label>
              </div>
            </div>
          </form>

          <h3 className="ccl-footer-column-title">Follow us</h3>
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
        </CclFooterBlock>
        <CclFooterBlock title={'Implemented by'}>
          <div className="footer-implemented footer-implemented-eea">
            <Link to="#" className="ccl-svg ccl-service-button-icon">
              <Image src={ECImage} height={70} />
            </Link>
          </div>
          <div className="footer-implemented footer-implemented-ec">
            <Link to="#" className="ccl-svg ccl-service-button-icon">
              <Image src={EEAImage} height={90} />
            </Link>
            <span>DG Joint Research Center</span>
          </div>
          <h3 className="ccl-footer-column-title">
            Expert support provided by
          </h3>
          <p>EIONET Action Group on Land monitoring in Europe (EAGLE)</p>
        </CclFooterBlock>
      </div>
    </div>
    <div className="ccl-footer-bottom">
      <ul className="ccl-footer-legal">
        <CclFooterMenu></CclFooterMenu>
      </ul>
    </div>
  </footer>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
