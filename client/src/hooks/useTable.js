import { useState, useEffect, useCallback } from "react";
import { instance as axios } from "../instance";

export const useTable = (initialEndpoint, initialPage = 1, pageSize = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState({ key: "", direction: "" });
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [totalData, setTotalData] = useState(0);
  const [sizePage, setSizePage] = useState(pageSize);

  const buildQueryParams = () => {
    const params = {
      page,
      pageSize: sizePage,
      ...(filter && { filter }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(status && { status }),
      ...(sort.key && { sort: `${sort.key}:${sort.direction}` }),
    };
    console.log("Query Parameters:", params);
    return params;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(endpoint, {
        params: buildQueryParams(),
      });
      // console.log(response);

      setData(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      setTotalData(response.data.pagination.pageSize);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, page, startDate, endDate, status, sort, filter, sizePage]);

  const handlePageChange = (newPage) => setPage(newPage);
  const handleFilterChange = (newFilter) => setFilter(newFilter);
  const handleSortChange = (key, direction) => setSort({ key, direction });
  const updateEndpoint = (newEndpoint) => setEndpoint(newEndpoint);
  const handleStartDateChange = (date) => setStartDate(date);
  const handleEndDateChange = (date) => setEndDate(date);
  const handleStatusChange = (newStatus) => setStatus(newStatus);
  const handlePageSizeChange = (newPageSize) => setSizePage(newPageSize);

  const refetch = useCallback(() => {
    fetchData();
  }, [endpoint, page, startDate, endDate, status, sort, sizePage]);

  return {
    data,
    loading,
    page,
    totalPages,
    filter,
    startDate,
    endDate,
    status,
    sort,
    handlePageChange,
    handleFilterChange,
    handleSortChange,
    handleStartDateChange,
    handleEndDateChange,
    handleStatusChange,
    updateEndpoint,
    refetch,
    totalData,
    handlePageSizeChange,
    sizePage,
  };
};
