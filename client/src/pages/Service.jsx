import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTable } from "../hooks/useTable";
import { useState } from "react";
import { instance as axios } from "../instance";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import * as XLSX from "xlsx";
import { UpdateServiceModal } from "../components/UpdateServiceModal";

export function Service() {
  const navigate = useNavigate();
  const {
    data,
    loading,
    page,
    totalPages,
    handlePageChange,
    handleFilterChange,
    handleSortChange,
    handleStartDateChange,
    handleEndDateChange,
    handleStatusChange,
    updateEndpoint,
    handlePageSizeChange,
    refetch,
    totalData,
    sizePage,
  } = useTable("service");

  const [status, setStatus] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDoneServices = async (id) => {
    try {
      const { data } = await axios.patch(`service/${id}`);
      setSnackbarMessage(data.message);
      setSnackbarSeverity("success");
      refetch();
    } catch (error) {
      setSnackbarMessage("Failed to mark service as done.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };
  const handleDownloadExcel = () => {
    const transformedData = data.map((item) => ({
      id: item.id,
      tanggalService: item.tanggalService.split("T")[0],
      debet: item.debet,
      kredit: item.kredit,
      deskripsi: item.deskripsi,
      statusService: item.statusService,
      kendaraanId: item.Kendaraan.id,
      jenisKendaraan: item.Kendaraan.jenisKendaraan,
      platMotor: item.Kendaraan.platMotor,
    }));

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Services");

    XLSX.writeFile(workbook, "service_data.xlsx");
  };

  const handlePageSizeChangeHandler = (e) => {
    handlePageSizeChange(parseInt(e.target.value, 10));
  };

  const onSearchClick = () => {
    handleStartDateChange(startDate);
    handleEndDateChange(endDate);
    handleFilterChange(status);
    refetch();
  };

  const openUpdateModal = (id) => {
    setSelectedServiceId(id);
    setModalOpen(true);
  };

  const closeUpdateModal = () => {
    setModalOpen(false);
    setSelectedServiceId(null);
    refetch();
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row bg-blue-400 min-h-screen font-poppins">
        <div className="w-full lg:w-96 py-8 flex flex-col items-center lg:mr-8 px-4 lg:px-8 justify-end">
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
        <div className="w-full lg:flex-1 p-4 lg:p-8 flex flex-col">
          <h1 className="text-center text-white text-4xl font-bold mb-6">
            Data Services
          </h1>
          <div className="bg-gray-100 rounded-lg border border-gray-300 flex flex-col min-h-[calc(100vh-200px)]">
            <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-4 border-b border-gray-300">
              <button
                className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 mb-4 lg:mb-0"
                onClick={() => navigate("add-services")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a 1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Services
              </button>
              <div className="flex items-center gap-4">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex items-center bg-white rounded p-1 shadow mb-4 lg:mb-0">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-transparent outline-none mr-1 font-normal"
                >
                  <option value="">Status</option>
                  <option value="Proses Service">Proses Service</option>
                  <option value="Selesai Service">Selesai Service</option>
                </select>
                <span className="border-r border-gray-300 h-full mx-2"></span>

                <button
                  onClick={onSearchClick}
                  className="text-blue-500 ml-2"
                  aria-label="Search"
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
                        <th className="px-4 py-3 border-b">Nama Kendaraan</th>
                        <th className="px-4 py-3 border-b">Tanggal Service</th>
                        <th className="px-4 py-3 border-b">Debet</th>
                        <th className="px-4 py-3 border-b">Kredit</th>
                        <th className="px-4 py-3 border-b">Deskripsi</th>
                        <th className="px-4 py-3 border-b">Status Service</th>
                        <th className="px-4 py-3 border-b">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {service.Kendaraan.jenisKendaraan}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {new Date(
                              service.tanggalService
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {service.debet}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {service.kredit}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {service.deskripsi}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {service.statusService === "Proses Service" ? (
                              <span className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">
                                {service.statusService}
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                {service.statusService}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-start gap-2 flex">
                            <>
                              {service.statusService !== "Selesai Service" ? (
                                <>
                                  <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => openUpdateModal(service.id)}
                                  >
                                    Update
                                  </button>
                                </>
                              ) : (
                                "-"
                              )}
                              {service.statusService === "Selesai Service" ? (
                                "-"
                              ) : (
                                <>
                                  <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() =>
                                      handleDoneServices(service.id)
                                    }
                                  >
                                    Selesai
                                  </button>
                                </>
                              )}
                            </>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between mt-4 font-poppins items-center">
                    <div className="flex gap-[6px]">
                      <div className="flex items-center">
                        <span className="mr-2 text-sm text-gray-600">
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
                      </div>
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
                        className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
                        onClick={() => handleDownloadExcel()}
                      >
                        Download Excel
                      </button>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <UpdateServiceModal
        open={modalOpen}
        onClose={closeUpdateModal}
        serviceId={selectedServiceId}
      />
    </div>
  );
}
