import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import logo from "../assets/logo.png";
import { useTable } from "../hooks/useTable";
import { instance as axios } from "../instance";
import * as XLSX from "xlsx";
export function Rental() {
  const navigate = useNavigate();

  // State for additional filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  // State for Snackbar and Alert Message
  const [messageAlert, setMessageAlert] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [returnDate, setReturnDate] = useState("");

  const {
    data: rentals,
    loading,
    page,
    totalPages,
    filter,
    handlePageChange,
    refetch,
    handleStartDateChange,
    handleEndDateChange,
    handleFilterChange,
    handlePageSizeChange,
    sizePage,
    totalData,
  } = useTable("/sewa");

  const handleDoneRental = async (id) => {
    try {
      const { data } = await axios.patch(`sewa/selesai/${id}`);
      console.log(data);

      setMessageAlert(data.message);
      setAlertSeverity("success");
      setOpenSnackbar(true);
      refetch();
    } catch (error) {
      setMessageAlert("Failed to complete rental.");
      setAlertSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSearch = () => {
    console.log(filter);

    handleStartDateChange(startDate);
    handleEndDateChange(endDate);
    handleFilterChange(status);
    refetch();
  };

  const handlePageSizeChangeHandler = (e) => {
    handlePageSizeChange(parseInt(e.target.value, 10));
  };

  const handleDownloadExcel = () => {
    const generateData = rentals.map((rental) => ({
      id: rental.id,
      idCustomer: rental.idCustomer,
      namaCustomer: rental.Customer.namaLengkap,
      jenisKendaraan: rental.Kendaraan.jenisKendaraan,
      platMotor: rental.Kendaraan.platMotor,
      hargaSewa: rental.hargaSewa,
      tanggalSewa: rental.tanggalSewa.split("T")[0],
      tanggalKembali: rental.tanggalKembali
        ? rental.tanggalKembali.split("T")[0]
        : "",
      tujuan: rental.tujuan,
      status: rental.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(generateData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Rentals");

    XLSX.writeFile(workbook, "rental_data.xlsx");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = (rental) => {
    setSelectedRental(rental);
    setReturnDate(rental.tanggalKembali || "");
    setIsModalOpen(true);
  };

  const handleUpdateReturnDate = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    if (returnDate < today) {
      setMessageAlert("Tanggal kembali tidak boleh kurang dari hari ini.");
      setAlertSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (selectedRental) {
      try {
        await axios.patch(`sewa/${selectedRental.id}`, {
          tanggalKembali: returnDate,
        });
        setMessageAlert("Tanggal kembali berhasil di update");
        setAlertSeverity("success");
        setOpenSnackbar(true);
        handleModalClose();
        refetch();
      } catch (error) {
        setMessageAlert("Failed to update return date.");
        setAlertSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-blue-400 min-h-screen font-poppins">
      <div className="w-full lg:w-96 py-8 flex flex-col items-center lg:mr-8 px-4 lg:px-8 justify-end">
        <img src={logo} width={200} height={200} className="mb-4" alt="Logo" />
        <hr className="border-t-4 border-gray-100 w-32" />
        <p className="text-sm font-normal text-gray-100 mt-4 text-center">
          Platform Jasa Sewa Motor di Kota Probolinggo
        </p>
      </div>
      <div className="w-full lg:flex-1 p-4 lg:p-8 flex flex-col">
        <h1 className="text-center text-white text-4xl font-bold mb-6">
          Data Rental
        </h1>
        <div className="bg-gray-100 rounded-lg border border-gray-300 flex flex-col min-h-[calc(100vh-200px)]">
          <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-4 border-b border-gray-300">
            <div className="flex gap-[4px]">
              <button
                className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 mb-4 lg:mb-0"
                onClick={() => navigate("add-rental")}
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
                Add Rental
              </button>
              <button
                className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
                onClick={() => handleDownloadExcel()}
              >
                Download Excel
              </button>
            </div>
            <div className="flex items-center bg-white rounded p-1 shadow mb-4 lg:mb-0">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-transparent outline-none mr-1 font-normal"
              >
                <option value="">Status</option>
                <option value="SELESAI">SELESAI</option>
                <option value="BELUM SELESAI">BELUM SELESAI</option>
              </select>
              <span className="border-r border-gray-300 h-full mx-2"></span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent outline-none mr-1"
              />
              <span className="mx-2">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent outline-none"
              />
              <button
                onClick={handleSearch}
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
            ) : rentals.length === 0 ? (
              <p className="text-center text-gray-600">No data available</p>
            ) : (
              <>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                  <thead>
                    <tr className="bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase">
                      <th className="px-4 py-3 border-b">Nama Customer</th>
                      <th className="px-4 py-3 border-b">Kendaraan</th>
                      <th className="px-4 py-3 border-b">Harga Sewa</th>
                      <th className="px-4 py-3 border-b">Tanggal Sewa</th>
                      <th className="px-4 py-3 border-b">Tanggal Kembali</th>
                      <th className="px-4 py-3 border-b">Tujuan</th>
                      <th className="px-4 py-3 border-b">Status</th>
                      <th className="px-4 py-3 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentals.map((rental) => (
                      <tr key={rental.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {rental?.Customer?.namaLengkap}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {rental?.Kendaraan?.jenisKendaraan}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {rental?.hargaSewa}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {new Date(rental?.tanggalSewa).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {new Date(
                            rental?.tanggalKembali
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {rental?.tujuan}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {rental?.status === "BELUM SELESAI" ? (
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">
                              Belum Selesai
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                              Selesai
                            </span>
                          )}
                        </td>
                        {rental.status === "BELUM SELESAI" ? (
                          <td className="px-4 py-4 text-sm text-start gap-2 flex">
                            <button
                              className="text-orange-600 hover:underline"
                              onClick={() => handleOpenModal(rental)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-blue-500 hover:underline"
                              onClick={() => handleDoneRental(rental.id)}
                            >
                              Selesai
                            </button>
                          </td>
                        ) : (
                          <td className="px-4 py-4 text-sm text-start gap-2 flex">
                            <p>-</p>
                          </td>
                        )}
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
                      className="border-gray-300 rounded shadow-sm mr-2"
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
                        page >= totalPages
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Return Date</h2>
            <form onSubmit={handleUpdateReturnDate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </div>
  );
}
