import React from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Modal, Segment } from 'semantic-ui-react';

import { logout } from '@plone/volto/actions';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';

import { delProfile } from '../../actions';
import { FormattedMessage } from 'react-intl';

/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

export const CLMSDeleteProfileView = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const isDeleted = useSelector((state) => state.profile_delete.loaded)
    ? true
    : false;

  const deleting = useSelector((state) => state.profile_delete.loading);

  const { removeAllCart } = useCartState();

  function handleClick() {
    dispatch(delProfile());
  }

  if (isDeleted === true) {
    removeAllCart();
    history.push('/');
    dispatch(logout());
  }

  const [open, setOpen] = React.useState({});

  return (
    <Container>
      <div>
        <h1 className="page-title">Delete your profile</h1>
        <p>Click in the button bellow to delete your profile.</p>
        <Segment basic loading={deleting}>
          <Modal
            onClose={() => {
              setOpen({ ...open, 'delete-profile': false });
            }}
            onOpen={() => {
              setOpen({ ...open, 'delete-profile': true });
            }}
            open={open['delete-profile']}
            trigger={
              <CclButton mode={'filled'} to="profile#delete_profile">
                <FormattedMessage
                  id="Delete my account"
                  defaultMessage="Delete my account"
                />
              </CclButton>
            }
            className={'modal-clms'}
          >
            <div className={'modal-clms-background'}>
              <div className={'modal-clms-container'}>
                <div className={'modal-close modal-clms-close'}>
                  <span
                    className="ccl-icon-close"
                    aria-label="Close"
                    onClick={() => {
                      setOpen({ ...open, 'delete-profile': false });
                    }}
                    onKeyDown={() => {
                      setOpen({ ...open, 'delete-profile': false });
                    }}
                    tabIndex="0"
                    role="button"
                  ></span>
                </div>
                <div className="modal-login-text">
                  <h1>
                    <FormattedMessage
                      id="Delete your profile"
                      defaultMessage="Delete your profile"
                    />
                  </h1>
                  This action will delete your profile and your subscription
                  settings from the CLMS portal.
                  <br />
                  <br />
                </div>
                <Modal.Actions>
                  <CclButton
                    onClick={() => {
                      handleClick();
                      setOpen({ ...open, 'delete-profile': false });
                    }}
                    mode="filled"
                    to="profile#delete_profile"
                  >
                    <FormattedMessage
                      id="Yes, I want to delete my account"
                      defaultMessage="Yes, I want to delete my account"
                    />
                  </CclButton>{' '}
                  <CclButton
                    onClick={() => {
                      setOpen({ ...open, 'delete-profile': false });
                    }}
                    mode="filled"
                    to="profile#delete_profile"
                  >
                    <FormattedMessage
                      id="No, I want to keep my account"
                      defaultMessage="No, I want to keep my account"
                    />
                  </CclButton>
                </Modal.Actions>
              </div>
            </div>
          </Modal>
        </Segment>
      </div>
    </Container>
  );
};

export default injectIntl(CLMSDeleteProfileView);
