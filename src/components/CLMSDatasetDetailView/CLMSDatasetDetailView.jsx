import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { Modal, Segment } from 'semantic-ui-react';

import { getUser } from '@plone/volto/actions';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclTabs from '@eeacms/volto-clms-theme/components/CclTab/CclTabs';
import {
  DataSetInfoContent,
  DownloadDataSetContent,
} from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView';

import { postImportWMSLayers, postImportWMSFields } from '../../actions';
import { GeonetworkImporterButtons } from './GeonetworkImporterButtons';

import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

/**
 * Full view component.
 * @module components/theme/View/CLMSDatasetDetailView
 */
/**
 * Full view component class.
 * @function CLMSDatasetDetailView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */

const CLMSDatasetDetailView = ({ content, token }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const wms_layers_importation = useSelector((state) => state.importWMSLayers);
  const wms_fields_importation = useSelector((state) => state.importWMSFields);
  const user = useSelector((state) => state.users?.user);

  React.useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch, token]);

  function handleWMSImport() {
    dispatch(postImportWMSLayers(location.pathname));
  }

  function handleWMSFieldimport() {
    dispatch(postImportWMSFields(location.pathname));
  }

  const [open, setOpen] = React.useState({});
  const locale = useSelector((state) => state.intl.locale);

  const isAuxiliary = content?.mapviewer_viewservice
    ? content?.mapviewer_viewservice
        .toLowerCase()
        .startsWith(
          'https://trial.discomap.eea.europa.eu/arcgis/services/clms/worldcountries/mapserver/wmsserver',
        )
    : false;

  return (
    <div className="ccl-container ">
      <h1 className="page-title">{content.title}</h1>
      {user?.roles && user.roles.includes('Manager') && (
        <GeonetworkImporterButtons
          geonetwork_identifiers_items={content.geonetwork_identifiers.items}
          open={open}
          setOpen={setOpen}
        />
      )}

      {user?.roles && user.roles.includes('Manager') && (
        <>
          <h2>MapLayers importation options:</h2>
          <Segment.Group compact horizontal>
            <Segment
              padded={'very'}
              color={'olive'}
              key={'wms-layers-import'}
              loading={wms_layers_importation?.loading}
              circular
              style={{ width: '50%' }}
            >
              <Modal
                onClose={() => {
                  setOpen({ ...open, 'wms-layers-import': false });
                }}
                onOpen={() => {
                  setOpen({ ...open, 'wms-layers-import': true });
                }}
                open={open['wms-layers-import']}
                trigger={
                  <CclButton>
                    <FormattedMessage
                      id="Import WMS Layers"
                      defaultMessage="Import WMS Layers"
                    />
                  </CclButton>
                }
                className={'modal-clms'}
              >
                <div className={'modal-clms-background'}>
                  <div className={'modal-clms-container'}>
                    <div className={'modal-close modal-clms-close'}>
                      <span
                        className="ccl-icon-close"
                        aria-label="Close"
                        onClick={() => {
                          setOpen({ ...open, 'wms-layers-import': false });
                        }}
                        onKeyDown={() => {
                          setOpen({ ...open, 'wms-layers-import': false });
                        }}
                        tabIndex="0"
                        role="button"
                      ></span>
                    </div>
                    <div className="modal-login-text">
                      <h1>
                        <FormattedMessage
                          id="Import WMS Layers"
                          defaultMessage="Import WMS Layers"
                        />
                      </h1>
                      This action will import the WMS Layers from the view
                      service defined in the dataset or from GeoNetwork if the
                      view service is not defined and a linked geonetwork record
                      has a valid WMS service link
                      <br />
                      <br />
                    </div>
                    <CclButton
                      onClick={() => {
                        handleWMSImport();
                        setOpen({ ...open, 'wms-layers-import': false });
                      }}
                      mode="filled"
                    >
                      <FormattedMessage
                        id="Import data"
                        defaultMessage="Import data"
                      />
                    </CclButton>
                  </div>
                </div>
              </Modal>
              {wms_layers_importation?.imported_wms_layers?.status && (
                <p>
                  {wms_layers_importation?.loaded &&
                    wms_layers_importation?.error === null && (
                      <strong>
                        {' '}
                        {wms_layers_importation?.imported_wms_layers?.message}
                      </strong>
                    )}
                </p>
              )}
              {wms_layers_importation?.imported_wms_layers?.status ===
                'error' && (
                <p>
                  <strong>
                    {' '}
                    {wms_layers_importation?.imported_wms_layers?.message}
                  </strong>
                </p>
              )}
            </Segment>
            <Segment
              padded={'very'}
              color={'olive'}
              key={'wms-fields-import'}
              loading={wms_fields_importation?.loading}
              circular
              style={{ width: '50%' }}
            >
              <Modal
                onClose={() => {
                  setOpen({ ...open, 'wms-fields-import': false });
                }}
                onOpen={() => {
                  setOpen({ ...open, 'wms-fields-import': true });
                }}
                open={open['wms-fields-import']}
                trigger={
                  <CclButton>
                    <FormattedMessage
                      id="Import WMS Fields"
                      defaultMessage="Import WMS Fields"
                    />
                  </CclButton>
                }
                className={'modal-clms'}
              >
                <div className={'modal-clms-background'}>
                  <div className={'modal-clms-container'}>
                    <div className={'modal-close modal-clms-close'}>
                      <span
                        className="ccl-icon-close"
                        aria-label="Close"
                        onClick={() => {
                          setOpen({ ...open, 'wms-fields-import': false });
                        }}
                        onKeyDown={() => {
                          setOpen({ ...open, 'wms-fields-import': false });
                        }}
                        tabIndex="0"
                        role="button"
                      ></span>
                    </div>
                    <div className="modal-login-text">
                      <h1>
                        <FormattedMessage
                          id="Import WMS Fields"
                          defaultMessage="Import WMS Fields"
                        />
                      </h1>
                      This action will import the WMS Fields from the view
                      service defined in the dataset if this WMS service is
                      Arcgis based
                      <br />
                      <br />
                    </div>
                    <CclButton
                      onClick={() => {
                        handleWMSFieldimport();
                        setOpen({ ...open, 'wms-fields-import': false });
                      }}
                      mode="filled"
                    >
                      <FormattedMessage
                        id="Import data"
                        defaultMessage="Import data"
                      />
                    </CclButton>
                  </div>
                </div>
              </Modal>
              {wms_fields_importation?.imported_wms_fields?.status && (
                <p>
                  {wms_fields_importation?.loaded &&
                    wms_fields_importation?.error === null && (
                      <strong>
                        {' '}
                        {wms_fields_importation?.imported_wms_fields?.message}
                      </strong>
                    )}
                </p>
              )}
              {wms_fields_importation?.imported_wms_fields?.status ===
                'error' && (
                <p>
                  <strong>
                    {' '}
                    {wms_fields_importation?.imported_wms_fields?.message}
                  </strong>
                </p>
              )}
            </Segment>
          </Segment.Group>
        </>
      )}

      <CclTabs routing={true}>
        <div tabTitle="General Info">{DataSetInfoContent(content)}</div>

        {content?.downloadable_dataset && (
          <div
            tabTitle="Download"
            loginRequired={true}
            currentLocation={content['@id']}
          >
            {DownloadDataSetContent(content, token)}
          </div>
        )}

        <div underPanel={true}>
          <nav className="left-menu-detail">
            {content?.image && (
              <div className="menu-detail-image">
                <img
                  src={content?.image?.scales?.preview?.download}
                  alt="Placeholder"
                />
              </div>
            )}
            {content?.mapviewer_viewservice?.length > 0 && !isAuxiliary && (
              <div className="menu-detail-button">
                <CclButton
                  url={'/' + locale + '/map-viewer?dataset=' + content.UID}
                >
                  <FormattedMessage
                    id="View in the map viewer"
                    defaultMessage="View in the map viewer"
                  />
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
  connect((state) => ({
    token: state.userSession.token
      ? jwtDecode(state.userSession.token)?.sub
      : '',
  })),
)(CLMSDatasetDetailView);
