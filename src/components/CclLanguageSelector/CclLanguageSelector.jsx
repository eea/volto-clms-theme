/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cookie from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { find } from 'lodash';
import { updateIntl } from 'react-intl-redux';
import config from '@plone/volto/registry';
import { flattenToAppURL } from '@plone/volto/helpers';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';
import { FormattedMessage } from 'react-intl';

import { Helmet, langmap } from '@plone/volto/helpers'; // volto 13.0.1 upgrade

let locales = {};

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

function CclLanguageSelector(props) {
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.intl.locale);
  const translations = useSelector(
    (state) => state.content.data?.['@components']?.translations?.items,
  );

  function changeLanguage(language) {
    cookie.save('I18N_LANGUAGE', language, {
      expires: new Date((2 ** 31 - 1) * 1000),
      path: '/',
    });

    dispatch(
      updateIntl({
        locale: language,
        messages: locales[language],
      }),
    );
  }

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
                // console.log(langmap[lang]);
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
                          to={
                            translation
                              ? flattenToAppURL(translation['@id'])
                              : `/${lang}`
                          }
                          title={langmap[lang].nativeName}
                          onClick={() => {
                            props.onClickAction();
                            changeLanguage(lang);
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
      </CclModal>

      <div className="header-lang-text">
        <CclModal
          trigger={<span>{Capitalize(langmap[currentLang].nativeName)}</span>}
          size="fullscreen"
        >
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
                            to={
                              translation
                                ? flattenToAppURL(translation['@id'])
                                : `/${lang}`
                            }
                            title={langmap[lang].nativeName}
                            onClick={() => {
                              props.onClickAction();
                              changeLanguage(lang);
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
