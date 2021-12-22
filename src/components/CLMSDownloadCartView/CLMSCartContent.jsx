/* eslint-disable react-hooks/exhaustive-deps */
/**
 * CLMSCartContent container.
 * @module components/CLMSDownloadCartView/CLMSCartContent
 */

import React, { useEffect, useState } from 'react';
import {
  getCartObjectFromMapviewer,
  getCartObjectFromPrepackaged,
  getDownloadToolPostBody,
} from './cartUtils';
import {
  getDatasetsByUid,
  getDownloadtool,
  getFormatConversionTable,
  getProjections,
  postDownloadtool,
} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import { CART_SESSION_KEY } from '@eeacms/volto-clms-utils/cart/useCartState';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { Checkbox } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select } from 'semantic-ui-react';
import { cleanDuplicatesEntries } from '@eeacms/volto-clms-utils/utils';
import { getAvailableConversion } from './conversion';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';

const CLMSCartContent = (props) => {
  const dispatch = useDispatch();
  const { cart, removeCartItem } = useCartState();
  const [cartSelection, setCartSelection] = useState([]);
  const post_download_in_progress = useSelector(
    (state) => state.downloadtool.post_download_in_progress,
  );
  const user_id = useSelector((state) => state.users.user.id);
  const datasets = useSelector((state) => state.datasetsByUid.datasets.items);
  const formatConversionTable = useSelector(
    (state) => state.downloadtool.format_conversion_table_in_progress,
  );
  const projections = useSelector(
    (state) => state.downloadtool.projections_in_progress,
  );

  const [cartItems, setCartItems] = useState([]);
  const [localSessionCart, setLocalSessionCart] = useState([]);

  useEffect(() => {
    dispatch(getProjections());
    dispatch(getFormatConversionTable());
  }, [dispatch]);

  useEffect(() => {
    const CART_SESSION_USER_KEY = CART_SESSION_KEY.concat(`_${user_id}`);
    setLocalSessionCart(
      JSON.parse(localStorage.getItem(CART_SESSION_USER_KEY)) || [],
    );
  }, [user_id]);

  useEffect(() => {
    if (localSessionCart?.length !== 0) {
      const uidsList = [
        ...new Set(localSessionCart.map((item) => item.UID || item.id)),
      ];
      dispatch(getDatasetsByUid(uidsList));
    }
  }, [localSessionCart, dispatch]);

  useEffect(() => {
    if (datasets?.length > 0) {
      concatRequestedCartItem();
    }
  }, [datasets]);

  function concatRequestedCartItem() {
    localSessionCart.forEach((localItem) => {
      const requestedItem = datasets.find(
        (requestedItem) => requestedItem.UID === localItem.UID,
      );
      if (requestedItem) {
        const file_data = requestedItem?.downloadable_files?.items.find(
          (item) => item['@id'] === localItem.file_id,
        );
        if (file_data) {
          cartItems.push(
            getCartObjectFromPrepackaged(file_data, requestedItem),
          );
          setCartItems(cleanDuplicatesEntries(cartItems));
        } else if (localItem.area) {
          cartItems.push(getCartObjectFromMapviewer(localItem, requestedItem));
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
    started_processing_items.forEach((item) => {
      if (item['unique_id']) {
        removeCartItem(item['unique_id'], user_id);
        dispatch(getFormatConversionTable());
        dispatch(getDownloadtool());
      }
    });
  };

  useEffect(() => {
    setCartItemInProgress(post_download_in_progress['unique_ids']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_download_in_progress]);

  useEffect(() => {
    const array_ids = cart?.map((item) => item.unique_id);
    const newCart = cartItems.filter((item) =>
      array_ids.includes(item.unique_id),
    );
    setCartItems(newCart);
  }, [cart]);

  function startDownloading() {
    let selectedItems = getSelectedCartItems();
    const body = getDownloadToolPostBody(selectedItems);
    const unique_ids = selectedItems.map((item) => item.unique_id);
    dispatch(postDownloadtool(body, unique_ids));
  }
  const setProjectionValue = (unique_id, value) => {
    const objIndex = cartItems.findIndex((obj) => obj.unique_id === unique_id);
    cartItems[objIndex].projection = value;
    setCartItems([...cartItems]);
  };
  return (
    <>
      {localSessionCart?.length !== 0 ? (
        <div className="custom-table cart-table">
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
                        checked={
                          cartItems
                            ? cartItems
                                .filter(
                                  (item) => item.task_in_progress === false,
                                )
                                .map((item, key) => item.unique_id)
                                .every(function (val) {
                                  return cartSelection.indexOf(val) !== -1;
                                })
                            : false
                        }
                      />
                    </div>
                  </div>
                </th>
                <th>Name</th>
                <th>Source</th>
                <th>Area</th>
                {/* <th>Year</th>
                <th>Resolution</th> */}
                <th>Type</th>
                <th>Format</th>
                <th>Projection</th>
                <th>Version</th>
                <th>Size</th>
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
                    <td>{item.name || '-'}</td>
                    <td>{item.source || '-'}</td>
                    <td>{item.area.type || '-'}</td>
                    {/* <td>{item.year || '-'}</td>
                    <td>{item.resolution || '-'}</td> */}
                    <td>
                      <span className={'tag tag-' + item?.type?.toLowerCase()}>
                        {item.type || '-'}
                      </span>
                    </td>
                    <td className="table-td-format">
                      {!item.file_id ? (
                        <Select
                          placeholder="Select format"
                          value={item.format?.token || item.format}
                          options={getAvailableConversion(
                            formatConversionTable,
                            item.format?.token || item.format,
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
                        item.format?.token || item.format
                      )}
                    </td>
                    <td className="table-td-projections">
                      {!item.file_id ? (
                        <Select
                          placeholder="Select projection"
                          value={
                            item.projection ||
                            setProjectionValue(item.unique_id, projections[0])
                          }
                          options={projections.map((item) => {
                            return {
                              key: item,
                              value: item,
                              text: item,
                            };
                          })}
                          onChange={(e, data) => {
                            setProjectionValue(item.unique_id, data.value);
                          }}
                        />
                      ) : (
                        item.projection
                      )}
                    </td>
                    <td>{item.version}</td>
                    <td>{item.size}</td>
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
        </div>
      ) : (
        <h2 style={{ textAlign: 'center' }}>Empty cart</h2>
      )}
      {localSessionCart?.length !== 0 && (
        <CclButton
          onClick={() => startDownloading()}
          disabled={cartSelection.length === 0}
        >
          Start downloading
        </CclButton>
      )}
    </>
  );
};

export default CLMSCartContent;
