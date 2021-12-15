import React, { useState } from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import PropTypes from 'prop-types';
import './download-table.less';
// import useCartState from '@eeacms/volto-clms-theme/utils/useCartState';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';
import { Checkbox } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
function CclDownloadTable(props) {
  const locale = useSelector((state) => state.intl?.locale);
  const { dataset } = props;
  const { addCartItem, Toast, isLoggedIn } = useCartState();
  const [cartSelection, setCartSelection] = useState([]);
  // complete the selected file with dataset UID, title and a concat of dataset.UID and block id to get unique id for the whole web
  const prePackagedCollection = dataset?.downloadable_files?.items.map(
    (element) => {
      return {
        ...element,
        name: dataset.title,
        UID: dataset.UID,
        unique_id: element['@id'].concat(dataset.UID),
      };
    },
  );

  const selectCart = (id, checked) => {
    if (checked) setCartSelection(cartSelection.concat(id));
    else setCartSelection(cartSelection.filter((arr_id) => arr_id !== id));
  };

  const selectAllCart = (checked) => {
    if (checked) {
      setCartSelection(prePackagedCollection.map((item) => item.unique_id));
    } else {
      setCartSelection([]);
    }
  };

  const addToCard = () => {
    let selectedCartItems = prePackagedCollection
      .filter((item) => cartSelection.includes(item.unique_id) && item)
      // Get only UID and unique_id from selectedCartItems array of objects
      .map((item) => ({
        UID: item.UID,
        file_id: item['@id'],
      }));
    addCartItem(selectedCartItems);
  };

  return (
    <div className="dataset-download-table">
      <Toast message="Added to cart" time={5000}></Toast>
      <h2>
        {/* dataset?.title ||  */ 'Download pre-packaged data collections'}
      </h2>
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
                      .map((item, key) => item.unique_id)
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
            {prePackagedCollection.map((dataset_file, key) => {
              return (
                <tr key={key}>
                  {isLoggedIn && (
                    <td>
                      <Checkbox
                        onChange={(e, data) =>
                          selectCart(dataset_file.unique_id, data.checked)
                        }
                        checked={cartSelection.includes(dataset_file.unique_id)}
                      />
                    </td>
                  )}
                  <td>{dataset_file?.year || 'YYYY'}</td>
                  <td>{dataset_file?.resolution || '000m'}</td>
                  <td>
                    <span
                      className={
                        'tag tag-' +
                        (dataset_file?.type.toLowerCase() || 'raster')
                      }
                    >
                      {dataset_file?.type || 'Raster'}
                    </span>
                  </td>
                  <td>{dataset_file?.format || 'Format'}</td>
                  <td>{dataset_file?.version || 'v0.0'}</td>
                  <td>{dataset_file?.size || '000.0MB'}</td>
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

      {isLoggedIn && <CclButton url={`/${locale}/cart`}>Show cart</CclButton>}

      <br></br>
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
    downloadable_files: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          year: PropTypes.string,
          resolution: PropTypes.string,
          type: PropTypes.string,
          format: PropTypes.string,
          version: PropTypes.string,
          size: PropTypes.string,
        }),
      ),
    }),
  }),
};
export default CclDownloadTable;
