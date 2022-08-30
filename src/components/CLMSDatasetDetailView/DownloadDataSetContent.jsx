import React from 'react';
import CclDownloadTable from '@eeacms/volto-clms-theme/components/CclDownloadTable/CclDownloadTable';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { Link, useLocation } from 'react-router-dom';

const DownloadDataSetContent = (data) => {
  let url = '/register';
  const location = useLocation();

  return (
    <div>
      {data.token === '' && (
        <div className="login-block">
          <div className="login-content">
            <CclButton url={'/login'}>Login to download the data</CclButton>
            <p className="login-block-new">
              New user? <Link to={url}>{'Follow this link to register'}</Link>
            </p>
          </div>
        </div>
      )}

      {data?.mapviewer_viewservice?.length > 0 && (
        <div className="dataset-download-area">
          <h2>Download by area</h2>
          <p>
            Use this option if you would like to download the dataset for
            area(s) of interest.
          </p>
          {data.token === '' ? (
            <CclButton
              url={location.pathname + '/download-by-area'}
              disabled={true}
            >
              Go to download by area
            </CclButton>
          ) : data.mapviewer_istimeseries === true ? (
            <CclButton url={location.pathname + '/download-by-area'}>
              Go to download by area and time
            </CclButton>
          ) : (
            <CclButton url={location.pathname + '/download-by-area'}>
              Go to download by area
            </CclButton>
          )}
        </div>
      )}
      {data.downloadable_files?.items?.length > 0 && (
        <CclDownloadTable dataset={data}></CclDownloadTable>
      )}
    </div>
  );
};

export default DownloadDataSetContent;
