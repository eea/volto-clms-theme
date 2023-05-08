import React from 'react';
import { Segment, Modal } from 'semantic-ui-react';
import './modal.less';
import Draggable from 'react-draggable';

function CclModal(props) {
  let {
    trigger,
    children,
    size = 'fullscreen',
    modalStatus = () => {},
    onCloseExtra = () => {},
    draggable = false,
  } = props;
  const [open, setOpen] = React.useState(false);

  // React.useEffect(() => {
  //   setOpen(openState);
  // }, [openState]);

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
      <Segment
        basic
        compact
        onClick={() => {
          !open ? openModal() : closeModal();
        }}
      >
        {trigger}
      </Segment>
      {open && (
        //Draggable should work as a modal opening in middle of screen
        <Draggable defaultPosition={{ x: 0, y: 0 }} handle=".handle">
          <div className="dragable-modal">
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
              Drag here
            </Segment>

            {children}
          </div>
        </Draggable>
      )}
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

export default CclModal;
