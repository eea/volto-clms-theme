/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { flattenToAppURL } from '@plone/volto/helpers';

import { getItemsByPath } from 'volto-dropdownmenu/utils';
import { SetLanguagePath } from './multilingualPath';

const CclTopMainMenu = () => {
  const pathname = SetLanguagePath('header');
  const dropdownMenuNavItems = useSelector(
    (state) => state.dropdownMenuNavItems?.result,
  );

  const menu = getItemsByPath(dropdownMenuNavItems, pathname);
  return (
    <>
      {menu?.length > 0
        ? menu
            ?.filter((item) => item.visible)
            ?.filter(
              (item) => item.mode === 'dropdown' || item.linkUrl?.[0]?.['@id'],
            )
            ?.map((item, index) =>
              item.mode === 'simpleLink' ? (
                <li key={index}>
                  <Link to={flattenToAppURL(item.linkUrl?.[0]?.['@id'])}>
                    {item.title}
                  </Link>
                </li>
              ) : (
                <li className="header-dropdown" key={index}>
                  <>
                    <span>
                      {item.title}{' '}
                      <span className="ccl-icon-chevron-thin-down"></span>
                    </span>
                    <ul>
                      {item.navigationRoot?.map((element, navIndex) => (
                        <li key={navIndex}>
                          <Link to={flattenToAppURL(element?.['@id'])}>
                            {element.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                </li>
              ),
            )
        : null}
    </>
  );
};

export default CclTopMainMenu;
