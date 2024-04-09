import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Checkbox,
  Modal,
  Segment,
  Select,
  Table,
  Pagination,
  Popup,
} from 'semantic-ui-react';

import { Icon } from '@plone/volto/components';
import { Toast } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import addDocumentSVG from '@plone/volto/icons/add-document.svg';
import removeSVG from '@plone/volto/icons/delete.svg';
import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';
import { cleanDuplicatesEntries } from '@eeacms/volto-clms-utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDownloadtool, postDownloadtool } from '../../actions';
import { useFilteredPagination } from '../CclUtils/useFilteredPagination';
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

import { getProjectionsUID } from '../../actions';

/* eslint-disable react-hooks/exhaustive-deps */
/**
 * CLMSCartContent container.
 * @module components/CLMSDownloadCartView/CLMSCartContent
 */
const CLMSCartContent = (props) => {
  const { localSessionCart, getNutsIDList } = props;
  const dispatch = useDispatch();
  const { removeCartItem, removeCartItems, updateCart } = useCartState();

  // state connections
  const cart = useSelector((state) => state.cart_items.items);
  const post_download_in_progress = useSelector(
    (state) => state.downloadtool.post_download_in_progress,
  );
  const downloadtool_state = useSelector((state) => state.downloadtool);
  const datasetTimeseries = useSelector((state) => state.datasetTimeseries);
  const datasets_items = useSelector(
    (state) => state.datasetsByUid.datasets.items,
  );
  const formatConversionTable = useSelector(
    (state) => state.downloadtool.format_conversion_table_in_progress,
  );
  const projections = useSelector(
    (state) => state.downloadtool.projections_in_progress,
  );

  const projections_uid = useSelector(
    (state) => state.downloadtool.projections_in_progress_uid,
  );

  const nutsnames = useSelector((state) => state.nutsnames);

  // component states
  const [openedModal, setOpenedModal] = useState(false);
  const [cartSelection, setCartSelection] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItemInProgress(post_download_in_progress.unique_ids || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_download_in_progress]);

  const use_p = useFilteredPagination(cartItems, 10, 'cart');
  const p_f = use_p.functions;
  const p_data = use_p.data;
  const { pagination, currentPage, paginationSize, dataList } = p_data;

  useEffect(() => {
    p_f.setOriginalDataList(cartItems);
  }, [cartItems]);

  const nutsnamesDeepCompare = JSON.stringify(nutsnames.nutsnames);
  useEffect(() => {
    const array_ids =
      cart.length > 0 ? cart?.map((item) => item?.unique_id) : [];
    const newCart = cartItems.filter((item) =>
      array_ids.includes(item?.unique_id),
    );

    let localsessionNutsIDList = [...new Set(getNutsIDList(cart))];

    if (
      datasets_items?.length > 0 &&
      cart.length > 0 &&
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
    } else {
      setCartItems(cleanDuplicatesEntries(newCart));
    }

    datasets_items &&
      datasets_items.map((item) => dispatch(getProjectionsUID(item.UID)));
  }, [cart, datasets_items, nutsnamesDeepCompare]);

  const selectAllCart = (checked) => {
    if (checked && cartItems.length > 0) {
      setCartSelection(
        cartItems
          .filter((item) => item?.task_in_progress === false)
          .map((item, key) => item?.unique_id),
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
      (item) => cartSelection.indexOf(item?.unique_id) > -1,
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
  }, [downloadtool_state.requested, downloadtool_state.error]);

  const startDownloading = () => {
    setLoadingTable(true);
    window.scrollTo(0, 0);

    let selectedItems = getSelectedCartItems();
    const body = getDownloadToolPostBody(selectedItems);
    const unique_ids =
      selectedItems.length > 0
        ? selectedItems.map((item) => item?.unique_id)
        : [];
    dispatch(postDownloadtool(body, unique_ids));
    removeCartItem(unique_ids);
  };

  const downloadModal = () => {
    let selectedItems = getSelectedCartItems();
    const hasPrepackaged =
      selectedItems.filter((item) => item?.file_id).length > 0;
    const hasMapSelection =
      selectedItems.filter((item) => !item?.file_id).length > 0;
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

  const ref = React.useRef();

  const handleScroll = (ref) => {
    ref.scrollIntoView({ behavior: 'smooth' });
  };

  const { tooManyInQueue, howManyInQueue, maxInQueue } = props;

  const tooManySelected = () => {
    let selectedItems = getSelectedCartItems();
    const hasPrepackaged =
      selectedItems.filter((item) => item?.file_id).length > 0;
    const hasMapSelection =
      selectedItems.filter((item) => !item?.file_id).length > 0;
    let count = 0;
    if (hasPrepackaged) {
      count = count + 1;
    }
    if (hasMapSelection) {
      count = count + 1;
    }

    return howManyInQueue + count > maxInQueue;
  };

  return (
    <>
      {pagination?.length !== 0 ? (
        <div ref={ref} className="custom-table cart-table">
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
                  <Table.HeaderCell>
                    Projection{' '}
                    <UniversalLink href="/en/faq/download/how-to-find-your-epsg-code">
                      <Popup
                        content="Explore EPSG details and coordinate systems with a click."
                        trigger={
                          <FontAwesomeIcon icon={['far', 'question-circle']} />
                        }
                      />
                    </UniversalLink>
                  </Table.HeaderCell>
                  <Table.HeaderCell>Timeseries</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <tbody>
                {pagination.length > 0 &&
                  pagination.map((item, key) => (
                    <tr
                      key={key}
                      style={
                        item?.task_in_progress
                          ? { opacity: 0.5, backgroundColor: '#f5f5f5' }
                          : {}
                      }
                    >
                      <td className="table-td-warning hidden-warning">
                        {!!item?.warning && (
                          <span
                            className="info-icon"
                            tooltip={item?.warning}
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
                                selectCart(item?.unique_id, data.checked)
                              }
                              checked={cartSelection.includes(item?.unique_id)}
                              disabled={item?.task_in_progress}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="mb-2">
                          <strong>Name: </strong>
                          {contentOrDash(item?.name)}
                        </div>
                        <div className="mb-2">
                          <strong>Source: </strong>
                          {contentOrDash(item?.source)}
                        </div>
                        <div className="mb-2 cart-area">
                          <strong className="cart-area-text">Area: </strong>
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
                          <strong>Format: </strong>{' '}
                          <UniversalLink href="/en/faq/download/need-information-about-the-file-formats">
                            <Popup
                              content="Explore Formats details with a click."
                              trigger={
                                <FontAwesomeIcon
                                  color="#000000"
                                  icon={['far', 'question-circle']}
                                />
                              }
                            />
                          </UniversalLink>
                        </div>
                        {item?.layer !== null && (
                          <div className="mb-2">
                            <strong>Layer/Band: </strong>
                          </div>
                        )}
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
                        {item?.layer !== null && (
                          <div className="mb-2">
                            <LayerNaming
                              item={item}
                              cartItems={cartItems}
                              setCartItems={setCartItems}
                            />
                          </div>
                        )}
                      </td>
                      <td className="table-td-projections">
                        {!item?.file_id ? (
                          <Select
                            placeholder="Select projection"
                            value={item?.original_projection.split('/')[0]}
                            options={
                              projections_uid?.[item.dataset_uid] &&
                              projections_uid[item.dataset_uid].length > 0 &&
                              projections_uid[item.dataset_uid]
                                ?.sort((a, b) => {
                                  if (
                                    Number(a.split(':')[1]) >
                                    Number(b.split(':')[1])
                                  ) {
                                    return 1;
                                  } else {
                                    return -1;
                                  }
                                })
                                ?.map((projection) => {
                                  const re = new RegExp(
                                    projection.split(':')[1],
                                  );
                                  return {
                                    key: projection,
                                    value: projection,
                                    text: re.test(item.original_projection)
                                      ? `${projection} (Source system of the dataset)`
                                      : projection,
                                    className: re.test(item.original_projection)
                                      ? 'original_projection'
                                      : 'projection',
                                  };
                                })
                            }
                            onChange={(e, data) => {
                              setProjectionValue(item?.unique_id, data.value);
                            }}
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="table-td-timeseries">
                        {datasetTimeseries.datasets[item?.dataset_uid]
                          ?.start ? (
                          <TimeseriesPicker
                            start={
                              datasetTimeseries.datasets[item?.dataset_uid]
                                .start
                            }
                            end={
                              datasetTimeseries.datasets[item?.dataset_uid].end
                            }
                            period={
                              datasetTimeseries.datasets[item?.dataset_uid]
                                .period
                            }
                            download_limit_temporal_extent={
                              datasetTimeseries.datasets[item?.dataset_uid]
                                .download_limit_temporal_extent
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
                          {item?.task_in_progress ? (
                            <FontAwesomeIcon icon="spinner" spin />
                          ) : !item?.file_id ? (
                            <span
                              className="info-icon"
                              tooltip="Add a duplicated row below"
                              direction="up"
                            >
                              <button
                                onClick={() => {
                                  duplicateCartItem(
                                    item?.unique_id,
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

                          {item?.task_in_progress ? (
                            <FontAwesomeIcon icon="spinner" spin />
                          ) : (
                            <span
                              className="info-icon"
                              tooltip="Remove this row from the cart"
                              direction="up"
                            >
                              <button
                                onClick={() => {
                                  removeCartItem(item?.unique_id);
                                  if (
                                    pagination.length === 1 &&
                                    currentPage > 1
                                  ) {
                                    p_f.setCurrentPage(currentPage - 1);
                                  }
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
          {dataList.length / paginationSize > 1 && (
            <div className="pagination-wrapper">
              <Pagination
                activePage={currentPage}
                totalPages={Math.ceil(dataList.length / paginationSize)}
                onPageChange={(e, { activePage }) => {
                  if (ref.current) handleScroll(ref.current);
                  p_f.setCurrentPage(activePage);
                }}
                firstItem={null}
                lastItem={null}
                prevItem={{
                  content: <Icon name={paginationLeftSVG} size="18px" />,
                  icon: true,
                  'aria-disabled': currentPage === 1,
                  className: currentPage === 1 ? 'disabled' : null,
                }}
                nextItem={{
                  content: <Icon name={paginationRightSVG} size="18px" />,
                  icon: true,
                  'aria-disabled':
                    currentPage === Math.ceil(dataList.length / paginationSize),
                  className:
                    currentPage === Math.ceil(dataList.length / paginationSize)
                      ? 'disabled'
                      : null,
                }}
              ></Pagination>
            </div>
          )}
        </div>
      ) : (
        <h2 style={{ textAlign: 'center' }}>Empty cart</h2>
      )}
      {pagination?.length !== 0 && (
        <>
          {tooManyInQueue && (
            <strong>
              You have {maxInQueue} items in the download queue. Wait until the
              queue is reduced before requesting more.
            </strong>
          )}
          {tooManySelected() && (
            <strong>
              With the selection that you have made, you will have {maxInQueue}{' '}
              or more items in the download queue. Please change your selection
              in order to request a download.
            </strong>
          )}
          <CclButton
            onClick={() => downloadModal()}
            disabled={
              cartSelection.length === 0 || tooManyInQueue || tooManySelected()
            }
          >
            Process download request
          </CclButton>
        </>
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
                      .filter((item) => item?.file_id)
                      .map((item) => item?.name),
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
                      .filter((item) => !item?.file_id)
                      .map((item) => item?.name),
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
