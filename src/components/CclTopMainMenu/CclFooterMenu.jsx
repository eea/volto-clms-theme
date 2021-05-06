import React from 'react';
import { useSelector } from 'react-redux';
import { getItemsByPath } from '@collective/volto-dropdownmenu/utils';
import { Link } from 'react-router-dom';

const CclFooterMenu = () => {
  const dropdownMenuNavItems = useSelector(
    (state) => state.dropdownMenuNavItems?.result,
  );
  const pathname = useSelector(() => '/footer');
  const menu = getItemsByPath(dropdownMenuNavItems, pathname);

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
