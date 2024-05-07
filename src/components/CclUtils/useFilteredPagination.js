import { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import { dynamicSort } from './dynamicSort';
export const useFilteredPagination = (
  original_data = [],
  defaultPaginationSize = 10,
  id = '',
  searchParamsExecution = () => {},
) => {
  const [originalDataList, setOriginalDataList] = useState(original_data);
  const [dataList, setDataList] = useState(original_data);
  const [paginationSize, setPaginationSize] = useState(defaultPaginationSize);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPage_ref = useRef(currentPage);
  const [pagination, setPagination] = useState(
    original_data.slice(
      (currentPage - 1) * paginationSize,
      (currentPage - 1) * paginationSize + paginationSize,
    ),
  );
  const history = useHistory();
  const location = useLocation();
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
    setDataList(originalDataList);
  }, [originalDataList]);
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
    dataList.length > 0 &&
      setPagination(
        dataList.slice(
          (currentPage - 1) * paginationSize,
          (currentPage - 1) * paginationSize + paginationSize,
        ),
      );
    dataList.length === 0 && setPagination([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataList, currentPage, paginationSize]);
  useEffect(() => {
    if (id) {
      if (currentPage !== currentPage_ref.current) {
        history.replace({
          search: qs.stringify({
            ...qs.parse(location.search),
            [`page-${id}`]: currentPage,
          }),
        });
      } else if (
        qs.parse(location.search)?.[`page-${id}`] &&
        qs.parse(location.search)?.[`page-${id}`] !== currentPage
      ) {
        // add here the execution on the first load with search params such as pagination
        searchParamsExecution();
        setCurrentPage(qs.parse(location.search)?.[`page-${id}`]);
      }
    }
    currentPage_ref.current = currentPage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
