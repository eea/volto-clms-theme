import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Button,
  Checkbox,
  Input,
  Pagination,
  Segment,
} from 'semantic-ui-react';

import { Icon, Toast } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';
import PlaceHolder from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-thumbnail-placeholder.jpg';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import useCartState from '@eeacms/volto-clms-utils/cart/useCartState';

import './download-table.less';
import { useSchema } from '../Widgets/SchemaCreatorWidget';

import PropTypes from 'prop-types';

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */

function CclDownloadTable(props) {
  const locale = useSelector((state) => state.intl?.locale);
  const { dataset } = props;
  const { addCartItem, isLoggedIn } = useCartState();
  const [cartSelection, setCartSelection] = useState([]);
  const [currentPageItems, setCurrentPageItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCheckboxStatus, setpageCheckboxStatus] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState('');
  const [totalPages, setTotalPages] = useState(
    Math.ceil(dataset?.downloadable_files?.items.length / 10),
  );
  const intl = useIntl();
  const { data } = useSchema();
  const { schema } = data;

  // complete the selected file with dataset UID, title and a concat of dataset.UID and block id to get unique id for the whole web
  const prePackagedCollection = dataset?.downloadable_files?.items.map(
    (element) => {
      return {
        ...element,
        name: dataset.title,
        UID: dataset.UID,
        unique_id: `${dataset.UID}_${element['@id']}`,
      };
    },
  );

  const prepackage_grid = props.dataset['@id'].split('products');
  const prepackage_grid_image =
    prepackage_grid[0] + 'products/prepackages-grid.png/@@images/image';

  const messages = defineMessages({
    added_to_cart: {
      id: 'Added to cart',
      defaultMessage: 'Added to cart',
    },
    success: {
      id: 'Success',
      defaultMessage: 'Success',
    },
    prePackages_location_map: {
      id: 'Click to open pre-packages location map',
      defaultMessage: 'Click to open pre-packages location map',
    },
  });

  React.useEffect(() => {
    setCurrentPageItems(prePackagedCollection.slice(0, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    calcHeaderCheckboxStatus(currentPageItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartSelection, currentPage]);

  React.useEffect(() => {
    let fItems = prePackagedCollection.filter(
      (item) =>
        item?.title?.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
        item?.file?.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
        item?.area?.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
        item?.year?.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
        item?.version?.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
        item?.resolution
          ?.toLowerCase()
          .includes(filterText.toLocaleLowerCase()) ||
        item?.type?.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
        item?.format?.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
        item?.size?.toLowerCase().includes(filterText.toLocaleLowerCase()),
    );
    if (filterText) {
      setCurrentPageItems(fItems.slice(0, 10));
      setFilteredItems(fItems);
      setTotalPages(Math.ceil(fItems.length / 10));
    } else {
      setCurrentPageItems(prePackagedCollection.slice(0, 10));
      setFilteredItems(prePackagedCollection);
      setTotalPages(Math.ceil(prePackagedCollection.length / 10));
    }
    calcHeaderCheckboxStatus(currentPageItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText]);

  const calcHeaderCheckboxStatus = (currentPI) => {
    const currentPageSelection = currentPI.filter((item) =>
      cartSelection.includes(item.unique_id),
    );
    if (currentPageSelection.length === 10) {
      setpageCheckboxStatus(2);
    } else if (
      currentPI.length !== 0 &&
      currentPageSelection.length === currentPI.length
    ) {
      setpageCheckboxStatus(2);
    } else if (cartSelection.length > 0) {
      setpageCheckboxStatus(1);
    } else {
      setpageCheckboxStatus(0);
    }
  };

  const onPaginationChange = (e, { activePage }) => {
    setCurrentPage(activePage);
    if (filterText) {
      setCurrentPageItems(
        filteredItems.slice(activePage * 10 - 10, activePage * 10),
      );
    } else {
      setCurrentPageItems(
        prePackagedCollection.slice(activePage * 10 - 10, activePage * 10),
      );
    }
  };

  const selectCart = (id, checked) => {
    if (checked) setCartSelection(cartSelection.concat(id));
    else setCartSelection(cartSelection.filter((arr_id) => arr_id !== id));
  };

  const selectAllCart = (checked) => {
    const currentPageSelection = currentPageItems.filter((item) =>
      cartSelection.includes(item.unique_id),
    );
    let newCartSelection = [];
    if (checked && currentPageSelection.length > 0) {
      newCartSelection = [
        ...cartSelection,
        ...currentPageItems
          .filter((unique_id) => !currentPageSelection.includes(unique_id))
          .map((item) => item.unique_id),
      ];
    } else if (checked) {
      newCartSelection = [
        ...cartSelection,
        ...currentPageItems.map((item) => item.unique_id),
      ];
    } else {
      newCartSelection = [...cartSelection];
      currentPageItems.forEach((pageItem) => {
        newCartSelection = newCartSelection.filter(
          (cartUid) => pageItem.unique_id !== cartUid,
        );
      });
    }
    setCartSelection(newCartSelection);
  };

  const selectAllPagesCart = () => {
    setCartSelection(prePackagedCollection.map((item) => item.unique_id));
  };

  const addToCard = async () => {
    let selectedCartItems = prePackagedCollection
      .filter((item) => cartSelection.includes(item.unique_id) && item)
      // Get only UID and unique_id from selectedCartItems array of objects
      .map((item) => ({
        UID: item.UID,
        file_id: item['@id'],
        area: item.area,
        file: item.file,
        unique_id: item.unique_id,
      }));
    await addCartItem(selectedCartItems).then(() => {
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.added_to_cart)}
        />,
      );
    });
  };

  const clearSelection = () => {
    setCartSelection([]);
  };

  const HeaderCheckbox = () => {
    return pageCheckboxStatus === 1 ? (
      <Checkbox
        onChange={(e, data) => selectAllCart(data.checked)}
        defaultIndeterminate
      />
    ) : (
      <Checkbox
        onChange={(e, data) => selectAllCart(data.checked)}
        checked={pageCheckboxStatus === 2}
      />
    );
  };

  const contentOrDash = (content) => {
    return content || '-';
  };

  const hasSome = (field) => {
    return prePackagedCollection.filter((ppItem) => ppItem[field]).length > 0
      ? field
      : '';
  };

  const columns =
    prePackagedCollection.length > 0
      ? Object.keys(prePackagedCollection[0]).map((key) => {
          return hasSome(key);
        })
      : [];
  // const columns = [
  //   hasSome('title'),
  //   hasSome('file'),
  //   hasSome('area'),
  //   hasSome('year'),
  //   hasSome('version'),
  //   hasSome('resolution'),
  //   hasSome('type'),
  //   hasSome('format'),
  //   hasSome('size'),
  // ];
  const validcolums = columns.some((column) => !!column);

  console.log('schema', schema.fieldsets[0].fields);
  console.log('columns', columns);

  return (
    prePackagedCollection.length > 0 &&
    validcolums &&
    columns && (
      <div className="dataset-download-table">
        <h2>Download pre-packaged data collections</h2>
        {/* {prePackagedCollection.length === 0 && (
          <p>
            Please note that you can only download the latest version of our
            datasets from this website. If you are looking for older versions
            please contact us.
          </p>
        )} */}

        {dataset?.download_page_information?.data && (
          <StringToHTML string={dataset?.download_page_information?.data} />
        )}

        <Segment basic>
          {prePackagedCollection.length > 1 && (
            <div className="block search">
              <div className="search-wrapper">
                <div className="search-input">
                  <Input
                    id={`${props.id}-searchtext`}
                    placeholder={'Search in the pre-packaged data collection'}
                    fluid
                    onChange={(event, { value }) => {
                      setFilterText(value);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {isLoggedIn && (
            <>
              <strong>{` ${cartSelection.length} selected file(s)`}</strong>
              {cartSelection.length > 0 && (
                <>
                  {' - '}
                  <Button basic color="olive" onClick={clearSelection}>
                    Clear selection <Icon name={clearSVG} size={'20px'}></Icon>
                  </Button>
                </>
              )}
              {props.dataset.show_legend_on_prepackages && (
                <CclModal
                  trigger={
                    <CclButton
                      className="ccl-button ccl-button--default show_legend_on_prepackages"
                      to="#download"
                    >
                      {intl.formatMessage(messages.prePackages_location_map)}
                    </CclButton>
                  }
                  size={'medium'}
                >
                  <div className="image-modal">
                    <img
                      src={
                        prepackage_grid_image
                          ? prepackage_grid_image
                          : PlaceHolder
                      }
                      alt={'Placeholder'}
                    />
                  </div>
                </CclModal>
              )}
              {cartSelection.length !== prePackagedCollection.length && (
                <>
                  <br />
                  <Button basic color="olive" onClick={selectAllPagesCart}>
                    Select all
                  </Button>
                </>
              )}
            </>
          )}
        </Segment>
        <div className="custom-table dataset-table">
          <table>
            <thead>
              <tr>
                {isLoggedIn && (
                  <th>
                    <HeaderCheckbox />{' '}
                  </th>
                )}
                {columns
                  .sort(function (a, b) {
                    return (
                      schema.fieldsets[0].fields.indexOf(a) -
                      schema.fieldsets[0].fields.indexOf(b)
                    );
                  })
                  .map((column, key) => {
                    return (
                      column !== '@id' &&
                      column !== 'UID' &&
                      column !== 'unique_id' &&
                      column !== '' &&
                      column !== 'name' &&
                      column !== 'path' &&
                      column !== 'source' && (
                        <th key={key}>
                          {column.charAt(0).toUpperCase() + column.slice(1)}
                        </th>
                      )
                    );
                  })}
                {/* {columns.map((column) => {
                  return (
                    column !== '@id' &&
                    column !== 'UID' &&
                    column !== 'unique_id' &&
                    column !== '' && <th>{column}</th>
                  );
                })} */}
                {/* {columns.includes('title') && <th>Title</th>}
                {columns.includes('file') && <th>File name</th>}
                {columns.includes('area') && (
                  <th>{dataset.download_table_area_of_interest_title}</th>
                )}
                {columns.includes('year') && <th>Year</th>}
                {columns.includes('version') && <th>Version</th>}
                {columns.includes('resolution') && <th>Resolution</th>}
                {columns.includes('type') && <th>Type</th>}
                {columns.includes('format') && <th>Format</th>}
                {columns.includes('size') && <th>Size</th>} */}
              </tr>
            </thead>
            <tbody>
              {currentPageItems
                ? currentPageItems.map((dataset_file, key) => {
                    return (
                      <tr key={key}>
                        {isLoggedIn && (
                          <td>
                            <Checkbox
                              onChange={(e, data) =>
                                selectCart(dataset_file.unique_id, data.checked)
                              }
                              checked={cartSelection.includes(
                                dataset_file.unique_id,
                              )}
                              className="ccl-checkbox ccl-form-check-input"
                            />
                          </td>
                        )}
                        {columns.map((column, i) => {
                          let data = dataset_file?.[`${column}`];
                          return (
                            column !== '@id' &&
                            column !== 'UID' &&
                            column !== 'unique_id' &&
                            column !== '' &&
                            column !== 'name' &&
                            column !== 'path' &&
                            column !== 'source' && (
                              <td key={i}>
                                {column === 'type' ? (
                                  <span
                                    className={
                                      'tag tag-' +
                                      (dataset_file?.type?.toLowerCase() ||
                                        'raster')
                                    }
                                  >
                                    {contentOrDash(dataset_file?.type)}
                                  </span>
                                ) : (
                                  contentOrDash(data)
                                )}
                              </td>
                            )
                          );
                        })}
                        {/* {columns.includes('title') && (
                          <td>{contentOrDash(dataset_file?.title)}</td>
                        )}
                        {columns.includes('file') && (
                          <td>{contentOrDash(dataset_file?.file)}</td>
                        )}
                        {columns.includes('area') && (
                          <td>{contentOrDash(dataset_file?.area)}</td>
                        )}
                        {columns.includes('year') && (
                          <td>{contentOrDash(dataset_file?.year)}</td>
                        )}
                        {columns.includes('version') && (
                          <td>{contentOrDash(dataset_file?.version)}</td>
                        )}
                        {columns.includes('resolution') && (
                          <td>{contentOrDash(dataset_file?.resolution)}</td>
                        )}
                        {columns.includes('type') && (
                          <td>
                            <span
                              className={
                                'tag tag-' +
                                (dataset_file?.type?.toLowerCase() || 'raster')
                              }
                            >
                              {contentOrDash(dataset_file?.type)}
                            </span>
                          </td>
                        )}
                        {columns.includes('format') && (
                          <td>{contentOrDash(dataset_file?.format)}</td>
                        )}
                        {columns.includes('size') && (
                          <td>{contentOrDash(dataset_file?.size)}</td>
                        )} */}
                      </tr>
                    );
                  })
                : false}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <Pagination
                activePage={currentPage}
                totalPages={totalPages}
                onPageChange={(e, { activePage }) => {
                  onPaginationChange(e, { activePage });
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
                  'aria-disabled': currentPage === totalPages,
                  className: currentPage === totalPages ? 'disabled' : null,
                }}
              ></Pagination>
            </div>
          )}
        </div>

        <CclButton
          isButton={true}
          onClick={() => addToCard()}
          disabled={!isLoggedIn || cartSelection.length === 0}
        >
          Add to cart
        </CclButton>

        {isLoggedIn && <CclButton url={`/${locale}/cart`}>Show cart</CclButton>}

        <br></br>
      </div>
    )
  );
}

CclDownloadTable.propTypes = {
  type: PropTypes.string,
  dataset: PropTypes.shape({
    downloadable_files: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          year: PropTypes.string,
          resolution: PropTypes.string,
          type: PropTypes.string,
          format: PropTypes.string,
          version: PropTypes.string,
          size: PropTypes.string,
        }),
      ),
    }),
  }),
};
export default CclDownloadTable;
