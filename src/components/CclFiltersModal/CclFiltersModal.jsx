import React from 'react';
import { Modal } from 'semantic-ui-react';
import './modal.less';
import { FormattedMessage } from 'react-intl';

function CclFiltersModal(props) {
  let {
    trigger,
    children,
    size = 'fullscreen',
    data,
    modalStatus = () => {},
    setFacets,
  } = props;
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
      size={size}
      id="fullscreen-filter-modal"
    >
      <div
        className="modal modal-filters"
        id="filters_modal"
        style={{ display: 'block' }}
      >
        <div className="modal-filters-background">
          <div className="modal-filters-container">
            <div className="modal-filters-header">
              <div className="modal-filters-title">
                <h3 className="modal-title">{data.facetsTitle}</h3>
              </div>
              <div className="modal-filters-right">
                <div
                  className="modal-filters-clear"
                  onClick={() => setFacets({})}
                  onKeyDown={() => setFacets({})}
                  tabIndex="0"
                  role="button"
                >
                  <FormattedMessage
                    id="Clear filters"
                    defaultMessage="Clear filters"
                  />
                </div>
                <div className="modal-close modal-filters-close">
                  <span
                    className="ccl-icon-close"
                    aria-label="Close"
                    onClick={() => closeModal()}
                    onKeyDown={() => closeModal()}
                    tabIndex="0"
                    role="button"
                  ></span>
                </div>
              </div>
            </div>
            <div className="modal-filters-body">
              <div className="modal-filters-dropdown">
                <div className="modal-filters-dropdown-container">
                  {children}
                </div>
              </div>
            </div>
            <div className="modal-filters-button">
              <button
                id=""
                className="ccl-button ccl-button-green"
                onClick={() => closeModal()}
                onKeyDown={() => closeModal()}
              >
                <FormattedMessage
                  id="Apply filters"
                  defaultMessage="Apply filters"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CclFiltersModal;
