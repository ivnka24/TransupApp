import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { instance } from "../instance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import * as XLSX from "xlsx";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Use state for pageSize
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("NIK");
  const [alert, setAlert] = useState("");
  const [totalData, setTotalData] = useState(0);

  const navigate = useNavigate();

  const fetchCustomer = async (page = 1, pageSize = 10) => {
    try {
      const { data } = await instance({
        url: "customer",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        params: {
          page,
          pageSize,
          [searchType]: searchQuery,
        },
      });

      setCustomers(data.customers);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
      setTotalData(data.totalRecords);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "customer_data.xlsx");
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await instance({
          url: `customer/${id}`,
          method: "delete",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        setAlert("Customer deleted successfully.");
        fetchCustomer(currentPage, pageSize);
      }
    } catch (error) {
      console.error(error);
      setAlert("Failed to delete customer.");
    } finally {
      setTimeout(() => setAlert(""), 3000);
    }
  };

  const handlePageSizeChangeHandler = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
    fetchCustomer(1, newSize);
  };

  useEffect(() => {
    fetchCustomer(currentPage, pageSize);
  }, [currentPage, searchQuery, searchType, pageSize]);

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalData);

  return (
    <>
      {alert && (
        <div className="bg-blue-500 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {alert}
            </Alert>
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row bg-blue-400 min-h-screen font-poppins">
        <div className="w-full lg:w-96 py-8 flex flex-col items-center lg:mr-8 px-4 lg:px-8 justify-end">
          <img src={logo} width={200} height={200} className="mb-4" />
          <hr className="border-t-4 border-gray-100 w-32" />
          <p className="text-sm font-normal text-gray-100 mt-4 text-center">
            Platform Jasa Sewa Motor di Kota Probolinggo
          </p>
        </div>
        <div className="w-full lg:flex-1 p-4 lg:p-8 flex flex-col">
          <h1 className="text-center text-white text-4xl font-bold mb-6">
            Data Customer
          </h1>
          <div className="bg-gray-100 rounded-lg border border-gray-300 flex flex-col min-h-[calc(100vh-200px)]">
            <div className="flex justify-between items-center bg-white p-4 border-b border-gray-300">
              <div className="flex gap-[4px]">
                <button
                  className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
                  onClick={() => navigate("add-customer")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Customer
                </button>
                <button
                  className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
                  onClick={() => handleDownloadExcel()}
                >
                  Download Excel
                </button>
              </div>

              <div className="flex flex-col items-center bg-white rounded p-1 shadow">
                <div>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="bg-transparent outline-none mr-1 font-normal"
                  >
                    <option value="NIK">NIK</option>
                    <option value="namaLengkap">Nama Lengkap</option>
                  </select>
                  <span className="border-r border-gray-300 h-full mx-2"></span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="bg-transparent outline-none flex-grow"
                  />
                  <button
                    onClick={() => fetchCustomer(1, pageSize)}
                    className="text-blue-500 ml-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M17.65 10.35a7.3 7.3 0 11-14.6 0 7.3 7.3 0 0114.6 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="px-4 py-6 flex-1 overflow-x-auto">
              {customers.length === 0 ? (
                <p className="text-center text-gray-600">No data available</p>
              ) : (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                  <thead>
                    <tr className="bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase">
                      <th className="px-4 py-3 border-b">NIK</th>
                      <th className="px-4 py-3 border-b">Nama Lengkap</th>
                      <th className="px-4 py-3 border-b">Alamat</th>
                      <th className="px-4 py-3 border-b">Domisili</th>
                      <th className="px-4 py-3 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {customer.NIK}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {customer.namaLengkap}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {customer.alamat}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {customer.domisili}
                        </td>
                        <td className="flex gap-2 px-4 py-4 text-sm text-blue-900">
                          <button
                            className="text-blue-500 hover:text-blue-600"
                            onClick={() =>
                              navigate(`edit-customer/${customer.id}`)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteCustomer(customer.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="flex justify-between items-center px-4 py-2 border-t border-gray-300 bg-white">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-[4px]">
                  <span className="mr-2 text-sm text-gray-600">
                    Rows per page:
                  </span>
                  <select
                    className="border-gray-300 rounded shadow-sm mr-2"
                    onChange={handlePageSizeChangeHandler}
                    value={pageSize}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{startIndex}</span>{" "}
                      to <span className="font-medium">{endIndex}</span> of{" "}
                      <span className="font-medium">{totalData}</span> results
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    currentPage < totalPages && setCurrentPage(currentPage + 1)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
