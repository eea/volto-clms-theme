/**
 * CLMSDownloadCartView container.
 * @module components/CLMSDownloadCartView/CLMSDownloadCartView
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getExtraBreadcrumbItems } from '../../actions';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Forbidden, Unauthorized } from '@plone/volto/components';
import { Checkbox } from 'semantic-ui-react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { postDownloadtool, getDownloadtool } from '../../actions';
import CLMSTasksInProgress from './CLMSTasksInProgress';

const CLMSDownloadCartView = (props) => {
  const dispatch = useDispatch();
  const { cart, removeCartItem, isLoggedIn } = useCartState();
  const [cartSelection, setCartSelection] = useState([]);
  const post_download_in_progress = useSelector(
    (state) => state.downloadtool.post_download_in_progress,
  );
  const user_id = useSelector((state) => state.users.user.id);
  const selectCart = (id, checked) => {
    if (checked) setCartSelection(cartSelection.concat(id));
    else setCartSelection(cartSelection.filter((arr_id) => arr_id !== id));
  };

  const selectAllCart = (checked) => {
    if (checked) {
      setCartSelection(
        cart
          .filter((item) => item.task_in_progress === false)
          .map((item, key) => item.unique_id),
      );
    } else {
      setCartSelection([]);
    }
  };

  const { formatMessage } = useIntl();
  const messages = defineMessages({
    Cart: {
      id: 'Cart',
      defaultMessage: 'Cart',
    },
  });

  useEffect(() => {
    dispatch(
      getExtraBreadcrumbItems([
        {
          title: formatMessage(messages.Cart),
          pathname: props.location.pathname,
        },
      ]),
    );

    // returned function will be called on component unmount
    return () => {
      dispatch(getExtraBreadcrumbItems([]));
    };
  }, [dispatch, formatMessage, messages.Cart, props.location.pathname]);

  const getSelectedCartItems = () => {
    return cart.filter((item) => cartSelection.indexOf(item.unique_id) > -1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCartItemInProgress = (in_progress_dataset_id) => {
    let started_processing_item = cart.filter(
      (r) => r['unique_id'] === in_progress_dataset_id,
    )[0];
    if (started_processing_item['unique_id']) {
      removeCartItem(started_processing_item['unique_id']);
      dispatch(getDownloadtool(user_id));
    }
  };

  useEffect(() => {
    let progress_keys = Object.keys(post_download_in_progress);
    progress_keys.forEach((progress_key) =>
      setCartItemInProgress(
        post_download_in_progress[progress_key]['DatasetID'],
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_download_in_progress]);

  return (
    <>
      <Helmet title={formatMessage(messages.Cart)} />
      <div className="ui container">
        {!isLoggedIn && (
          <>
            {props.token ? (
              <Forbidden
                pathname={props.pathname}
                staticContext={props.staticContext}
              />
            ) : (
              <Unauthorized
                pathname={props.pathname}
                staticContext={props.staticContext}
              />
            )}
          </>
        )}
        {isLoggedIn && (
          <>
            <h1 className="page-title">
              <FormattedMessage id="Cart" defaultMessage="Cart" />
            </h1>
            <div className="page-description">
              <FormattedMessage
                id="Lorem"
                defaultMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
        mauris ante, a iaculis leo placerat quis."
              />
            </div>
            <hr />
            <div className="ccl-container">
              <div className="message-block">
                <div className="message-icon">
                  <FontAwesomeIcon icon={['far', 'comment-alt']} />
                  <i className="far fa-comment-alt"></i>
                </div>
                <div className="message-text">
                  <p>
                    This is a warning related to the funcionality of start
                    downloading the datasets
                  </p>
                  <ul>
                    <li>May be can include a link to somewhere</li>
                    <li>Or an informative text</li>
                  </ul>
                </div>
              </div>
              <CLMSTasksInProgress />
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
                              onChange={(e, data) =>
                                selectAllCart(data.checked)
                              }
                              checked={
                                cart
                                  ? cart
                                      .filter(
                                        (item) =>
                                          item.task_in_progress === false,
                                      )
                                      .map((item, key) => item.unique_id)
                                      .every(function (val) {
                                        return (
                                          cartSelection.indexOf(val) !== -1
                                        );
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
                    {cart &&
                      cart.map((item, key) => (
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
                                  checked={cartSelection.includes(
                                    item.unique_id,
                                  )}
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
                            <span
                              className={'tag tag-' + item?.type?.toLowerCase()}
                            >
                              {item.type}
                            </span>
                          </td>
                          <td className="table-td-format">
                            {item.format}
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
                    {cart?.length === 0 && (
                      <>
                        <tr>
                          <td
                            colSpan={11}
                            style={{ textAlign: 'center', fontSize: '1.5em' }}
                          >
                            Empty cart
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              {cart?.length !== 0 && (
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CLMSDownloadCartView;
