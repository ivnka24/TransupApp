import React, { createContext, useState } from "react";
import { useTable } from "../hooks/useTable";

export const TableContext = createContext("default value");

export const TableProvider = ({ children }) => {
  const [endpoint, setEndpoint] = useState("");

  const {
    data,
    page,
    handlePageChange,
    filter,
    handleFilterChange,
    sort,
    handleSortChange,
    loading,
    totalPages,
  } = useTable(endpoint);

  return (
    <TableContext.Provider
      value={{
        data,
        page,
        handlePageChange,
        filter,
        handleFilterChange,
        sort,
        handleSortChange,
        loading,
        totalPages,
        setEndpoint,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
