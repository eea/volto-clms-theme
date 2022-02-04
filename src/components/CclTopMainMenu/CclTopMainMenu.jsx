import { Link } from 'react-router-dom';
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { getItemsByPath } from 'volto-dropdownmenu/utils';
import { setLanguagePath } from './multilingualPath';
import { useSelector } from 'react-redux';

const CclTopMainMenu = () => {
  const pathname = setLanguagePath('header');
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
                  <Link to={{ pathname: item.linkUrl?.[0]?.['@id'] }}>
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
                          <Link to={{ pathname: element?.['@id'] }}>
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
