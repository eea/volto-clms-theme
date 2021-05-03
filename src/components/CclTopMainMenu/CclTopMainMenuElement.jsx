import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getContent } from '@plone/volto/actions';

import { Link } from 'react-router-dom';

const CclTopMainMenuElement = ({ element, isChildren = false }) => {
  const contentData = useSelector((state) => state.content.subrequests);
  const dispatch = useDispatch();
  const path = element.url;
  const id = element.title;
  const version = null;
  let contents = null;

  React.useEffect(() => {
    dispatch(getContent(path, version, id, null, true));
  }, [path, id, dispatch]);

  if (element['@type'] === 'Folder') {
    contents = contentData?.[id]?.data?.items;
  }

  return isChildren ? (
    <li>
      <Link to={{ pathname: element['remoteUrl'] }}>{element.title}</Link>
    </li>
  ) : (
    <li className={contents && 'header-dropdown'}>
      {contents ? (
        <>
          <Link to={element.remoteUrl || element.url}>
            {element.title} <span className="ccl-icon-chevron-thin-down"></span>
          </Link>
          <ul>
            {contents?.map((element, index) => (
              <CclTopMainMenuElement
                key={index}
                element={element}
                isChildren={true}
              />
            ))}
          </ul>
        </>
      ) : (
        <Link to={{ pathname: element['remoteUrl'] }}>{element.title}</Link>
      )}
    </li>
  );
};

export default CclTopMainMenuElement;
