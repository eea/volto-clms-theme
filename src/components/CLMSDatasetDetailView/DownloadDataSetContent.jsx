import React from 'react';
import CclTable from '@eeacms/volto-clms-theme/components/CclTable/CclTable';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { Link } from 'react-router-dom';

const DownloadDataSetContent = (data, type) => {
  let url = '/register';

  return (
    <div>
      <div className="login-block">
        <div className="login-content">
          <CclButton url={'/login'}>Login to download the data</CclButton>
          <p className="login-block-new">
            New user? <Link to={url}>{'Follow this link to register'}</Link>
          </p>
        </div>
      </div>
      <div className="dataset-download-area">
        <h2>Download by area</h2>
        <p>
          Use this option if you would like to download the dataset for area(s)
          of interest.
        </p>
        <CclButton disabled={true}>Go to download by area</CclButton>
      </div>
      <CclTable type={type} dataset={data}></CclTable>
    </div>
  );
};

export default DownloadDataSetContent;
