import React, { useState } from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import PropTypes from 'prop-types';
import './download-table.less';
import { prePackagedCollection } from './mockData';
import useCartState from '@eeacms/volto-clms-theme/utils/useCartState';
import { Checkbox } from 'semantic-ui-react';

function CclDownloadTable(props) {
  const { dataset } = props;
  const { addCartItem, Toast, isLoggedIn, removeAllCart } = useCartState();
  const [cartSelection, setCartSelection] = useState([]);

  const selectCart = (id, checked) => {
    if (checked) setCartSelection(cartSelection.concat(id));
    else setCartSelection(cartSelection.filter((arr_id) => arr_id !== id));
  };

  const selectAllCart = (checked) => {
    if (checked) {
      setCartSelection(prePackagedCollection.map((item) => item.id));
    } else {
      setCartSelection([]);
    }
  };

  const addToCard = () => {
    let selectedCartItems = prePackagedCollection.filter(
      (item) => cartSelection.includes(item.id) && item,
    );
    addCartItem(selectedCartItems);
  };

  const removeAll = () => {
    removeAllCart();
  };
  return (
    <div className="dataset-download-table">
      <h2>{dataset?.title || 'Download table default title'}</h2>
      <p>
        Please note that you can only download the latest version of our
        datasets from this website. If you are looking for older versions please
        contact us.
      </p>
      <p>{dataset?.description || 'Download table default description'}</p>
      <div className="custom-table dataset-table">
        <table>
          <thead>
            <tr>
              {isLoggedIn && (
                <th>
                  <Checkbox
                    onChange={(e, data) => selectAllCart(data.checked)}
                    checked={prePackagedCollection
                      .map((item) => item.id)
                      .every(function (val) {
                        return cartSelection.indexOf(val) !== -1;
                      })}
                  />
                </th>
              )}
              <th>Year</th>
              <th>Resolution</th>
              <th>Type</th>
              <th>Format</th>
              <th>Version</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {prePackagedCollection.map((dataset) => {
              return (
                <tr>
                  {isLoggedIn && (
                    <td>
                      <Checkbox
                        onChange={(e, data) =>
                          selectCart(dataset.id, data.checked)
                        }
                        checked={cartSelection.includes(dataset.id)}
                      />
                    </td>
                  )}
                  <td>{dataset?.year || 'YYYY'}</td>
                  <td>{dataset?.resolution || '000m'}</td>
                  <td>
                    <span
                      className={
                        'tag tag-' + (dataset?.type.toLowerCase() || 'raster')
                      }
                    >
                      {dataset?.type || 'Raster'}
                    </span>
                  </td>
                  <td>{dataset?.format || 'Format'}</td>
                  <td>{dataset?.version || 'v0.0'}</td>
                  <td>{dataset?.size || '000.0MB'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <CclButton
        onClick={() => addToCard()}
        disabled={!isLoggedIn || cartSelection.length === 0}
      >
        Add to cart
      </CclButton>
      <CclButton
        onClick={() => {
          removeAll();
        }}
      >
        Remove
      </CclButton>
      <Toast message="Added to cart" time={5000}></Toast>
    </div>
  );
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CclDownloadTable.propTypes = {
  type: PropTypes.string,
  dataset: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    year: PropTypes.string,
    resolution: PropTypes.string,
    type: PropTypes.string,
    format: PropTypes.string,
    version: PropTypes.string,
    size: PropTypes.string,
  }),
};
export default CclDownloadTable;
