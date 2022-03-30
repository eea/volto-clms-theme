/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import { Helmet, flattenToAppURL, langmap } from '@plone/volto/helpers';
import { useSelector } from 'react-redux';

import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import config from '@plone/volto/registry';
import cx from 'classnames';
import { find } from 'lodash';

let locales = {};

const messages = defineMessages({
  switchLanguageTo: {
    id: 'Switch to',
    defaultMessage: 'Switch to',
  },
});

if (config.settings) {
  config.settings.supportedLanguages.forEach((lang) => {
    import('~/../locales/' + lang + '.json').then((locale) => {
      locales = { ...locales, [lang]: locale.default };
    });
  });
}

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ModalContent = (props) => {
  const intl = useIntl();
  const { translations, currentLang, onClickAction } = props;
  return (
    <div className="ccl-container">
      <div className="modal-language-header">
        <div className="modal-language-title">
          <i className="ccl-icon-language"></i>
          <h3 className="modal-title">
            <FormattedMessage
              id="Select your language"
              defaultMessage="Select your language"
            />
          </h3>
        </div>
      </div>
      <div className="modal-language-body">
        <div className="language-list">
          {config.settings.supportedLanguages.map((lang) => {
            const translation = find(translations, { language: lang });
            return (
              <div
                key={lang}
                className={cx(lang, 'language-item', {
                  'language-item-selected': lang === currentLang,
                })}
              >
                <span className="language-link" lang-code={lang}>
                  {lang !== currentLang ? (
                    <Link
                      aria-label={`${intl.formatMessage(
                        messages.switchLanguageTo,
                      )} ${langmap[lang].nativeName.toLowerCase()}`}
                      to={
                        translation
                          ? flattenToAppURL(translation['@id'])
                          : `/${lang}`
                      }
                      title={langmap[lang].nativeName}
                      onClick={() => {
                        onClickAction();
                      }}
                      key={`language-selector-${lang}`}
                    >
                      {Capitalize(langmap[lang].nativeName)}
                    </Link>
                  ) : (
                    Capitalize(langmap[lang].nativeName)
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function CclLanguageSelector(props) {
  const currentLang = useSelector((state) => state.intl.locale);
  const translations = useSelector(
    (state) => state.content.data?.['@components']?.translations?.items,
  );

  return config.settings.isMultilingual ? (
    <div className="ccl-header-lang">
      <CclModal
        trigger={
          <div className="header-lang-icon">
            <i className="ccl-icon-language"></i>
            <span className="header-lang-code">
              {currentLang.toUpperCase()}
            </span>
          </div>
        }
        size="fullscreen"
      >
        <ModalContent
          translations={translations}
          currentLang={currentLang}
          onClickAction={props.onClickAction}
        />
      </CclModal>

      <div className="header-lang-text">
        <CclModal
          trigger={<span>{Capitalize(langmap[currentLang].nativeName)}</span>}
          size="fullscreen"
        >
          <ModalContent
            translations={translations}
            currentLang={currentLang}
            onClickAction={props.onClickAction}
          />
        </CclModal>
      </div>
    </div>
  ) : (
    <Helmet>
      <html lang={config.settings.defaultLanguage} />
    </Helmet>
  );
}

CclLanguageSelector.propTypes = {
  onClickAction: PropTypes.func,
};

CclLanguageSelector.defaultProps = {
  onClickAction: () => {},
};

export default CclLanguageSelector;
