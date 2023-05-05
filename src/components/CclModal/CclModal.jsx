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
        onClick={() => {
          !open ? openModal() : closeModal();
        }}
      >
        {trigger}
      </Segment>
      {open && (
        <Draggable>
          <Segment stacked>
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
          </Segment>
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
