import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

import './modal.less';

function CclModal(props) {
  const [open, setOpen] = React.useState(false);
  var { id, trigger, children, size } = props;
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
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
              onClick={() => setOpen(false)}
            ></span>
          </div>
          {children}
        </div>
      </div>
    </Modal>
  );
}

export default CclModal;
