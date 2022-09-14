/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

import React from 'react';

import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { delProfile } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '@plone/volto/actions';

export const CLMSDeleteProfileView = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const isDeleted = useSelector((state) => state.profile_delete.loaded)
    ? true
    : false;

  function handleClick() {
    dispatch(delProfile());
  }

  if (isDeleted === true) {
    history.push('/');
    dispatch(logout());
  }

  return (
    <Container>
      <div>
        <h1 className="page-title">Delete your profile</h1>
        <p>Click in the button bellow to delete your profile.</p>

        <CclButton
          to="profile#Delete-profile"
          mode={'filled'}
          onClick={() => {
            handleClick();
          }}
        >
          Delete my account
        </CclButton>
      </div>
    </Container>
  );
};

export default injectIntl(CLMSDeleteProfileView);
