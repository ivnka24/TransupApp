import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { useTable } from "../hooks/useTable";
import { instance } from "../instance";
import * as XLSX from "xlsx";

export default function Aset() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const [status, setStatus] = useState("");

  const {
    data,
    loading,
    page,
    totalPages,
    totalData,
    handlePageChange,
    handleFilterChange,
    handleSortChange,
    updateEndpoint,
    handlePageSizeChange, 
    refetch,
  } = useTable("kendaraan", 1, 10); 

  useEffect(() => {
    updateEndpoint("kendaraan");
  }, [updateEndpoint]);

  const handleDelete = async (id) => {
    try {
      const { data } = await instance.delete(`kendaraan/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setAlert(data.message);
      refetch();
    } catch (error) {
      console.error("Error deleting item:", error);
      setAlert("Failed to delete item.");
    } finally {
      setTimeout(() => setAlert(""), 3000);
    }
  };

  const handleDownloadExcel = () => {
    const generateData = data.map((el, i) => ({
      no : i+1,
      id: el.id,
      jenisKendaraan: el.jenisKendaraan,
      platMotor: el.platMotor,
      ccKendaraan: el.ccKendaraan,
      noRangka: el.noRangka,
      noMesin: el.noMesin,
      tanggalPajak: el.pajak.split("T")[0],
      status: el.status,
      kepemilikan: el.kepemilikan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(generateData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Kendaraan");

    XLSX.writeFile(workbook, "kendaraan_data.xlsx");
  };

  const handleStatusFilterChange = (e) => {
    setStatus(e.target.value);
    handleFilterChange(e.target.value);
    refetch();
  };

  const handlePageSizeChangeHandler = (e) => {
    handlePageSizeChange(parseInt(e.target.value, 10));
  };

  return (
    <>
      {alert && (
        <div className="bg-blue-500 py-2 font-poppins">
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
            Data Kendaraan
          </h1>
          <div className="bg-gray-100 rounded-lg border border-gray-300 flex flex-col min-h-[calc(100vh-200px)]">
            <div className="flex justify-between items-center bg-white p-4 border-b border-gray-300">
              <div className="flex gap-[6px]">
                <button
                  className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
                  onClick={() => navigate("add-aset")}
                >
                  Add Kendaraan
                </button>
                <button
                  className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
                  onClick={() => handleDownloadExcel()}
                >
                  Download Excel
                </button>
              </div>
              <select
                value={status}
                onChange={handleStatusFilterChange}
                className="bg-transparent outline-none mr-1 font-normal"
              >
                <option value="">Status</option>
                <option value="No Ready">NO READY</option>
                <option value="Ready">READY</option>
                <option value="Service">SERVICE</option>
              </select>
            </div>
            <div className="px-4 py-6 flex-1">
              {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
              ) : data.length === 0 ? (
                <p className="text-center text-gray-600">No data available</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                    <thead>
                      <tr className="bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase">
                        <th className="px-4 py-3 border-b">Jenis Kendaraan</th>
                        <th className="px-4 py-3 border-b">Plat</th>
                        <th className="px-4 py-3 border-b">CC</th>
                        <th className="px-4 py-3 border-b">No Rangka</th>
                        <th className="px-4 py-3 border-b">No Mesin</th>
                        <th className="px-4 py-3 border-b">Tanggal Pajak</th>
                        <th className="px-4 py-3 border-b">Status</th>
                        <th className="px-4 py-3 border-b">Kepemilikan</th>
                        <th className="px-4 py-3 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((el) => (
                        <tr key={el.id} className="text-sm text-gray-700">
                          <td className="px-4 py-3 border-b">
                            {el.jenisKendaraan}
                          </td>
                          <td className="px-4 py-3 border-b">{el.platMotor}</td>
                          <td className="px-4 py-3 border-b">
                            {el.ccKendaraan}
                          </td>
                          <td className="px-4 py-3 border-b">{el.noRangka}</td>
                          <td className="px-4 py-3 border-b">{el.noMesin}</td>
                          <td className="px-4 py-3 border-b">
                            {el.pajak.split("T")[0]}
                          </td>
                          <td className="px-4 py-3 border-b">{el.status}</td>
                          <td className="px-4 py-3 border-b">
                            {el.kepemilikan}
                          </td>
                          <td className="px-4 py-3 border-b">
                            <button
                              className="text-red-500 font-bold hover:text-red-700"
                              onClick={() => handleDelete(el.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {/* Pagination and Page Size Selector */}
            <div className="bg-white px-4 py-3 border-t border-gray-300 flex items-center justify-between sm:px-6">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{(page - 1) * 10 + 1}</span> to{" "}
                  <span className="font-medium">
                    {page * 10 > totalData ? totalData : page * 10}
                  </span>{" "}
                  of <span className="font-medium">{totalData}</span> results
                </p>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-600">
                  Rows per page:
                </span>
                <select
                  className="border-gray-300 rounded shadow-sm"
                  onChange={handlePageSizeChangeHandler}
                  defaultValue={10}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <nav
                  className="ml-4 relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
