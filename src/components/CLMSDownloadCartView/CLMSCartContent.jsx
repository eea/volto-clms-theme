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
} from '../../actions';
import { searchContent } from '@plone/volto/actions';
import { Select } from 'semantic-ui-react';

import { CART_SESSION_KEY } from '@eeacms/volto-clms-utils/cart/useCartState';
import { cleanDuplicatesEntries } from '@eeacms/volto-clms-utils/utils';

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

  // const [formatConversionTable, setFormatConversionTable] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [localSessionCart, setLocalSessionCart] = useState([]);

  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', text: 'Australia' },
    { key: 'at', value: 'at', text: 'Austria' },
    { key: 'az', value: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', text: 'Benin' },
  ];

  //add json recived from @format_conversion_table endpoint to countryOptions array to be used in the cart component
  useEffect(() => dispatch(getFormatConversionTable()), []);
  useEffect(() => {
    // console.log('formatConversionTable: ', formatConversionTable);
  }, [formatConversionTable]);

  /* function getAvailableConvertion(defaultValue) {
    return formatConversionTable[defaultValue];
    const keys = Object.keys(formatConversionTable[defaultValue]);

    const filtered = keys.filter(function (key) {
      return formatConversionTable[defaultValue][key];
    });
    console.log('filtered_values: ', filtered);
    return { key: 'aaa', value: 'aaa', text: 'Kaixo' };
  } */
  useEffect(() => {
    const CART_SESSION_USER_KEY = CART_SESSION_KEY.concat(`_${user_id}`);
    setLocalSessionCart(
      JSON.parse(localStorage.getItem(CART_SESSION_USER_KEY)) || [],
    );
  }, [user_id]);

  useEffect(() => {
    if (localSessionCart?.length !== 0) {
      localSessionCart.forEach((item) => {
        //   console.log('item', item);
        dispatch(
          searchContent('', {
            // 'path.depth': 1,
            // metadata_fields: '_all',
            // b_size: 100000000,
            // fullobjects: 1,
            portal_type: 'DataSet',
            UID: item.UID,
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
      concartRequestedCartItem();
    }
  }, [requested_card_items]);

  function concartRequestedCartItem() {
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
    return cartItems.filter((item) => cartItems.indexOf(item.unique_id) > -1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCartItemInProgress = (in_progress_dataset_id) => {
    let started_processing_item = cartItems.filter(
      (r) => r['unique_id'] === in_progress_dataset_id,
    )[0];
    if (started_processing_item['unique_id']) {
      removeCartItem(started_processing_item['unique_id']);
      dispatch(getFormatConversionTable());
      dispatch(getDownloadtool(user_id));
    }
  };

  // const setFormatConversionTable = (format_conversion_table) => {
  //   let start_format_conversion_table = cartItems.filter(
  //     (r) => r['format'] === format_conversion_table,
  //   )[0];
  //   if (start_format_conversion_table['format']) {
  //     dispatch(getFormatConversionTable());
  //   }
  // };

  useEffect(() => {
    let progress_keys = Object.keys(post_download_in_progress);
    progress_keys.forEach((progress_key) =>
      setCartItemInProgress(
        post_download_in_progress[progress_key]['DatasetID'],
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_download_in_progress]);

  useEffect(() => {
    const array_ids = cart?.map((item) => item.unique_id);
    const newCart = cartItems.filter((item) =>
      array_ids.includes(item.unique_id),
    );
    setCartItems(newCart);
  }, [cart]);

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
                    {/* {item.format} */}
                    <Select
                      value={countryOptions[0].value}
                      // options={getAvailableConvertion(item.format)}
                    />
                    {/* <div className="ccl-form">
                       <div className="ccl-form-group">
                         <select
                           className="ccl-select"
                           id="select-ID-1"
                           name="select-name-1"
                           defaultValue={item.format}
                         >
                           <option value="GeoTiff" >GeoTiff</option>
                           <option value="ESRI Geodatabase" >ESRI Geodatabase</option>
                           <option value="SQLite Geodatabase" >SQLite Geodatabase</option>
                         </select>
                       </div>
                     </div> */}
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
          onClick={() => {
            let selectedItems = getSelectedCartItems();
            selectedItems.forEach((selected) => {
              const item = {
                UserID: user_id,
                /*, 
                 UID: dataset unique id;
                 DatasetID: dataset id;
                 Format: Dataset format
                 selected['unique_id']
                 selected['UID']
                 */
                DatasetID: selected['unique_id'] || selected['UID'], // provisional, We need to send and return unique_id to can mark this element as a pending task selected['UID'],
                //DatasetFormat: selected['type'], // Formats: "Shapefile"|"GDB"|"GPKG"|"Geojson"|"Geotiff"|"Netcdf"|"GML"|"WFS"
                DatasetFormat: 'Shapefile',
                // OutputFormat:selected['format'],
                // DatasetPath: selected['path'],

                OutputFormat: 'GDB',
              };
              dispatch(postDownloadtool(item));
            });
          }}
          disabled={cartSelection.length === 0}
        >
          Start downloading
        </CclButton>
      )}
    </>
  );
};

export default CLMSCartContent;
