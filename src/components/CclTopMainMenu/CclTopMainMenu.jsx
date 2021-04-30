import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getContent } from '@plone/volto/actions';

import CclTopMainMenuElement from './CclTopMainMenuElement';

const CclTopMainMenu = (props) => {
  const contentData = useSelector((state) => state.content.subrequests);
  const dispatch = useDispatch();
  const path = '/top-main-menu';
  const id = 'top-main-menu';
  let contents = contentData?.[id]?.data?.items;
  let version = null;
  React.useEffect(() => {
    dispatch(getContent(path, version, id, null, true));
  }, [path, id, version, dispatch]);

  return (
    <>
      {contents?.map((element) => (
        <CclTopMainMenuElement element={element} />
      ))}
    </>
  );
};

export default CclTopMainMenu;
