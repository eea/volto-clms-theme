import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Checkbox, Modal, Segment, Select, Table } from 'semantic-ui-react';

import { Icon } from '@plone/volto/components';
import { Toast } from '@plone/volto/components';
import addDocumentSVG from '@plone/volto/icons/add-document.svg';
import removeSVG from '@plone/volto/icons/delete.svg';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';
import { cleanDuplicatesEntries } from '@eeacms/volto-clms-utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDownloadtool, postDownloadtool } from '../../actions';
import './cart-table.less';
import {
  getDownloadToolPostBody,
  duplicateCartItem,
  concatRequestedCartItem,
  isChecked,
  contentOrDash,
} from './cartUtils';
import {
  TypeNaming,
  AreaNaming,
  CollectionNaming,
  FormatNaming,
  LayerNaming,
  TimeseriesPicker,
} from '.';

/* eslint-disable react-hooks/exhaustive-deps */
/**
 * CLMSCartContent container.
 * @module components/CLMSDownloadCartView/CLMSCartContent
 */
const CLMSCartContent = (props) => {
  const { localSessionCart, getNutsIDList } = props;
  const dispatch = useDispatch();
  const { removeCartItem, /* removeCartItems, */ updateCart } = useCartState();

  // state connections
  const cart = useSelector((state) => state.cart_items.items);
  const post_download_in_progress = useSelector(
    (state) => state.downloadtool.post_download_in_progress,
  );
  const downloadtool_state = useSelector((state) => state.downloadtool);
  const datasetTimeseries = useSelector((state) => state.datasetTimeseries);

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
  const nutsnames = useSelector((state) => state.nutsnames);
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
    let localsessionNutsIDList = [...new Set(getNutsIDList(cart))];

    if (
      datasets_items?.length > 0 &&
      cart.length > 0 &&
      cart.length !== newCart.length &&
      ((localsessionNutsIDList.length > 0 && nutsnames.loaded) ||
        !nutsnames.loading)
    ) {
      concatRequestedCartItem(
        cartItems,
        setCartItems,
        localSessionCart,
        datasets_items,
        projections,
        nutsnames.nutsnames,
      );
    }
  }, [cart, datasets_items, nutsnames]);

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
    // let started_processing_items =
    //   cartItems.length > 0
    //     ? cartItems.filter((r) =>
    //         in_progress_unique_ids.includes(r['unique_id']),
    //       )
    //     : [];
    // var items_to_remove =
    //   started_processing_items.length > 0
    //     ? started_processing_items.map((item) => item.unique_id)
    //     : [];
    // removeCartItems(items_to_remove);
    dispatch(getDownloadtool());
  };

  useEffect(() => {
    if (
      downloadtool_state?.requested &&
      downloadtool_state?.loaded &&
      !downloadtool_state?.loading
    ) {
      setLoadingTable(false);
      toast.success(
        <Toast
          success
          autoClose={5000}
          title={'Downloading process started'}
          content={'Selected file(s) added to the downloading process.'}
        />,
      );
    }
    if (downloadtool_state?.error) {
      setLoadingTable(false);
      toast.error(
        <Toast
          autoClose={5000}
          title={'Something went wrong.'}
          content={downloadtool_state?.error?.response?.body?.msg}
        />,
      );
    }
  }, [downloadtool_state]);

  const startDownloading = () => {
    setLoadingTable(true);
    window.scrollTo(0, 0);

    let selectedItems = getSelectedCartItems();
    const body = getDownloadToolPostBody(selectedItems);
    const unique_ids =
      selectedItems.length > 0
        ? selectedItems.map((item) => item.unique_id)
        : [];
    dispatch(postDownloadtool(body, unique_ids));
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

  const setTimeseriesValue = (unique_id, value) => {
    const objIndex = cartItems.findIndex((obj) => obj.unique_id === unique_id);
    cartItems[objIndex].TemporalFilter = value;
    setCartItems([...cartItems]);
  };

  return (
    <>
      {cartItems?.length !== 0 ? (
        <div className="custom-table cart-table">
          <Segment basic loading={loadingTable}>
            <h2>My cart</h2>
            <Table responsive>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className="table-th-warning"></Table.HeaderCell>
                  <Table.HeaderCell className="table-th-checkbox">
                    <div className="ccl-form">
                      <div className="ccl-form-group">
                        <Checkbox
                          onChange={(e, data) => selectAllCart(data.checked)}
                          checked={isChecked(cartSelection, cartItems)}
                        />
                      </div>
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell width={5}>Static info</Table.HeaderCell>
                  <Table.HeaderCell>Configurable</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Projection</Table.HeaderCell>
                  <Table.HeaderCell>Timeseries</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
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
                      <td>
                        <div className="mb-2">
                          <strong>Name: </strong>
                          {contentOrDash(item.name)}
                        </div>
                        <div className="mb-2">
                          <strong>Source: </strong>
                          {contentOrDash(item.source)}
                        </div>
                        <div className="mb-2">
                          <strong>Area: </strong>
                          <AreaNaming item={item} />
                        </div>

                        {/* <td style={{ wordBreak: 'break-word' }}> */}
                      </td>
                      <td>
                        <div className="mb-2">
                          <strong>Type: </strong>
                        </div>
                        <div className="mb-2">
                          <strong>Collection: </strong>
                        </div>
                        <div className="mb-2">
                          <strong>Format: </strong>
                        </div>
                        <div className="mb-2">
                          <strong>Layer/Band: </strong>
                        </div>
                      </td>
                      <td>
                        <div className="mb-2">
                          <TypeNaming
                            item={item}
                            datasets_items={datasets_items}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                          />
                        </div>
                        <div className="mb-2">
                          <CollectionNaming
                            item={item}
                            datasets_items={datasets_items}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                          />
                        </div>
                        <div className="mb-2">
                          {formatConversionTable && item && (
                            <FormatNaming
                              item={item}
                              cartItems={cartItems}
                              setCartItems={setCartItems}
                              formatConversionTable={formatConversionTable}
                            />
                          )}
                        </div>
                        <div className="mb-2">
                          <LayerNaming
                            item={item}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                          />
                        </div>
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
                        {datasetTimeseries.datasets[item.dataset_uid]?.start ? (
                          <TimeseriesPicker
                            start={
                              datasetTimeseries.datasets[item.dataset_uid].start
                            }
                            end={
                              datasetTimeseries.datasets[item.dataset_uid].end
                            }
                            period={
                              datasetTimeseries.datasets[item.dataset_uid]
                                .period
                            }
                            item={item}
                            setTimeseriesValue={setTimeseriesValue}
                          />
                        ) : (
                          <>-</>
                        )}
                      </td>
                      <td className="text-end">
                        <div style={{ display: 'flex' }}>
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
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
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
