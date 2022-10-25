import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclDownloadTable from '@eeacms/volto-clms-theme/components/CclDownloadTable/CclDownloadTable';
import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';

const DownloadDataSetContent = (data, token) => {
  const location = useLocation();

  const user = useSelector((state) => state.users?.user);

  return (
    <div>
      {/* {data.downloadable_files?.items[0].path === '' &&
      location.hash === '#Download' ? (
        <Redirect to={location.pathname + '/download-by-area'} />
      ) : (
        ''
      )} */}

      {data?.mapviewer_viewservice?.length > 0 && (
        <div className="dataset-download-area">
          <h2>Download by area</h2>
          <p>
            Use this option if you would like to download the dataset for
            area(s) of interest.
          </p>
          {user?.['@id'] ? (
            data.mapviewer_istimeseries === true ? (
              <CclButton url={location.pathname + '/download-by-area'}>
                Go to download by area and time
              </CclButton>
            ) : (
              <CclButton url={location.pathname + '/download-by-area'}>
                Go to download by area
              </CclButton>
            )
          ) : (
            <CclLoginModal
              triggerComponent={() => (
                <CclButton
                  isButton={true}
                  className={'ccl-button ccl-button--default'}
                >
                  <FormattedMessage
                    id="downloadByArea"
                    defaultMessage="Go to download by area"
                  />
                </CclButton>
              )}
            />
          )}
          {/* {data.token === '' ? (
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
          )} */}
        </div>
      )}
      {data.downloadable_files?.items?.length > 0 && (
        <CclDownloadTable dataset={data}></CclDownloadTable>
      )}
    </div>
  );
};

export default DownloadDataSetContent;
