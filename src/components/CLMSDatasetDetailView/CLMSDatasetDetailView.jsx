/**
 * Full view component.
 * @module components/theme/View/CLMSDatasetDetailView
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclTabs from '@eeacms/volto-clms-theme/components/CclTab/CclTabs';
import {
  DataSetInfoContent,
  DownloadDataSetContent,
  MetadataContent,
} from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { injectIntl } from 'react-intl';
import { postImportGeonetwork } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Modal } from 'semantic-ui-react';
import { getUser } from '@plone/volto/actions';

// import {
//   mockDatabaseInfo,
//   mockMetadata,
//   mockDownloadDataset,
// } from './mockDatasetInfo';
// import CclCitation from '../CclCitation/CclCitation';
// import { CclInfoContainer, CclInfoDescription } from '../CclInfoDescription';

/**
 * Full view component class.
 * @function CLMSDatasetDetailView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */

const CLMSDatasetDetailView = ({ content, token }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const geonetwork_importation = useSelector(
    (state) => state.geonetwork_importation,
  );
  const userSession = useSelector((state) => state.userSession);
  const user = useSelector((state) => state.users?.user);
  const user_token = userSession.token ? jwtDecode(userSession.token).sub : '';
  React.useEffect(() => {
    dispatch(getUser(user_token));
  }, [dispatch, user_token]);

  function handleImport(id, type) {
    dispatch(postImportGeonetwork(location.pathname, id, type));
  }
  const [open, setOpen] = React.useState({});

  return (
    <div className="ccl-container ">
      <h1 className="page-title">{content.title}</h1>
      {content.geonetwork_identifiers?.items?.length > 0 &&
        user.roles &&
        user.roles.includes('Manager') && (
          <Segment.Group compact horizontal>
            {content.geonetwork_identifiers?.items.map((item) => {
              return (
                <Segment
                  padded={'very'}
                  color={'olive'}
                  key={item.id}
                  loading={geonetwork_importation.loading}
                  circular
                >
                  <strong>
                    {item.title} (from {item.type}):{' '}
                  </strong>
                  <br />
                  <br />
                  <Modal
                    onClose={() => {
                      setOpen({ ...open, [item.id]: false });
                    }}
                    onOpen={() => {
                      setOpen({ ...open, [item.id]: true });
                    }}
                    open={open[item.id]}
                    trigger={<CclButton>Import data</CclButton>}
                    className={'modal-clms'}
                    size={'fullscreen'}
                  >
                    <div className={'modal-clms-background'}>
                      <div className={'modal-clms-container'}>
                        <div className={'modal-close modal-clms-close'}>
                          <span
                            className="ccl-icon-close"
                            aria-label="Close"
                            onClick={() => {
                              setOpen({ ...open, [item.id]: false });
                            }}
                            onKeyDown={() => {
                              setOpen({ ...open, [item.id]: false });
                            }}
                            tabIndex="0"
                            role="button"
                          ></span>
                        </div>
                        <div className="modal-login-text">
                          <h1>Import from GeoNetwork</h1>
                          This action will import the data from{' '}
                          <strong>{item.title}</strong> (from {item.type}) into
                          this dataset.
                          <br />
                          <br />
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={
                              'https://sdi.eea.europa.eu/catalogue/copernicus/api/records/' +
                              item.id
                            }
                          >
                            Geonetwork element
                          </a>
                        </div>
                        <CclButton
                          onClick={() => {
                            handleImport(item.id, item.type);
                            setOpen({ ...open, [item.id]: false });
                          }}
                          mode="filled"
                        >
                          Import data
                        </CclButton>
                      </div>
                    </div>
                  </Modal>
                  {geonetwork_importation.imported_data
                    ?.requested_geonetwork_id === item.id && (
                    <p>
                      {geonetwork_importation.loaded &&
                        geonetwork_importation.error === null && (
                          <strong>
                            {' '}
                            The data has been successfully imported
                          </strong>
                        )}
                    </p>
                  )}
                  {geonetwork_importation.imported_data?.status === 'error' && (
                    <p>
                      <strong>
                        {' '}
                        {geonetwork_importation.imported_data?.message}
                      </strong>
                    </p>
                  )}
                </Segment>
              );
            })}
          </Segment.Group>
        )}
      <CclTabs>
        <div tabTitle="General Info">{DataSetInfoContent(content)}</div>
        <div tabTitle="Metadata">{MetadataContent(content)}</div>
        {(content.mapviewer_viewservice?.length === 0 ||
          content.mapviewer_viewservice === null) &&
        (content.downloadable_files?.items?.length === 0 ||
          content.downloadable_files === null) ? (
          <div tabTitle=""></div>
        ) : (
          <div tabTitle="Download">{DownloadDataSetContent(content)}</div>
        )}

        <div underPanel={true}>
          <nav className="left-menu-detail">
            {content?.image && (
              <div className="menu-detail-image">
                <img
                  src={content?.image?.scales?.mini?.download}
                  alt="Placeholder"
                />
              </div>
            )}
            {content?.mapviewer_viewservice?.length > 0 && (
              <div className="menu-detail-button">
                <CclButton url={location.pathname + '/map-viewer'}>
                  View in the map viewer
                </CclButton>
              </div>
            )}
          </nav>
        </div>
      </CclTabs>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CLMSDatasetDetailView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Child items of the object
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Description of the item
         */
        description: PropTypes.string,
        /**
         * Url of the item
         */
        url: PropTypes.string,
        /**
         * Image of the item
         */
        image: PropTypes.object,
        /**
         * Image caption of the item
         */
        image_caption: PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default compose(
  injectIntl,
  connect((state) => ({
    token: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
  })),
)(CLMSDatasetDetailView);
