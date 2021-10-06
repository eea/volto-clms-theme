/**
 * CLMSDownloadCartView container.
 * @module components/CLMSDownloadCartView/CLMSDownloadCartView
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { getExtraBreadcrumbItems } from '../../actions';
import useCartState from '@eeacms/volto-clms-theme/utils/useCartState';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Forbidden, Unauthorized } from '@plone/volto/components';
import { Checkbox } from 'semantic-ui-react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { postDownloadtool } from '../../actions';
import { Button, Progress } from 'semantic-ui-react';

const CLMSDownloadCartView = (props) => {
  const dispatch = useDispatch();
  const { cart, removeCartItem, isLoggedIn } = useCartState();
  const [cartSelection, setCartSelection] = useState([]);
  const [downloadPercent, setDownloadPercent] = useState(0);

  const selectCart = (id, checked) => {
    if (checked) setCartSelection(cartSelection.concat(id));
    else setCartSelection(cartSelection.filter((arr_id) => arr_id !== id));
  };

  const selectAllCart = (checked) => {
    if (checked) {
      setCartSelection(cart.map((item, key) => item.unique_id));
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
  const increment = () => {
    setDownloadPercent(downloadPercent >= 100 ? 0 : downloadPercent + 20);
  };
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
              {downloadPercent > 0 && (
                <>
                  <Progress percent={downloadPercent} indicating />
                  <Button onClick={() => increment()}>
                    {downloadPercent < 100
                      ? 'Increment (For testing)'
                      : 'Reset progress'}
                  </Button>
                  <br />
                </>
              )}
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

              <div className="custom-table cart-table">
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
                              checked={cart
                                .map((item, key) => item.unique_id)
                                .every(function (val) {
                                  return cartSelection.indexOf(val) !== -1;
                                })}
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
                        <tr key={key}>
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
                              className={'tag tag-' + item.type.toLowerCase()}
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
                            <FontAwesomeIcon
                              icon={['fas', 'trash']}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                removeCartItem(item.unique_id);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    {cart.length === 0 && (
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
              {cart.length !== 0 && (
                <CclButton
                  onClick={() => {
                    let selectedItems = getSelectedCartItems();
                    selectedItems.forEach((selected) => {
                      const item = {
                        UserID: selected['UID'],
                        DatasetID: selected['@id'],
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
