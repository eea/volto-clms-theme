import React from 'react';
import { useSelector } from 'react-redux';
import { getItemsByPath } from 'volto-dropdownmenu/utils';
import { Link } from 'react-router-dom';
import setLanguagePath from './multilingualPath';

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
                  <span className="ccl-icon-chevron-thin-down">
                    <Link to={{ pathname: item.linkUrl?.[0]?.['@id'] }}>
                      {item.title}{' '}
                    </Link>
                  </span>
                    <ul>
                      {item.navigationRoot?.map((element, index) => (
                        <li key={index}>
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
