import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclDownloadTable from '@eeacms/volto-clms-theme/components/CclDownloadTable/CclDownloadTable';
import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

const DownloadDataSetContent = (data, token) => {
  const user = useSelector((state) => state?.users?.user);
  const locale = useSelector((state) => state?.intl?.locale);

  return (
    <div>
      {data?.downloadable_full_dataset && (
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
              <CclButton
                url={'/' + locale + '/map-viewer?dataset=' + data?.UID}
              >
                Go to download by area and time
              </CclButton>
            ) : (
              <CclButton
                url={'/' + locale + '/map-viewer?dataset=' + data?.UID}
              >
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
        </div>
      )}

      {data?.downloadable_full_dataset &&
        data.download_by_area_extra_text?.data &&
        data.download_by_area_extra_text?.data !== '<p><br/><p>' &&
        data.download_by_area_extra_text?.data !== '<p></p>' && (
          <div className="dataset-download-area">
            <StringToHTML
              string={data.download_by_area_extra_text?.data || ''}
            />
          </div>
        )}

      {data.download_full_dataset_text?.data &&
        data.download_full_dataset_text?.data !== '<p><br/><p>' &&
        data.download_full_dataset_text?.data !== '<p></p>' && (
          <div className="dataset-download-area">
            <h2>Download full dataset</h2>
            <StringToHTML
              string={data.download_full_dataset_text?.data || ''}
            />
          </div>
        )}

      {data.downloadable_files?.items?.length > 0 && (
        <CclDownloadTable dataset={data}></CclDownloadTable>
      )}

      {data?.download_other_ways_access_dataset?.data &&
        data?.download_other_ways_access_dataset?.data !== '<p><br/><p>' &&
        data?.download_other_ways_access_dataset?.data !== '<p></p>' && (
          <div className="dataset-access-container">
            <h2>You can also access this dataset</h2>
            <StringToHTML
              string={data?.download_other_ways_access_dataset?.data || ''}
            />
          </div>
        )}
    </div>
  );
};

export default DownloadDataSetContent;
