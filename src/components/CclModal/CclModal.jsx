import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

import "./modal.less"

function CclModal(props) {
  const [open, setOpen] = React.useState(false)
  var {id, trigger, children} = props
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
      className={"modal-"+id}
      size="small"
    >
      <div className={"modal-"+id+"-background"}>
        <div className={"modal-"+id+"-container"}>
        <div className={"modal-close modal-"+id+"-close"}>
          <span className="ccl-icon-close" aria-label="Close" onClick={() => setOpen(false)}></span>
        </div>
          {children}
        </div>
      </div>
    </Modal>
  )
}

export default CclModal