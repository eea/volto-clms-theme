import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import PropTypes from 'prop-types';
import './table.less';

function CclTable(props) {
  const { dataset } = props;
  const type = null;
  
  return (
    <div className="dataset-download-table">
      <h2>{dataset?.title || 'Download table default title'}</h2>
      <p>Please note that you can only download the latest version of our datasets from this website. If you are looking for older versions please contact us.</p>
      <p>{dataset?.description || 'Download table default description'}</p>
      <div className="custom-table dataset-table">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Resolution</th>
              <th>Type</th>
              <th>Format</th>
              <th>Version</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{dataset?.year || 'YYYY'}</td>
              <td>{dataset?.resolution || '000m'}</td>
              <td>
                <span className={"tag tag-" + (type || 'raster')}>{dataset?.datasetType || 'Raster'}</span>
              </td>
              <td>{dataset?.format || 'Format'}</td>
              <td>{dataset?.version || 'v0.0'}</td>
              <td>{dataset?.size || '000.0MB'}</td>
            </tr>
            <tr>
              <td>{dataset?.year || 'YYYY'}</td>
              <td>{dataset?.resolution || '000m'}</td>
              <td>
                <span className={"tag tag-" + (type || 'raster')}>{dataset?.datasetType || 'Raster'}</span>
              </td>
              <td>{dataset?.format || 'Format'}</td>
              <td>{dataset?.version || 'v0.0'}</td>
              <td>{dataset?.size || '000.0MB'}</td>
            </tr>
            <tr>
              <td>{dataset?.year || 'YYYY'}</td>
              <td>{dataset?.resolution || '000m'}</td>
              <td>
                <span className={"tag tag-" + (type || 'raster')}>{dataset?.datasetType || 'Raster'}</span>
              </td>
              <td>{dataset?.format || 'Format'}</td>
              <td>{dataset?.version || 'v0.0'}</td>
              <td>{dataset?.size || '000.0MB'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <CclButton disabled = {true}>Add to cart</CclButton>
    </div>
  );
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CclTable.propTypes = {
  type: PropTypes.string,
  dataset: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    year: PropTypes.string,
    resolution: PropTypes.string,
    datasetType: PropTypes.string,
    format: PropTypes.string,
    version: PropTypes.string,
    size: PropTypes.string,
  }),
};

export default CclTable;
