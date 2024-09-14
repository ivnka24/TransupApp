import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTable } from "../hooks/useTable";
import { instance } from "../instance";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export function Kas() {
  const navigate = useNavigate();
  const {
    data,
    loading,
    page,
    totalPages,
    handlePageChange,
    handleStartDateChange,
    handleEndDateChange,
    refetch,
    startDate,
    endDate,
    sizePage,
    handlePageSizeChange,
    totalData,
  } = useTable("/kas");
  const [dataBalance, setDataBalance] = useState({});

  // Handle date filter changes
  const onStartDateChange = (e) => {
    handleStartDateChange(e.target.value);
    refetch(); // Refetch data with updated date filter
  };

  const onEndDateChange = (e) => {
    handleEndDateChange(e.target.value);
    refetch(); // Refetch data with updated date filter
  };

  const handlePageSizeChangeHandler = (e) => {
    handlePageSizeChange(parseInt(e.target.value, 10));
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kas");
    XLSX.writeFile(workbook, "kas_data.xlsx");
  };

  const fetchBalance = async () => {
    try {
      const response = await instance.get("/kas/balance");
      setDataBalance(response.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [startDate, endDate]); // Refetch balance when startDate or endDate changes

  return (
    <div className="flex flex-col lg:flex-row bg-blue-400 min-h-screen font-poppins">
      <div className="w-full lg:w-96 py-8 flex flex-col items-center lg:mr-8 px-4 lg:px-8 justify-between">
        <div className="w-full max-w-sm">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-xl p-6 mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Kas Terbaru</h2>
            </div>
            <div className="mb-6">
              <p className="text-2xl font-bold">
                Rp {dataBalance?.balance || "0"}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs">Pemilik</p>
                <p className="text-sm font-semibold">Transup</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img
            src={logo}
            width={200}
            height={200}
            className="mb-4"
            alt="Logo"
          />
          <hr className="border-t-4 border-gray-100 w-32" />
          <p className="text-sm font-normal text-gray-100 mt-4 text-center">
            Platform Jasa Sewa Motor di Kota Probolinggo
          </p>
        </div>
      </div>

      <div className="w-full lg:flex-1 p-4 lg:p-8 flex flex-col">
        <h1 className="text-center text-white text-4xl font-bold mb-6">
          Data Kas
        </h1>
        <div className="bg-gray-100 rounded-lg border border-gray-300 flex flex-col min-h-[calc(100vh-200px)]">
          <div className="bg-white p-4 border-b border-gray-300">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
              <div className="flex gap-[3px]">
                <button
                  className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 mb-4 lg:mb-0"
                  onClick={() => navigate("add-kas")}
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
                  Add Kas
                </button>
                <button
                  className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
                  onClick={() => handleDownloadExcel()}
                >
                  Download Excel
                </button>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="date"
                  value={startDate}
                  onChange={onStartDateChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={onEndDateChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-6 flex-1 overflow-x-auto">
            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : data.length === 0 ? (
              <p className="text-center text-gray-600">No data available</p>
            ) : (
              <>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                  <thead>
                    <tr className="bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase">
                      <th className="px-4 py-3 border-b">Keterangan</th>
                      <th className="px-4 py-3 border-b">Tanggal</th>
                      <th className="px-4 py-3 border-b">Deskripsi</th>
                      <th className="px-4 py-3 border-b">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {service.keterangan}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {new Date(service.tanggal).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {service.deskripsi}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {service.keterangan === "Pemasukan" ? "+ " : "- "}
                          {service.jumlah}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-4 font-poppins">
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-600 gap-[2px]">
                      Rows per page:
                    </span>
                    <select
                      className="border-gray-300 rounded shadow-sm"
                      onChange={handlePageSizeChangeHandler}
                      value={sizePage}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                          {(page - 1) * 10 + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {page * 10 > totalData ? totalData : page * 10}
                        </span>{" "}
                        of <span className="font-medium">{totalData}</span>{" "}
                        results
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className={`px-4 py-2 rounded ${
                        page <= 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className={`px-4 py-2 rounded ${
                        page === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
