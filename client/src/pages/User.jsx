import { useNavigate } from "react-router-dom";
import { useTable } from "../hooks/useTable";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { instance } from "../instance";
import { Snackbar, Alert } from "@mui/material"; // Import MUI components

export function User() {
  const navigate = useNavigate();
  const { data, loading, page, totalPages, handlePageChange, refetch } =
    useTable("/users");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    refetch();
  }, []); // Refetch data when component mounts

  const handleDelete = async (id) => {
    try {
      const { data } = await instance.delete("/users/" + id);
      // Show success snackbar on successful deletion
      console.log(data);
      refetch();
      setSnackbar({ open: true, message: data.message, severity: "success" });
    } catch (error) {
      // Show error snackbar if delete fails
      setSnackbar({
        open: true,
        message: "Failed to delete user",
        severity: "error",
      });
    }
  };

  const handleEdit = (id) => {
    // Navigate to edit page or open edit modal
    navigate(`edit-user/${id}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
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
          Data Users
        </h1>
        <div className="bg-gray-100 rounded-lg border border-gray-300 flex flex-col min-h-[calc(100vh-200px)]">
          <div className="bg-white p-4 border-b border-gray-300">
            <div className="flex justify-between items-center">
              <button
                className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
                onClick={() => navigate("add-user")}
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
                Add User
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
                      <th className="px-4 py-3 border-b">ID</th>
                      <th className="px-4 py-3 border-b">Nama Lengkap</th>
                      <th className="px-4 py-3 border-b">Username</th>
                      <th className="px-4 py-3 border-b">Role</th>
                      <th className="px-4 py-3 border-b">Tanggal Dibuat</th>
                      <th className="px-4 py-3 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {user.id}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {user.namaLengkap}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {user.username}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {user.role}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="flex items-center gap-2 px-4 py-4 text-sm text-gray-900">
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-4 font-poppins">
                  <span className="py-2 text-md text-gray-800">
                    Page {page} of {totalPages}
                  </span>
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Set to top center
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
