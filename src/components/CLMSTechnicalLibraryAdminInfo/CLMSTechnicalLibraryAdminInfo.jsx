import { useSelector, useDispatch } from 'react-redux';
import { getContent } from '@plone/volto/actions';
import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

const CLMSTechnicalLibraryAdminInfo = (props) => {
  const { uid, id } = props;
  const [showThis, setShowThis] = useState({});
  const isLoggedIn = useSelector((state) => state.userSession?.token);
  const user = useSelector((state) => state.users?.user);
  const isManager = user?.roles ? user?.roles.includes('Manager') : false;
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.content?.subrequests);
  const queryItem = contents?.[`${uid}`];
  const item = queryItem?.data;
  const show = isLoggedIn && isManager && item && showThis[`${uid}`];

  showThis?.[`${uid}`] &&
    !queryItem?.loading &&
    !queryItem?.loaded &&
    dispatch(getContent(id, null, uid));

  return show ? (
    <>
      <br />
      <Button onClick={() => setShowThis({ ...showThis, [uid]: false })}>
        Hide
      </Button>
      <br />
      <strong>Categorization</strong>
      <ul>
        {item?.taxonomy_technical_library_categorization.map((item) => (
          <li>{item.title}</li>
        ))}
      </ul>
    </>
  ) : (
    <>
      <br />
      <Button onClick={() => setShowThis({ ...showThis, [uid]: true })}>
        Show extra data
      </Button>
    </>
  );
};

export { CLMSTechnicalLibraryAdminInfo };
