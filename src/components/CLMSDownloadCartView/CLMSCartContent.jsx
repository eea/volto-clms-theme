/* eslint-disable react-hooks/exhaustive-deps */
/**
 * CLMSCartContent container.
 * @module components/CLMSDownloadCartView/CLMSCartContent
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox } from 'semantic-ui-react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import {
  postDownloadtool,
  getDownloadtool,
  getFormatConversionTable,
  getProjections,
} from '../../actions';
import { searchContent } from '@plone/volto/actions';
import { Select } from 'semantic-ui-react';

import { CART_SESSION_KEY } from '@eeacms/volto-clms-utils/cart/useCartState';
import { cleanDuplicatesEntries } from '@eeacms/volto-clms-utils/utils';
import {
  getAvailableConversion,
  initializeIfNotCompatibleConversion,
} from './conversion';

const CLMSCartContent = (props) => {
  const dispatch = useDispatch();
  const { cart, removeCartItem } = useCartState();
  const [cartSelection, setCartSelection] = useState([]);
  const post_download_in_progress = useSelector(
    (state) => state.downloadtool.post_download_in_progress,
  );
  const user_id = useSelector((state) => state.users.user.id);
  const requested_card_items = useSelector((state) => state.search.items[0]);
  const formatConversionTable = useSelector(
    (state) => state.downloadtool.format_conversion_table_in_progress,
  );

  const [cartItems, setCartItems] = useState([]);
  const [localSessionCart, setLocalSessionCart] = useState([]);

  useEffect(() => dispatch(getProjections()), []);

  const projections = useSelector(
    (state) => state.downloadtool.projections_in_progress,
  );

  useEffect(() => dispatch(getFormatConversionTable()), []);

  useEffect(() => {
    const CART_SESSION_USER_KEY = CART_SESSION_KEY.concat(`_${user_id}`);
    setLocalSessionCart(
      JSON.parse(localStorage.getItem(CART_SESSION_USER_KEY)) || [],
    );
  }, [user_id]);

  useEffect(() => {
    if (localSessionCart?.length !== 0) {
      localSessionCart.forEach((item) => {
        dispatch(
          searchContent('', {
            portal_type: 'DataSet',
            UID: item.UID || item.id,
            fullobjects: true,
            // metadata_fields: '_all',
            // metadata_fields: 'downloadable_files',
            // metadata_fields: 'UID'
          }),
        );
      });
    }
  }, [localSessionCart, dispatch]);

  useEffect(() => {
    if (requested_card_items?.downloadable_files?.items.length > 0) {
      concatRequestedCartItem();
    }
  }, [requested_card_items]);

  function concatRequestedCartItem() {
    const local_cart_file_ids = localSessionCart.map((item) => item.file_id);
    local_cart_file_ids.forEach((file_id) => {
      const file_data = requested_card_items.downloadable_files.items.find(
        (item) => item['@id'] === file_id,
      );

      if (file_data) {
        cartItems.push({
          name: requested_card_items.title,
          area: file_data.area,
          format: file_data.format,
          resolution: file_data.resolution,
          size: file_data.size,
          source: file_data.source,
          type: file_data.type,
          version: file_data.version,
          year: file_data.year,
          file_id: file_id,
          unique_id:
            `${requested_card_items.UID}_${file_id}` || 'id_from_map_viewer',
          dataset_uid: requested_card_items.UID,
          task_in_progress: false,
        });
        setCartItems(cleanDuplicatesEntries(cartItems));
      }
    });

    const local_cart_mapviewer_items = localSessionCart.filter(
      (item) => item.area !== undefined,
    );
    local_cart_mapviewer_items.forEach((item) => {
      if (requested_card_items['UID'] === item.id) {
        cartItems.push({
          name: requested_card_items.dataResourceTitle,
          area: item.area,
          format: requested_card_items.dataset_full_format,
          resolution: requested_card_items.resolution,
          size: requested_card_items.size,
          source: requested_card_items.dataset_full_source,
          type: requested_card_items.dataResourceType,
          version: requested_card_items.version,
          year: requested_card_items.year,
          id: item.id,
          unique_id:
            `${requested_card_items.UID}_${'file_id'}` || 'id_from_map_viewer',
          dataset_uid: requested_card_items.UID,
          task_in_progress: false,
        });
        setCartItems(cleanDuplicatesEntries(cartItems));
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
    // console.log('post_download_in_progress', post_download_in_progress);
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
    const DatasetList = selectedItems.map((item) => {
      return {
        DatasetID: item.dataset_uid,
        OutputFormat: item.format,
        // OutputGCS: item.version,
        ...{ FileID: item.file_id && item.file_id },
        ...{ Area: item.area && item.area },
        // FileID: item.file_id,
      };
    });

    const body = {
      Datasets: DatasetList,
    };
    const unique_ids = selectedItems.map((item) => item.unique_id);
    dispatch(postDownloadtool(body, unique_ids));
  }

  return (
    <>
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
                              .filter((item) => item.task_in_progress === false)
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
              <th>Year</th>
              <th>Resolution</th>
              <th>Type</th>
              <th>Format</th>
              <th>Projections</th>
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
                  <td>{item.name}</td>
                  <td>{item.source}</td>
                  <td>{item.area}</td>
                  <td>{item.year}</td>
                  <td>{item.resolution}</td>
                  <td>
                    <span className={'tag tag-' + item?.type?.toLowerCase()}>
                      {item.type}
                    </span>
                  </td>
                  <td className="table-td-format">
                    <Select
                      value={initializeIfNotCompatibleConversion(
                        formatConversionTable,
                        item.format,
                      )}
                      options={getAvailableConversion(
                        formatConversionTable,
                        item.format,
                      )}
                      onChange={(e, data) => {
                        const objIndex = cartItems.findIndex(
                          (obj) => obj.unique_id === item.unique_id,
                        );
                        cartItems[objIndex].format = data.value;
                        setCartItems([...cartItems]);
                      }}
                    />
                  </td>
                  <td className="table-td-projections">
                    <Select
                      value={item.projection || projections[0]}
                      options={projections.map((item) => {
                        return {
                          key: item,
                          value: item,
                          text: item,
                        };
                      })}
                      onChange={(e, data) => {
                        const objIndex = cartItems.findIndex(
                          (obj) => obj.unique_id === item.unique_id,
                        );
                        cartItems[objIndex].projection = data.value;
                        setCartItems([...cartItems]);
                      }}
                    />
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
            {localSessionCart?.length === 0 && (
              <>
                <tr>
                  <td
                    colSpan={11}
                    style={{
                      textAlign: 'center',
                      color: '#adb0b8',
                      opacity: 0.5,
                    }}
                  >
                    Empty cart
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
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
