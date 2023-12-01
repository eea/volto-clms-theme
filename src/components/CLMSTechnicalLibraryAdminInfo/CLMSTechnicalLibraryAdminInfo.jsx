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

  showThis?.[`${uid}`] &&
    !queryItem?.loading &&
    !queryItem?.loaded &&
    dispatch(getContent(id, null, uid));

  return isLoggedIn && isManager ? (
    <>
      {showThis[`${uid}`] && item ? (
        <>
          <br />
          <Button onClick={() => setShowThis({ ...showThis, [uid]: false })}>
            Hide
          </Button>
          <br />
          {item?.taxonomy_technical_library_categorization && (
            <strong>Categorization</strong>
          )}{' '}
          <ul>
            {item?.taxonomy_technical_library_categorization?.map((item) => (
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
      )}
    </>
  ) : null;
};

export { CLMSTechnicalLibraryAdminInfo };
