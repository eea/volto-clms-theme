import React from 'react';

import { useSelector } from 'react-redux';
import { getItemsByPath } from '@collective/volto-dropdownmenu/utils';
import { Link } from 'react-router-dom';

const CclTopMainMenu = () => {
  const dropdownMenuNavItems = useSelector(
    (state) => state.dropdownMenuNavItems?.result,
  );
  const pathname = useSelector((state) => state.router?.location.pathname);
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
                <li>
                  <Link to={{ pathname: item.linkUrl?.[0]?.['@id'] }}>
                    {item.title}
                  </Link>
                </li>
              ) : (
                <li className="header-dropdown">
                  <>
                    <Link to={{ pathname: item.linkUrl?.[0]?.['@id'] }}>
                      {item.title}{' '}
                      <span className="ccl-icon-chevron-thin-down"></span>
                    </Link>
                    <ul>
                      {item.navigationRoot?.map((element, index) => (
                        <li>
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
