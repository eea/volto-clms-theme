import React from 'react';
// import CclTable from '@eeacms/volto-clms-theme/components/CclTable/CclTable';
import CclDownloadTable from '@eeacms/volto-clms-theme/components/CclDownloadTable/CclDownloadTable';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { compose } from 'redux';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { injectIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

const DownloadDataSetContent = (data, type) => {
  let url = '/register';
  const location = useLocation();

  return (
    <div>
      {data.token === '' ? (
        <div className="login-block">
          <div className="login-content">
            <CclButton url={'/login'}>Login to download the data</CclButton>
            <p className="login-block-new">
              New user? <Link to={url}>{'Follow this link to register'}</Link>
            </p>
          </div>
        </div>
      ) : (
        ''
      )}

      {data?.mapviewer_viewservice.length > 0 ? (
        <div className="dataset-download-area">
          <h2>Download by area</h2>
          <p>
            Use this option if you would like to download the dataset for
            area(s) of interest.
          </p>
          <CclButton url={location.pathname + '/download-by-area'}>
            Go to download by area
          </CclButton>
        </div>
      ) : (
        ''
      )}
      {data.downloadable_files.items.length > 0 ? (
        <CclDownloadTable dataset={data}></CclDownloadTable>
      ) : (
        ''
      )}
    </div>
  );
};

export default compose(
  injectIntl,
  connect((state) => ({
    token: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
  })),
)(DownloadDataSetContent);
