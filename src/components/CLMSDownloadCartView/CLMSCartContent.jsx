import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Modal, Segment, Select } from 'semantic-ui-react';

import { Icon } from '@plone/volto/components';
import { Toast } from '@plone/volto/components';
import removeSVG from '@plone/volto/icons/delete.svg';
import addDocumentSVG from '@plone/volto/icons/add-document.svg';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';
import { cleanDuplicatesEntries } from '@eeacms/volto-clms-utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDownloadtool, postDownloadtool } from '../../actions';
import {
  getDownloadToolPostBody,
  formatNaming,
  originalFormatNaming,
  getCollectionByItem,
  duplicateCartItem,
  concatRequestedCartItem,
} from './cartUtils';
import { getAvailableConversion } from './conversion';
import { toast } from 'react-toastify';

import './cart-table.less';
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * CLMSCartContent container.
 * @module components/CLMSDownloadCartView/CLMSCartContent
 */

const CLMSCartContent = (props) => {
  const { localSessionCart } = props;
  const dispatch = useDispatch();
  const { removeCartItem, removeCartItems, updateCart } = useCartState();

  // state connections
  const cart = useSelector((state) => state.cart_items.items);
  const post_download_in_progress = useSelector(
    (state) => state.downloadtool.post_download_in_progress,
  );

  // component states
  const [openedModal, setOpenedModal] = useState(false);
  const [cartSelection, setCartSelection] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const datasets_items = useSelector(
    (state) => state.datasetsByUid.datasets.items,
  );
  const formatConversionTable = useSelector(
    (state) => state.downloadtool.format_conversion_table_in_progress,
  );
  const projections = useSelector(
    (state) => state.downloadtool.projections_in_progress,
  );
  const nutsnames = useSelector((state) => state.nutsnames.nutsnames);

  useEffect(() => {
    setCartItemInProgress(post_download_in_progress.unique_ids || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_download_in_progress]);

  useEffect(() => {
    const array_ids =
      cart.length > 0 ? cart?.map((item) => item.unique_id) : [];
    const newCart = cartItems.filter((item) =>
      array_ids.includes(item.unique_id),
    );
    setCartItems(cleanDuplicatesEntries(newCart));
    if (
      datasets_items?.length > 0 &&
      cart.length > 0 &&
      cart.length !== newCart.length
    ) {
      concatRequestedCartItem(
        cartItems,
        setCartItems,
        localSessionCart,
        datasets_items,
        projections,
        nutsnames,
      );
    }
  }, [cart, datasets_items]);

  const selectAllCart = (checked) => {
    if (checked && cartItems.length > 0) {
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
    let started_processing_items =
      cartItems.length > 0
        ? cartItems.filter((r) =>
            in_progress_unique_ids.includes(r['unique_id']),
          )
        : [];
    var items_to_remove =
      started_processing_items.length > 0
        ? started_processing_items.map((item) => item.unique_id)
        : [];
    removeCartItems(items_to_remove);
    dispatch(getDownloadtool());
  };

  const startDownloading = () => {
    setLoadingTable(true);
    window.scrollTo(0, 0);

    let selectedItems = getSelectedCartItems();
    const body = getDownloadToolPostBody(selectedItems);
    const unique_ids =
      selectedItems.length > 0
        ? selectedItems.map((item) => item.unique_id)
        : [];
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
      selectedItems.filter((item) => !item.file_id).length > 0;
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
    return cartItemsCh.length > 0
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
    switch (item.area?.type) {
      case 'polygon':
        return (
          <>
            <span>Bounding Box</span>
            <br />
            <span>
              {'('} {item.area.value.map((item) => item.toFixed(3)).join(', ')}
              {')'}
            </span>
          </>
        );
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

  const TypeNaming = ({ item }) => {
    const types_options =
      item?.type_options?.length > 0
        ? [...new Set(item.type_options.map((ddi) => ddi.name))]
        : [];
    if (item.file_id) {
      return (
        <span className={'tag tag-' + item?.type?.toLowerCase()}>
          {contentOrDash(item.type)}
        </span>
      );
    } else if (!item.type) {
      return '-';
    } else {
      let defaultType = getCollectionByItem(item);
      return types_options.length > 1 ? (
        <Select
          placeholder="Select type"
          value={defaultType.name}
          options={
            types_options.length > 0
              ? types_options.map((option) => {
                  return {
                    key: option,
                    value: option,
                    text: option,
                  };
                })
              : []
          }
          onChange={(e, data) => {
            const new_cartItems = [...cartItems];
            const objIndex = new_cartItems.findIndex(
              (obj) => obj.unique_id === item.unique_id,
            );
            const first_type_id = item.type_options.filter(
              (t_o) => t_o.name === data.value,
            )[0].id;
            new_cartItems[objIndex].type = first_type_id;
            const dataset = datasets_items
              ? datasets_items.find((req) => req.UID === item.dataset_uid)
              : false;
            const format_item = dataset.dataset_download_information.items.find(
              (item) => item['@id'] === first_type_id,
            );
            new_cartItems[objIndex].format = format_item.full_format;
            setCartItems([...new_cartItems]);
          }}
        />
      ) : (
        defaultType.name
      );
    }
  };

  const CollectionNaming = ({ item }) => {
    if (item.file_id) {
      return '-';
    } else if (!item.type) {
      return '-';
    }
    const this_type_collections = item?.type_options.filter(
      (o) =>
        o.name === item?.type_options.find((t_o) => t_o.id === item.type).name,
    );
    return this_type_collections.length > 1 ? (
      <Select
        placeholder="Select type"
        value={
          item.type
            ? item.type
            : item.type_options.length > 0 && item.type_options[0].id
        }
        options={
          item?.type_options?.length > 0 &&
          this_type_collections.map((option) => {
            return {
              key: option.id,
              value: option.id,
              text: option.collection ?? '-',
            };
          })
        }
        onChange={(e, data) => {
          const new_cartItems = [...cartItems];
          const objIndex = new_cartItems.findIndex(
            (obj) => obj.unique_id === item.unique_id,
          );
          new_cartItems[objIndex].type = data.value;
          const dataset = datasets_items
            ? datasets_items.find((req) => req.UID === item.dataset_uid)
            : false;
          const format_item = dataset.dataset_download_information.items.find(
            (item) => item['@id'] === data.value,
          );
          new_cartItems[objIndex].format = format_item.full_format;
          setCartItems([...new_cartItems]);
        }}
      />
    ) : (
      getCollectionByItem(item).collection ?? '-'
    );
  };
  const FormatNaming = ({ item, formatConversionTable }) => {
    const format_options = getAvailableConversion(
      formatConversionTable,
      originalFormatNaming(item),
    );
    const item_format_name = formatNaming(item);
    return !item.file_id ? (
      format_options.length > 1 ? (
        <Select
          placeholder="Select format"
          value={item_format_name}
          options={format_options}
          onChange={(e, data) => {
            const objIndex = cartItems.findIndex(
              (obj) => obj.unique_id === item.unique_id,
            );
            cartItems[objIndex].format = data.value;
            setCartItems([...cartItems]);
          }}
        />
      ) : (
        item_format_name
      )
    ) : (
      item_format_name
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 &&
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
                      {/* {item.title ? (
                        <td>
                          {item.title} ({contentOrDash(item.name)})
                        </td>
                      ) : ( */}
                      <td>{contentOrDash(item.name)}</td>
                      {/* )} */}
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
                        {formatConversionTable && item && (
                          <FormatNaming
                            item={item}
                            formatConversionTable={formatConversionTable}
                          />
                        )}
                      </td>
                      <td className="table-td-projections">
                        {!item.file_id ? (
                          <Select
                            placeholder="Select projection"
                            value={item.projection}
                            options={
                              projections.length > 0 &&
                              projections?.map((projection) => {
                                return {
                                  key: projection,
                                  value: projection,
                                  text: projection,
                                };
                              })
                            }
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
                        ) : !item.file_id ? (
                          <span
                            className="info-icon"
                            tooltip="Add a duplicated row below"
                            direction="up"
                          >
                            <button
                              onClick={() => {
                                duplicateCartItem(
                                  item.unique_id,
                                  cartItems,
                                  setCartItems,
                                  updateCart,
                                );
                              }}
                              style={{
                                backgroundColor: 'transparent',
                                color: 'inherit',
                                border: 'none',
                                padding: 0,
                                font: 'inherit',
                                cursor: 'pointer',
                                outline: 'inherit',
                              }}
                            >
                              <Icon name={addDocumentSVG} size={25} />
                            </button>
                          </span>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td>
                        {item.task_in_progress ? (
                          <FontAwesomeIcon icon="spinner" spin />
                        ) : (
                          <span
                            className="info-icon"
                            tooltip="Remove this row from the cart"
                            direction="up"
                          >
                            <button
                              onClick={() => {
                                removeCartItem(item.unique_id);
                              }}
                              style={{
                                backgroundColor: 'transparent',
                                color: 'inherit',
                                border: 'none',
                                padding: 0,
                                font: 'inherit',
                                cursor: 'pointer',
                                outline: 'inherit',
                              }}
                            >
                              <Icon
                                name={removeSVG}
                                size={25}
                                color="#e40166"
                              />
                            </button>
                          </span>
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
              {
                'Data download will be made available in separate files for pre-packaged files and custom data selection.'
              }
              <br />
              <br />
              <strong>Selected pre-packaged files from:</strong>
              <ul>
                {[
                  ...new Set(
                    getSelectedCartItems()
                      .filter((item) => item.file_id)
                      .map((item) => item.name),
                  ),
                ]
                  .sort()
                  .map((item, key) => (
                    <li key={key}>{item}</li>
                  ))}
              </ul>
              <br />
              <strong>Custom data selection from:</strong>
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
