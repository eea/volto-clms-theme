import { useEffect, useState } from 'react';
import { dynamicSort } from './dynamicSort';
export const useFilteredPagination = (
  original_data = [],
  defaultPaginationSize = 10,
) => {
  const [originalDataList, setOriginalDataList] = useState(original_data);
  const [dataList, setDataList] = useState(original_data);
  const [paginationSize, setPaginationSize] = useState(defaultPaginationSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(
    original_data.slice(
      (currentPage - 1) * paginationSize,
      (currentPage - 1) * paginationSize + paginationSize,
    ),
  );
  const [search, setSearch] = useState({});
  const applySearch = (e, { value }, field, setter) => {
    const new_filters = { [field]: value };
    setSearch(new_filters);
  };

  const applyOrder = (criteria) => {
    setDataList([...dataList.sort(dynamicSort(criteria))]);
  };
  const clearSearch = () => {
    setDataList(originalDataList);
    setSearch({});
  };
  useEffect(() => {
    let filtered_data_list = [...originalDataList];
    Object.entries(search).forEach((filter) => {
      const filter_key = filter[0];
      const filter_data = filter[1];
      if (filter_data.length > 0) {
        filtered_data_list = filtered_data_list.filter((data) => {
          return data[filter_key]
            .toLowerCase()
            .includes(filter_data.toLowerCase());
        });
      }
    });
    setDataList(filtered_data_list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    setPagination(
      dataList.slice(
        (currentPage - 1) * paginationSize,
        (currentPage - 1) * paginationSize + paginationSize,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataList, currentPage, paginationSize]);

  return {
    functions: {
      setCurrentPage,
      setPaginationSize,
      applySearch,
      setDataList,
      setOriginalDataList,
      clearSearch,
      applyOrder,
    },
    data: {
      pagination,
      currentPage,
      paginationSize,
      originalDataList,
      dataList,
      search,
    },
  };
};
