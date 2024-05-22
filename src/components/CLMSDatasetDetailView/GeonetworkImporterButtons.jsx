import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Modal, Segment, Grid, Input, Pagination } from 'semantic-ui-react';

import { Icon } from '@plone/volto/components';
import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

import { postImportGeonetwork } from '../../actions';
import { useFilteredPagination } from '../CclUtils/useFilteredPagination';

export const GeonetworkImporterButtons = (props) => {
  const { geonetwork_identifiers_items, open, setOpen } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const geonetwork_importation = useSelector(
    (state) => state.geonetwork_importation,
  );
  const use_pagination = useFilteredPagination(geonetwork_identifiers_items, 3);
  const p_functions = use_pagination.functions;
  const p_data = use_pagination.data;
  const { pagination, currentPage, paginationSize, dataList } = p_data;

  const handleImport = (id, type) => {
    dispatch(postImportGeonetwork(location.pathname, id, type));
  };

  const TYPE_NAMING = {
    VITO: 'Global Land collection catalog - VITO NV',
    EEA: 'EEA',
  };

  return (
    <Segment basic>
      <h2>Geonetwork importation options:</h2>
      {paginationSize < geonetwork_identifiers_items?.length && (
        <div className="block search">
          <div className="search-wrapper">
            <div className="search-input">
              <Input
                id={`geonetwork-searchtext`}
                placeholder={'Search in the following items'}
                fluid
                onChange={(event, value) => {
                  p_functions.applySearch(event, value, 'title');
                  p_functions.setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>
      )}
      {pagination?.length > 0 && (
        <Grid columns={3}>
          <Grid.Row stretched>
            {pagination.map((item) => {
              return (
                <Grid.Column key={item.id}>
                  <Segment
                    padded={'very'}
                    color={'olive'}
                    loading={geonetwork_importation.loading}
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
                            <strong>{item.title}</strong> (from{' '}
                            {TYPE_NAMING[item.type]
                              ? TYPE_NAMING[item.type]
                              : item.type}
                            ) into this dataset.
                            <br />
                            <br />
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={
                                item.type === 'EEA'
                                  ? 'https://sdi.eea.europa.eu/catalogue/srv/eng/catalog.search#/metadata/' +
                                    item.id
                                  : 'https://globalland.vito.be/geonetwork/srv/eng/catalog.search#/metadata/' +
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
                    {geonetwork_importation.imported_data?.status ===
                      'error' && (
                      <p>
                        <strong>
                          {' '}
                          {geonetwork_importation.imported_data?.message}
                        </strong>
                      </p>
                    )}
                  </Segment>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      )}
      {dataList?.length / paginationSize > 1 && (
        <div className="pagination-wrapper">
          <Pagination
            activePage={currentPage}
            totalPages={Math.ceil(dataList?.length / paginationSize)}
            onPageChange={(e, { activePage }) => {
              p_functions.setCurrentPage(activePage);
            }}
            firstItem={null}
            lastItem={null}
            prevItem={{
              content: <Icon name={paginationLeftSVG} size="18px" />,
              icon: true,
              'aria-disabled': currentPage === 1,
              className: currentPage === 1 ? 'disabled' : null,
            }}
            nextItem={{
              content: <Icon name={paginationRightSVG} size="18px" />,
              icon: true,
              'aria-disabled':
                currentPage === Math.ceil(dataList?.length / paginationSize),
              className:
                currentPage === Math.ceil(dataList?.length / paginationSize)
                  ? 'disabled'
                  : null,
            }}
          ></Pagination>
        </div>
      )}
    </Segment>
  );
};
