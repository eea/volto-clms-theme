import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclDownloadTable from '@eeacms/volto-clms-theme/components/CclDownloadTable/CclDownloadTable';
import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';
import {
  StringToHTML,
  sanitizedHTML,
} from '@eeacms/volto-clms-theme/components/CclUtils';

import InfoDownloadDataSet from './InfoDownloadDataSet';

const DownloadDataSetContent = (data, token) => {
  const user = useSelector((state) => state?.users?.user);
  const locale = useSelector((state) => state?.intl?.locale);
  let download_other_ways_access_dataset = sanitizedHTML(
    data.download_other_ways_access_dataset?.data,
  );
  let download_full_dataset_text = sanitizedHTML(
    data.download_full_dataset_text?.data,
  );
  let download_by_area_extra_text = sanitizedHTML(
    data.download_by_area_extra_text?.data,
  );

  return (
    <div>
      {data?.downloadable_full_dataset && (
        <div
          className={
            data.download_limit_temporal_extent &&
            data?.downloadable_full_dataset &&
            download_by_area_extra_text !== '' &&
            (data.mapviewer_istimeseries ||
              data.download_show_auxiliary_calendar)
              ? ''
              : 'dataset-download-area'
          }
        >
          {data.mapviewer_istimeseries ||
          data.download_show_auxiliary_calendar ? (
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

          {data.mapviewer_istimeseries ||
          data.download_show_auxiliary_calendar ? (
            <>
              {user?.['@id'] ? (
                <CclButton url={`/${locale}/map-viewer?dataset=${data?.UID}`}>
                  Go to download by area and time
                </CclButton>
              ) : (
                <CclLoginModal
                  triggerComponent={() => (
                    <CclButton
                      isButton={true}
                      className={'ccl-button ccl-button--default'}
                    >
                      <FormattedMessage
                        id="downloadByAreaAndTime"
                        defaultMessage="Go to download by area and time"
                      />
                    </CclButton>
                  )}
                />
              )}
              {data.download_limit_temporal_extent && (
                <InfoDownloadDataSet
                  temporalLimitExtent={data.download_limit_temporal_extent}
                />
              )}
            </>
          ) : user?.['@id'] ? (
            <CclButton url={`/${locale}/map-viewer?dataset=${data?.UID}`}>
              Go to download by area
            </CclButton>
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
        download_by_area_extra_text !== '' && (
          <div className="dataset-download-area">
            <StringToHTML
              string={data.download_by_area_extra_text?.data || ''}
            />
          </div>
        )}

      {download_full_dataset_text !== '' && (
        <div className="dataset-download-area">
          <h2>Download full dataset</h2>
          <StringToHTML string={data.download_full_dataset_text?.data || ''} />
        </div>
      )}

      {data.downloadable_files?.items?.length > 0 && (
        <CclDownloadTable dataset={data}></CclDownloadTable>
      )}

      {download_other_ways_access_dataset !== '' && (
        <div className="dataset-access-container">
          <h2>Access data on external site(s)</h2>
          <StringToHTML
            string={data?.download_other_ways_access_dataset?.data || ''}
          />
        </div>
      )}
    </div>
  );
};

export default DownloadDataSetContent;
