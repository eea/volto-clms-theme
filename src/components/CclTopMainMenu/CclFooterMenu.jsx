import React from 'react';
import { useSelector } from 'react-redux';
import { getItemsByPath } from '@collective/volto-dropdownmenu/utils';
import { Link } from 'react-router-dom';
import setLanguagePath from './multilingualPath';

const CclFooterMenu = () => {
  const pathname = setLanguagePath('footer');
  const dropdownMenuNavItems = useSelector(
    (state) => state.dropdownMenuNavItems?.result,
  );
  const menu = getItemsByPath(dropdownMenuNavItems, pathname);
  console.log('menu: ', menu);
  return (
    <>
      {menu?.length > 0
        ? menu
            ?.filter((item) => item.visible)
            ?.map((item) => (
              <li>
                <Link to={{ pathname: item.linkUrl?.[0]?.['@id'] }}>
                  {item.title}
                </Link>
              </li>
            ))
        : null}
    </>
  );
};

export default CclFooterMenu;
