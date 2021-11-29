import React from 'react';
import { Modal } from 'semantic-ui-react';
import './modal.less';

function CclModal(props) {
  let { trigger, children, size, modalStatus } = props;
  const [open, setOpen] = React.useState(false);

  function openModal() {
    setOpen(true);
    modalStatus(true);
  }

  function closeModal() {
    setOpen(false);
    modalStatus(false);
  }

  return (
    <Modal
      onClose={() => closeModal()}
      onOpen={() => openModal()}
      open={open}
      trigger={trigger}
      className={'modal-clms'}
      size={size}
    >
      <div className={'modal-clms-background'}>
        <div className={'modal-clms-container'}>
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
        </div>
      </div>
    </Modal>
  );
}

export default CclModal;
