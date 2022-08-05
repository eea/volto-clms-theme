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
  }

  return (
    <Container>
      <div>
        <h1 className="page-title">Delete your profile</h1>
        <p>Click in the button bellow to your profile.</p>

        <CclButton
          to="profile#Delete-profile"
          mode={'filled'}
          onClick={() => {
            handleClick();
          }}
        >
          Delete
        </CclButton>
      </div>
    </Container>
  );
};

export default injectIntl(CLMSDeleteProfileView);
