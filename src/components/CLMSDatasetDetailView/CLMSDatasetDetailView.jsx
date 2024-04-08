import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { Modal, Segment, Grid, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';

import { getUser, searchContent } from '@plone/volto/actions';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclTabs from '@eeacms/volto-clms-theme/components/CclTab/CclTabs';
import {
  DataSetInfoContent,
  DownloadDataSetContent,
} from '@eeacms/volto-clms-theme/components/CLMSDatasetDetailView';

import { postImportWMSLayers, postImportWMSFields } from '../../actions';
import { GeonetworkImporterButtons } from './GeonetworkImporterButtons';
import { UniversalLink } from '@plone/volto/components';
import { cclDateTimeFormat } from '../CclUtils/dateFormats';
import StringToHTML from '../CclUtils/StringToHTML';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import './styles.less';

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

  const ClickableUrl = ({ title, url }) => {
    return (
      url && (
        <Grid.Row className="characteristic-row">
          <a href={url} rel="noreferrer" target="_blank">
            {title}
          </a>
          <Icon
            color={'olive'}
            name="copy"
            size="large"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success(
                <Toast
                  success
                  autoClose={5000}
                  title={'URL copied to clipboard'}
                  content={`The ${title} URL has been successfully copied to clipboard`}
                />,
              );
            }}
          ></Icon>
        </Grid.Row>
      )
    );
  };
  const allSearchSubrequests = useSelector((state) => state.search.subrequests);
  const searchSubrequests = allSearchSubrequests?.[`related-${content.UID}`];
  const libraries = searchSubrequests?.items || [];

  React.useEffect(() => {
    !searchSubrequests?.loading &&
      !searchSubrequests?.loaded &&
      !searchSubrequests?.error &&
      dispatch(
        searchContent(
          '/',
          {
            portal_type: 'ProductionUpdate',
            associated_datasets: content.UID,
            status: 'active',
            metadata_fields: '_all',
            sort_on: 'effective',
            sort_order: 'reverse',
            b_size: 99999,
          },
          `${'related'}-${content.UID}`,
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ccl-container ">
      <h1 className="page-title">{content.title}</h1>
      {user?.roles && user.roles.includes('Manager') && (
        <GeonetworkImporterButtons
          geonetwork_identifiers_items={content?.geonetwork_identifiers?.items}
          open={open}
          setOpen={setOpen}
        />
      )}

      {user?.roles && user.roles.includes('Manager') && (
        <>
          <h2>MapLayers importation options:</h2>
          <Segment basic>
            <Grid columns={2} compact horizontal>
              <Grid.Column>
                <Segment
                  padded={'very'}
                  color={'olive'}
                  key={'wms-layers-import'}
                  loading={wms_layers_importation?.loading}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
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
                          service defined in the dataset or from GeoNetwork if
                          the view service is not defined and a linked
                          geonetwork record has a valid WMS service link
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
                            {
                              wms_layers_importation?.imported_wms_layers
                                ?.message
                            }
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
              </Grid.Column>
              <Grid.Column>
                <Segment
                  padded={'very'}
                  color={'olive'}
                  key={'wms-fields-import'}
                  loading={wms_fields_importation?.loading}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
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
                            {
                              wms_fields_importation?.imported_wms_fields
                                ?.message
                            }
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
              </Grid.Column>
            </Grid>
          </Segment>
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
                    id="View in the data viewer"
                    defaultMessage="View in the data viewer"
                  />
                </CclButton>
              </div>
            )}
            {(content?.metadata_wms_url ||
              content?.metadata_wmts_url ||
              content?.metadata_rest_api_url) && (
              <div className="url-container">
                <div className="citation-title">Services</div>
                <ClickableUrl title="WMS" url={content.metadata_wms_url} />
                <ClickableUrl title="WMTS" url={content.metadata_wmts_url} />
                <ClickableUrl
                  title="REST API"
                  url={content.metadata_rest_api_url}
                />
              </div>
            )}

            <strong>{content.production_updates_show}</strong>

            {(content.production_updates_show ||
              (libraries && libraries.length > 0)) && (
              <>
                <div class="citation-title">Production updates</div>

                {content.production_updates_show && (
                  <>
                    <div
                      className="validation-citation-container"
                      dangerouslySetInnerHTML={{
                        __html: content.production_updates_text.data,
                      }}
                    />
                  </>
                )}

                {!content.production_updates_show &&
                  libraries.map((item) => {
                    const show_dt = cclDateTimeFormat(item.effective);
                    return (
                      <div className="validation-citation-container">
                        <p>
                          {show_dt} <br />
                          <UniversalLink item={item}>
                            {item.title}
                          </UniversalLink>
                        </p>
                      </div>
                    );
                  })}

                <UniversalLink href="/en/production-updates">
                  See all or subscribe to production updates
                </UniversalLink>
              </>
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
