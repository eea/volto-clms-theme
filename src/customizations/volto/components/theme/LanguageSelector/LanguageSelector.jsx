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
import { find, map } from 'lodash';
import { updateIntl } from 'react-intl-redux';
import langmap from 'langmap';
import { Helmet } from '@plone/volto/helpers';
import {useEffect} from 'react';
import config from '@plone/volto/registry';

import { flattenToAppURL } from '@plone/volto/helpers';

let locales = {};

if (config.settings) {
  config.settings.supportedLanguages.forEach((lang) => {
    import('~/../locales/' + lang + '.json').then((locale) => {
      locales = { ...locales, [lang]: locale.default };
    });
  });
}

const LanguageSelector = (props) => {
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
    <div className="ccl-header-lang-switcher" id="block-languageswitcher">
        {
          map(config.settings.supportedLanguages, (lang) => {
            return (
              lang===currentLang ?
              <span key="lang" className="ccl-active-lang">
                <span className="ccl-active-lang-label">
                {langmap[lang].nativeName}
                </span>
              </span>: ''
            );
          })
        }
        <div className="ccl-language-list-container">
          <ul className="ccl-language-list">
          {
            map(config.settings.supportedLanguages, (lang) => {
              const translation = find(translations, { language: lang });
              return (
                <li key={lang} hrefLang={lang} className={cx(lang, { 'is-active': lang === currentLang })}>
                  <Link
                    className={cx('ccl-language-link',{ 'is_active': lang === currentLang })}
                    to={translation ? flattenToAppURL(translation['@id']) : `/${lang}`}
                    title={langmap[lang].nativeName}
                    onClick={() => {
                      props.onClickAction();
                      changeLanguage(lang);
                    }}
                    key={`language-selector-${lang}`}
                  >
                    {langmap[lang].nativeName}&nbsp;
                  </Link>
                </li>
              );
            })
          }
          </ul>
        </div>
    </div>
  ) : (
    <Helmet>
      <html lang={config.settings.defaultLanguage} />
    </Helmet>
  );
};

LanguageSelector.propTypes = {
  onClickAction: PropTypes.func,
};

LanguageSelector.defaultProps = {
  onClickAction: () => {},
};

export default LanguageSelector;
