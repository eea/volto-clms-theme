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

import {
  postImportGeonetwork,
  postImportWMSLayers,
  postImportWMSFields,
} from '../../actions';
import { useSchema } from '../Widgets/SchemaCreatorWidget';

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
  const geonetwork_importation = useSelector(
    (state) => state.geonetwork_importation,
  );
  const wms_layers_importation = useSelector((state) => state.importWMSLayers);
  const wms_fields_importation = useSelector((state) => state.importWMSFields);
  const user = useSelector((state) => state.users?.user);
  React.useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch, token]);

  function handleImport(id, type) {
    dispatch(postImportGeonetwork(location.pathname, id, type));
  }

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
  const { data } = useSchema();
  const default_schema = data.schema;
  const saved_schema = content.downloadable_files.schema;
  const schema = saved_schema ?? default_schema;
  const hidden_columns = ['@id', 'path'];
  // complete the selected file with dataset UID, title and a concat of dataset.UID and block id to get unique id for the whole web
  const prePackagedCollection = content?.downloadable_files?.items.map(
    (element) => {
      return {
        ...element,
        name: content.title,
        UID: content.UID,
        unique_id: `${content.UID}_${element['@id']}`,
      };
    },
  );
  const hasSome = (field) => {
    return prePackagedCollection.filter((ppItem) => ppItem[field]).length > 0
      ? field
      : '';
  };

  const columns =
    schema?.fieldsets?.length > 0
      ? schema.fieldsets[0].fields.filter((key) => {
          return hasSome(key) && !hidden_columns.includes(key);
        })
      : [];

  return (
    <div className="ccl-container ">
      <h1 className="page-title">{content.title}</h1>
      {content.geonetwork_identifiers?.items?.length > 0 &&
        user?.roles &&
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
                  style={{ width: '50%' }}
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
                    trigger={
                      <CclButton>
                        <FormattedMessage
                          id="Import data"
                          defaultMessage="Import data"
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
                          <h1>
                            <FormattedMessage
                              id="Import from GeoNetwork"
                              defaultMessage="Import from GeoNetwork"
                            />
                          </h1>
                          This action will import the data from{' '}
                          <strong>{item.title}</strong> (from {item.type}) into
                          this dataset.
                          <br />
                          <br />
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={
                              item.type === 'EEA'
                                ? 'https://sdi.eea.europa.eu/catalogue/srv/eng/catalog.search#/metadata/' +
                                  item.id
                                : 'https://land.copernicus.vgt.vito.be/geonetwork/srv/eng/catalog.search#/metadata/' +
                                  item.id
                            }
                          >
                            {item.type === 'EEA' && (
                              <FormattedMessage
                                id="EEA Geonetwork element"
                                defaultMessage="EEA Geonetwork element"
                              />
                            )}
                            {item.type === 'VITO' && (
                              <FormattedMessage
                                id="VITO Geonetwork element"
                                defaultMessage="VITO Geonetwork element"
                              />
                            )}
                          </a>
                        </div>
                        <CclButton
                          onClick={() => {
                            handleImport(item.id, item.type);
                            setOpen({ ...open, [item.id]: false });
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

      {user?.roles && user.roles.includes('Manager') && (
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
                    This action will import the WMS Layers from the view service
                    defined in the dataset or from GeoNetwork if the view
                    service is not defined and a linked geonetwork record has a
                    valid WMS service link
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
                    This action will import the WMS Fields from the view service
                    defined in the dataset if this WMS service is Arcgis based
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
      )}

      <CclTabs routing={true}>
        <div tabTitle="General Info">{DataSetInfoContent(content)}</div>

        {content?.downloadable_dataset && (
          <div
            tabTitle="Download"
            loginRequired={true}
            redirect={
              columns.length === 0
                ? location.pathname + '/download-by-area'
                : ''
            }
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
