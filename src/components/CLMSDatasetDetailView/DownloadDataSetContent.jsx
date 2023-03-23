import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclDownloadTable from '@eeacms/volto-clms-theme/components/CclDownloadTable/CclDownloadTable';
import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

const DownloadDataSetContent = (data, token) => {
  const location = useLocation();

  const user = useSelector((state) => state?.users?.user);

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
          {data.mapviewer_istimeseries ? (
            <>
              <h2>Download by area and time</h2>
              <p>
                Use this option if you would like to download the dataset for
                area(s) of interest and time.
              </p>
            </>
          ) : (
            <>
              <h2>Download by area</h2>
              <p>
                Use this option if you would like to download the dataset for
                area(s) of interest.
              </p>
            </>
          )}
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
          <br />
          <br />
          <br />
          {data.download_full_dataset_text?.data &&
            data.download_full_dataset_text?.data !== '<p><br/><p>' &&
            data.download_full_dataset_text?.data !== '<p></p>' && (
              <>
                <h2>Download full dataset</h2>
                <StringToHTML
                  string={data.download_full_dataset_text?.data || ''}
                />
              </>
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

      {data?.download_other_ways_access_dataset?.data &&
        data?.download_other_ways_access_dataset?.data !== '<p><br/><p>' &&
        data?.download_other_ways_access_dataset?.data !== '<p></p>' && (
          <>
            <h2>You can also access this dataset</h2>
            <StringToHTML
              string={data?.download_other_ways_access_dataset?.data || ''}
            />
          </>
        )}
    </div>
  );
};

export default DownloadDataSetContent;
