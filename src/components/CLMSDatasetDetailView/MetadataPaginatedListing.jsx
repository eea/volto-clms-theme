import React from 'react';
import { Input, Pagination } from 'semantic-ui-react';

import { Icon } from '@plone/volto/components';
import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';

import { useFilteredPagination } from '../CclUtils/useFilteredPagination';
export const MetadataPaginatedListing = (props) => {
  const { geonetwork_identifiers_items, id } = props;
  const use_pagination = useFilteredPagination(
    geonetwork_identifiers_items,
    10,
    id,
  );
  const p_functions = use_pagination.functions;
  const p_data = use_pagination.data;
  const { pagination, currentPage, paginationSize, dataList } = p_data;
  return (
    <>
      {paginationSize < geonetwork_identifiers_items.length && (
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
      <ul>
        {pagination.map((geonetwork, key) => (
          <li key={key}>
            <strong>{geonetwork.title}</strong> -{' '}
            <a
              href={
                geonetwork.type === 'EEA'
                  ? `https://sdi.eea.europa.eu/catalogue/srv/api/records/${geonetwork.id}/formatters/xsl-view?output=pdf&language=eng&approved=true`
                  : `https://globalland.vito.be/geonetwork/srv/api/records/${geonetwork.id}/formatters/xsl-view?root=div&output=pdf`
              }
              rel="noreferrer"
              target="_blank"
            >
              PDF
            </a>{' '}
            -{' '}
            <a
              href={
                geonetwork.type === 'EEA'
                  ? `https://sdi.eea.europa.eu/catalogue/srv/api/records/${geonetwork.id}/formatters/xml?approved=true`
                  : `https://globalland.vito.be/geonetwork/srv/api/records/${geonetwork.id}/formatters/xml?attachment=true`
              }
              rel="noreferrer"
              target="_blank"
            >
              XML
            </a>
          </li>
        ))}
      </ul>
      {dataList.length / paginationSize > 1 && (
        <div className="pagination-wrapper">
          <Pagination
            activePage={currentPage}
            totalPages={Math.ceil(dataList.length / paginationSize)}
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
                currentPage === Math.ceil(dataList.length / paginationSize),
              className:
                currentPage === Math.ceil(dataList.length / paginationSize)
                  ? 'disabled'
                  : null,
            }}
          ></Pagination>
        </div>
      )}
    </>
  );
};
