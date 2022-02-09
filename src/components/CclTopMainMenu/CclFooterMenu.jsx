import { Link } from 'react-router-dom';
import React from 'react';
import { SetLanguagePath } from './multilingualPath';
import { getItemsByPath } from 'volto-dropdownmenu/utils';
import { useSelector } from 'react-redux';

const CclFooterMenu = () => {
  const pathname = SetLanguagePath('footer');
  const dropdownMenuNavItems = useSelector(
    (state) => state.dropdownMenuNavItems?.result,
  );
  const menu = getItemsByPath(dropdownMenuNavItems, pathname);
  return (
    <>
      {menu?.length > 0
        ? menu
            ?.filter((item) => item.visible)
            ?.map((item, index) => (
              <li key={index}>
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
