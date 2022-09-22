/* eslint-disable react-hooks/exhaustive-deps */
/**
 * CLMSCartContent container.
 * @module components/CLMSDownloadCartView/CLMSCartContent
 */

import { Checkbox, Modal, Segment, Select } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import {
  getCartObjectFromMapviewer,
  getCartObjectFromPrepackaged,
  getDownloadToolPostBody,
  formatNaming,
  originalFormatNaming,
} from './cartUtils';
import {
  getDownloadtool,
  getFormatConversionTable,
  getProjections,
  postDownloadtool,
} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toast } from '@plone/volto/components';
import { cleanDuplicatesEntries } from '@eeacms/volto-clms-utils/utils';
import { getAvailableConversion } from './conversion';
import { toast } from 'react-toastify';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';

const CLMSCartContent = (props) => {
  const { localSessionCart } = props;
  const dispatch = useDispatch();
  const { removeCartItem, removeCartItems } = useCartState();

  // component states
  const [openedModal, setOpenedModal] = useState(false);
  const [cartSelection, setCartSelection] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // state connections
  const cart = useSelector((state) => state.cart_items.items);
  const post_download_in_progress = useSelector(
    (state) => state.downloadtool.post_download_in_progress,
  );
  const datasets = useSelector((state) => state.datasetsByUid.datasets.items);
  const formatConversionTable = useSelector(
    (state) => state.downloadtool.format_conversion_table_in_progress,
  );
  const projections = useSelector(
    (state) => state.downloadtool.projections_in_progress,
  );
  const nutsnames = useSelector((state) => state.nutsnames.nutsnames);

  useEffect(() => {
    dispatch(getProjections());
    dispatch(getFormatConversionTable());
  }, [dispatch]);

  useEffect(() => {
    setCartItemInProgress(post_download_in_progress['unique_ids']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_download_in_progress]);

  useEffect(() => {
    const array_ids = cart?.map((item) => item.unique_id);
    const newCart = cartItems.filter((item) =>
      array_ids.includes(item.unique_id),
    );
    setCartItems(cleanDuplicatesEntries(newCart));
    if (datasets?.length > 0 && cart.length > 0 && !newCart.length) {
      concatRequestedCartItem();
    }
  }, [cart, datasets]);

  useEffect(() => {
    if (Object.keys(nutsnames).length > 0 && cart.length > 0) {
      concatRequestedCartItem();
    }
  }, [nutsnames]);

  function concatRequestedCartItem() {
    localSessionCart.forEach((localItem) => {
      const requestedItem = datasets
        ? datasets.find((req) => req.UID === localItem.UID)
        : false;
      if (requestedItem) {
        const file_data = requestedItem?.downloadable_files?.items.find(
          (item) => item['@id'] === localItem.file_id,
        );
        if (file_data) {
          cartItems.push(
            getCartObjectFromPrepackaged(file_data, requestedItem),
          );
          setCartItems(cleanDuplicatesEntries(cartItems));
        } else {
          cartItems.push(
            getCartObjectFromMapviewer(
              localItem,
              requestedItem,
              projections,
              nutsnames,
            ),
          );
          setCartItems(cleanDuplicatesEntries(cartItems));
        }
      }
    });
  }

  const selectAllCart = (checked) => {
    if (checked) {
      setCartSelection(
        cartItems
          .filter((item) => item.task_in_progress === false)
          .map((item, key) => item.unique_id),
      );
    } else {
      setCartSelection([]);
    }
  };

  const selectCart = (id, checked) => {
    if (checked) setCartSelection(cartSelection.concat(id));
    else setCartSelection(cartSelection.filter((arr_id) => arr_id !== id));
  };

  const getSelectedCartItems = () => {
    return cartItems.filter(
      (item) => cartSelection.indexOf(item.unique_id) > -1,
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCartItemInProgress = (in_progress_unique_ids) => {
    let started_processing_items = cartItems.filter((r) =>
      in_progress_unique_ids.includes(r['unique_id']),
    );
    var items_to_remove = started_processing_items.map(
      (item) => item.unique_id,
    );
    removeCartItems(items_to_remove);
    dispatch(getDownloadtool());
  };

  const startDownloading = () => {
    setLoadingTable(true);
    window.scrollTo(0, 0);

    let selectedItems = getSelectedCartItems();
    const body = getDownloadToolPostBody(selectedItems);
    const unique_ids = selectedItems.map((item) => item.unique_id);
    dispatch(postDownloadtool(body, unique_ids))
      .then((response) => {
        setLoadingTable(false);
        toast.success(
          <Toast
            success
            autoClose={5000}
            title={'Selected file(s) added to the downloading process.'}
          />,
        );
      })
      .catch(function (error) {
        setLoadingTable(false);
        toast.error(<Toast autoClose={5000} title={'Something went wrong.'} />);
      });
  };

  const downloadModal = () => {
    let selectedItems = getSelectedCartItems();
    const hasPrepackaged =
      selectedItems.filter((item) => item.file_id).length > 0;
    const hasMapSelection =
      selectedItems.filter((item) => item.area).length > 0;
    if (!(hasMapSelection && hasPrepackaged)) {
      startDownloading();
    } else {
      setOpenedModal(true);
    }
  };

  const setProjectionValue = (unique_id, value) => {
    const objIndex = cartItems.findIndex((obj) => obj.unique_id === unique_id);
    cartItems[objIndex].projection = value;
    setCartItems([...cartItems]);
  };

  function isChecked(cartSelectionCh, cartItemsCh) {
    return cartItemsCh
      ? cartItemsCh
          .filter((item) => item.task_in_progress === false)
          .map((item, key) => item.unique_id)
          .every(function (val) {
            return cartSelectionCh.indexOf(val) !== -1;
          })
      : false;
  }

  const AreaNaming = (areaProps) => {
    const { item } = areaProps;
    console.log(item);
    switch (item.area?.type) {
      case 'polygon':
        return 'Bounding Box';
      case 'nuts':
        return 'NUTS: ' + (item.area.valueName || item.area.value);
      case undefined:
        return item.area || item.file || '-';
      case typeof item.area === 'string':
        return item.area || item.file || '-';
      default:
        return '-';
    }
  };

  const TypeNaming = (typeProps) => {
    const { item } = typeProps;
    if (item.file_id) {
      return (
        <span className={'tag tag-' + item?.type?.toLowerCase()}>
          {contentOrDash(item.type)}
        </span>
      );
    } else if (!item.type) {
      return '-';
    } else {
      let values = item.type_options.filter((myitem) => {
        return myitem['id'] === item.type;
      });
      return values.length > 0 ? values[0].name : '.';
    }
  };

  const CollectionNaming = (typeProps) => {
    const { item } = typeProps;
    if (item.file_id) {
      return (
        <span className={'tag tag-' + item?.type?.toLowerCase()}>
          {contentOrDash(item.type)}
        </span>
      );
    } else if (!item.type) {
      return '-';
    }

    return (
      <Select
        placeholder="Select type"
        value={
          item.type
            ? item.type
            : item.type_options.length > 0 && item.type_options[0].id
        }
        options={item.type_options.map((option) => {
          return {
            key: option.id,
            value: option.id,
            text: (option.collection === undefined && '-') || option.collection,
          };
        })}
        onChange={(e, data) => {
          const objIndex = cartItems.findIndex(
            (obj) => obj.unique_id === item.unique_id,
          );
          cartItems[objIndex].type = data.value;
          const dataset = datasets
            ? datasets.find((req) => req.UID === item.dataset_uid)
            : false;
          const format_item = dataset.dataset_download_information.items.find(
            (item) => item['@id'] === data.value,
          );
          cartItems[objIndex].format = format_item.full_format;
          setCartItems([...cartItems]);
        }}
      />
    );
  };

  const contentOrDash = (content) => {
    return content || '-';
  };

  return (
    <>
      {cartItems?.length !== 0 ? (
        <div className="custom-table cart-table">
          <Segment basic loading={loadingTable}>
            <h2>My cart</h2>
            <table>
              <thead>
                <tr>
                  <th className="table-th-warning"></th>
                  <th className="table-th-checkbox">
                    <div className="ccl-form">
                      <div className="ccl-form-group">
                        <Checkbox
                          onChange={(e, data) => selectAllCart(data.checked)}
                          checked={isChecked(cartSelection, cartItems)}
                        />
                      </div>
                    </div>
                  </th>
                  <th>Name</th>
                  <th>Source</th>
                  <th>Area</th>
                  <th>Type</th>
                  <th>Collection</th>
                  <th>Format</th>
                  <th>Projection</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems.map((item, key) => (
                    <tr
                      key={key}
                      style={
                        item.task_in_progress
                          ? { opacity: 0.5, backgroundColor: '#f5f5f5' }
                          : {}
                      }
                    >
                      <td className="table-td-warning hidden-warning">
                        {!!item.warning && (
                          <span
                            className="info-icon"
                            tooltip={item.warning}
                            direction="up"
                          >
                            <FontAwesomeIcon
                              icon={['fas', 'exclamation-triangle']}
                            />
                          </span>
                        )}
                      </td>
                      <td className="table-td-checkbox">
                        <div className="ccl-form">
                          <div className="ccl-form-group">
                            <Checkbox
                              onChange={(e, data) =>
                                selectCart(item.unique_id, data.checked)
                              }
                              checked={cartSelection.includes(item.unique_id)}
                              disabled={item.task_in_progress}
                            />
                          </div>
                        </div>
                      </td>
                      {item.title ? (
                        <td>
                          {item.title} ({contentOrDash(item.name)})
                        </td>
                      ) : (
                        <td>{contentOrDash(item.name)}</td>
                      )}
                      <td>{contentOrDash(item.source)}</td>
                      <td style={{ wordBreak: 'break-word' }}>
                        <AreaNaming item={item} />
                      </td>
                      <td>
                        <TypeNaming item={item} />
                      </td>
                      <td>
                        <CollectionNaming item={item} />
                      </td>
                      <td className="table-td-format">
                        {!item.file_id ? (
                          <Select
                            placeholder="Select format"
                            value={formatNaming(item)}
                            options={getAvailableConversion(
                              formatConversionTable,
                              originalFormatNaming(item),
                            )}
                            onChange={(e, data) => {
                              const objIndex = cartItems.findIndex(
                                (obj) => obj.unique_id === item.unique_id,
                              );
                              cartItems[objIndex].format = data.value;
                              setCartItems([...cartItems]);
                            }}
                          />
                        ) : (
                          formatNaming(item)
                        )}
                      </td>
                      <td className="table-td-projections">
                        {!item.file_id ? (
                          <Select
                            placeholder="Select projection"
                            value={item.projection}
                            options={projections?.map((projection) => {
                              return {
                                key: projection,
                                value: projection,
                                text: projection,
                              };
                            })}
                            onChange={(e, data) => {
                              setProjectionValue(item.unique_id, data.value);
                            }}
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>
                        {item.task_in_progress ? (
                          <FontAwesomeIcon icon="spinner" spin />
                        ) : (
                          <FontAwesomeIcon
                            icon={['fas', 'trash']}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              removeCartItem(item.unique_id);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Segment>
        </div>
      ) : (
        <h2 style={{ textAlign: 'center' }}>Empty cart</h2>
      )}
      {cartItems?.length !== 0 && (
        <CclButton
          onClick={() => downloadModal()}
          disabled={cartSelection.length === 0}
        >
          Start downloading
        </CclButton>
      )}
      <Modal
        // onClose={() => closeModal()}
        // onOpen={() => openModal()}
        open={openedModal}
        // trigger={trigger}
        className={'modal-clms'}
        size={'tiny'}
      >
        <Modal.Content>
          <div className={'modal-clms-background'}>
            <div>
              <div className={'modal-close modal-clms-close'}>
                <span
                  className="ccl-icon-close"
                  aria-label="Close"
                  onClick={() => setOpenedModal(false)}
                  onKeyDown={() => setOpenedModal(false)}
                  tabIndex="0"
                  role="button"
                ></span>
              </div>
              <p>Download processing</p>
              {'The download is going to be processed in two different files.'}
              <br />
              <br />
              <strong>Prepackaged files:</strong>
              <ul>
                {getSelectedCartItems()
                  .filter((item) => item.file_id)
                  .map((item, key) => (
                    <li key={key}>{item.name}</li>
                  ))}
              </ul>
              <br />
              <strong>Map viewer selection:</strong>
              <ul>
                {[
                  ...new Set(
                    getSelectedCartItems()
                      .filter((item) => !item.file_id)
                      .map((item) => item.name),
                  ),
                ].map((item, key) => (
                  <li key={key}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div className="modal-buttons">
            <CclButton
              mode={'filled'}
              onClick={() => {
                setOpenedModal(false);
                startDownloading();
              }}
            >
              Accept
            </CclButton>
            <CclButton onClick={() => setOpenedModal(false)}>Cancel</CclButton>
          </div>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default CLMSCartContent;
