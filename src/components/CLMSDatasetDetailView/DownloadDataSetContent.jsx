import React, { useEffect } from 'react';
import CclDownloadTable from '@eeacms/volto-clms-theme/components/CclDownloadTable/CclDownloadTable';
import { getUser } from '@plone/volto/actions';
import { useDispatch, useSelector } from 'react-redux';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import config from '@plone/volto/registry';
import { UniversalLink } from '@plone/volto/components';
import CclModal from '../CclModal/CclModal';
import { getRegistry } from '@eeacms/volto-clms-theme/actions';
import { FormattedMessage } from 'react-intl';
import { useLocation, Redirect } from 'react-router-dom';

const DownloadDataSetContent = (data, token) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const registryRecords = useSelector((state) => state.registry.records);
  const [loginUrl, setLoginUrl] = React.useState('');
  const registry_key = config.settings?.registry?.login_url || null;

  useEffect(() => {
    if (registryRecords && registry_key in registryRecords) {
      setLoginUrl(
        registryRecords[registry_key] +
          '?came_from=' +
          location.pathname +
          '/download-by-area',
      );
    }
  }, [registryRecords, registry_key, location.pathname]);
  const user = useSelector((state) => state.users?.user);
  React.useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);

  function modalStatus(status) {
    if (status === true) {
      dispatch(getRegistry(registry_key));
    }
  }

  return (
    <div>
      {data.downloadable_files?.items[0].path === '' &&
      location.hash === '#Download' ? (
        <Redirect to={location.pathname + '/download-by-area'} />
      ) : (
        ''
      )}

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
            <CclModal
              trigger={
                <CclButton
                  isButton={true}
                  className={'ccl-button ccl-button--default'}
                >
                  <FormattedMessage
                    id="downloadByArea"
                    defaultMessage="Go to download by area"
                  />
                </CclButton>
              }
              size="tiny"
              modalStatus={modalStatus}
            >
              <div className="content">
                <div className="modal-login-title">
                  This website uses EU Login for user authentication.
                </div>
                <div className="modal-login-text">
                  <p>
                    {' '}
                    EU Login, the European Commission Authentication Service,
                    enables you to access various web applications centrally
                    using the same e-mail and password. You can read more{' '}
                    <UniversalLink
                      openLinkInNewTab
                      href="https://ecas.ec.europa.eu/cas/about.html"
                    >
                      here
                    </UniversalLink>
                    .
                  </p>
                  <p>
                    {' '}
                    If you have EU Login account, please click 'Login using EU
                    Login'.
                  </p>
                  <p>
                    If you don't have EU Login account, please follow this{' '}
                    <UniversalLink
                      openLinkInNewTab
                      href="https://ecas.ec.europa.eu/cas/eim/external/register.cgi"
                    >
                      link
                    </UniversalLink>{' '}
                    to create it
                  </p>
                  <p>
                    If you have other questions, please contact our
                    <UniversalLink openLinkInNewTab href="/en/service-desk">
                      {' '}
                      Service desk
                    </UniversalLink>
                    .
                  </p>
                </div>
              </div>
              <div className="actions">
                <div className="modal-buttons">
                  <a
                    href={loginUrl || '#'}
                    className="ccl-button ccl-button-green"
                  >
                    Login using EU Login
                  </a>
                </div>
              </div>
            </CclModal>
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
