import React from 'react';
import { Segment, Modal } from 'semantic-ui-react';
import Draggable from 'react-draggable';

import { FontAwesomeIcon } from '@eeacms/volto-clms-utils/components';
import { withFontAwesomeLibs } from '@eeacms/volto-clms-utils/helpers';

function CclModal(props) {
  let {
    trigger,
    children,
    size = 'fullscreen',
    modalStatus = () => {},
    onCloseExtra = () => {},
    draggable = false,
    fontAwesomeSolid,
  } = props;
  const [open, setOpen] = React.useState(false);

  function openModal() {
    setOpen(true);
    modalStatus(true);
  }

  function closeModal() {
    setOpen(false);
    modalStatus(false);
    onCloseExtra();
  }

  return draggable ? (
    <>
      {open && (
        <Draggable handle=".handle">
          <div className="dragable-modal-dialog">
            <div className={'modal-close modal-clms-close'}>
              <span
                className="ccl-icon-close"
                aria-label="Close"
                onClick={() => closeModal()}
                onKeyDown={() => closeModal()}
                tabIndex="0"
                role="button"
              ></span>
            </div>
            <Segment compact className="handle">
              <FontAwesomeIcon icon={fontAwesomeSolid.faArrowsAlt} size="lg" />
            </Segment>

            {children}
          </div>
        </Draggable>
      )}
      <Segment
        className="modal-trigger"
        basic
        compact
        onClick={() => {
          !open ? openModal() : closeModal();
        }}
      >
        {trigger}
      </Segment>
    </>
  ) : (
    <Modal
      onClose={() => closeModal()}
      onOpen={() => openModal()}
      open={open}
      trigger={trigger}
      className={'modal-clms-container'}
      size={size}
    >
      <div className={'modal-close modal-clms-close'}>
        <span
          className="ccl-icon-close"
          aria-label="Close"
          onClick={() => closeModal()}
          onKeyDown={() => closeModal()}
          tabIndex="0"
          role="button"
        ></span>
      </div>
      {children}
    </Modal>
  );
}

export default withFontAwesomeLibs(CclModal);
