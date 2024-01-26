import React, { useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import { useSelector } from 'react-redux';
import { slugify } from '@plone/volto/helpers/Utils/Utils';

/**
 * @function numberOfPaginatedBlocks
 * @description A function to search blocks with pagination, return the number of blocks with pagination possibility.
 * @returns {string} Example: 2
 */

const numberOfPaginatedBlocks = (blocks, blocksLayout) => {
  const blockTypesWithPagination = ['search', 'listing'];
  const total = blocksLayout.reduce((acc, blockId) => {
    if (blockTypesWithPagination.includes(blocks[blockId]['@type'])) {
      return 1 + acc;
    } else if (
      'tabs_block' === blocks[blockId]['@type'] &&
      blocks[blockId].data?.blocks &&
      blocks[blockId].data?.blocks_layout?.items
    ) {
      const tab_items = blocks[blockId].data?.blocks_layout?.items;
      const tab_blocks = blocks[blockId].data?.blocks;
      const tab_paginations = tab_items.reduce((acc, blockId) => {
        return (
          acc +
          numberOfPaginatedBlocks(
            tab_blocks[blockId].blocks,
            tab_blocks[blockId].blocks_layout?.items,
          )
        );
      }, 0);
      return (
        tab_paginations +
        numberOfPaginatedBlocks(
          blocks[blockId].data?.blocks,
          blocks[blockId].data?.blocks_layout?.items,
        ) +
        acc
      );
    } // else if (/* TODO: add the support for other container blocks. fe: accordion */){}
    return acc;
  }, 0);
  return total;
};

/**
 * @function useCreatePageQueryStringKey
 * @description A hook that creates a key with an id if there are multiple blocks with pagination.
 * @returns {string} Example: page || page_012345678
 */
const useCreatePageQueryStringKey = (id) => {
  const blocks = useSelector((state) => state?.content?.data?.blocks) || [];
  const blocksLayout =
    useSelector((state) => state?.content?.data?.blocks_layout?.items) || [];
  const paginatedBlocks = numberOfPaginatedBlocks(blocks, blocksLayout);
  return paginatedBlocks > 1 ? slugify(`page-${id}`) : 'page';
};

const useGetBlockType = (id) => {
  const blocks = useSelector((state) => state?.content?.data?.blocks) || [];
  const block = blocks[id];
  return block ? block?.['@type'] : null;
};

/**
 * A pagination helper that tracks the query and resets pagination in case the
 * query changes.
 */
export const usePagination = (id = null, defaultPage = 1) => {
  const location = useLocation();
  const history = useHistory();
  const pageQueryStringKey = useCreatePageQueryStringKey(id);
  const block_type = useGetBlockType(id);
  const pageQueryParam =
    qs.parse(location.search)[pageQueryStringKey] || defaultPage;
  const [currentPage, setCurrentPageState] = React.useState(
    parseInt(pageQueryParam),
  );
  const setCurrentPage = (page) => {
    setCurrentPageState(page);
    const newParams = {
      ...qs.parse(location.search),
      [pageQueryStringKey]: page,
    };
    history.push({ search: qs.stringify(newParams) });
  };

  const queryRef = useRef(qs.parse(location.search)?.query);
  useEffect(() => {
    if (
      queryRef.current !== qs.parse(location.search)?.query &&
      block_type === 'search'
    ) {
      setCurrentPageState(defaultPage);
      const newParams = {
        ...qs.parse(location.search),
        [pageQueryStringKey]: defaultPage,
      };
      delete newParams[pageQueryStringKey];
      history.replace({ search: qs.stringify(newParams) });
      queryRef.current = qs.parse(location.search)?.query;
    } else {
      setCurrentPageState(
        parseInt(
          qs.parse(location.search)?.[pageQueryStringKey] || defaultPage,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, block_type]);

  return {
    currentPage,
    setCurrentPage,
  };
};
