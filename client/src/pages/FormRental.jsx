import { useContext, useEffect, useState } from "react";
import { instance as axios } from "../instance";
import { Alert, Snackbar } from "@mui/material";
import { ContextStore } from "../store/ContextStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { UseLoading } from "../components/Loading";

const currentDate = new Date().toISOString().split("T")[0];

const rentalSchema = z.object({
  idKendaraan: z.string().nonempty("Kendaraan tidak boleh kosong"),
  idCustomer: z.string().nonempty("Customer tidak boleh kosong"),
  tanggalKembali: z
    .string()
    .nonempty("Tanggal Kembali tidak boleh kosong")
    .refine((date) => new Date(date) >= new Date(currentDate), {
      message: "Tanggal Kembali harus lebih dari hari ini",
    }),
  hargaSewa: z.string().min(1, "Harga Sewa tidak boleh kosong"),
  tujuan: z.string().nonempty("Tujuan tidak boleh kosong"),
  nik: z.string().nonempty("NIK tidak boleh kosong"),
});

export function FormRental({ title, type }) {
  const {
    values,
    handleChange,
    handleSubmit,
    isLoading,
    error,
    updateFormConfig,
  } = useContext(ContextStore);
  const [kendaraan, setKendaraan] = useState([]);
  const [selectedKendaraan, setSelectedKendaraan] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [customer, setCustomer] = useState({});
  const [NIK, setNIK] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const fetchCustomerByNIK = async (NIK) => {
    try {
      const { data } = await axios.get(`customer/${NIK}`);
      setCustomer(data.data);
      setError(null);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
      setOpenAlert(true);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    fetchCustomerByNIK(NIK);
  };

  const fetchKendaraan = async () => {
    try {
      const { data } = await axios.get("kendaraan/ready");
      setKendaraan(data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const handleKendaraanChange = (e) => {
    setSelectedKendaraan(e.target.value);
    handleChange(e);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const validateField = (name, value) => {
    try {
      rentalSchema.pick({ [name]: true }).parse({ [name]: value });
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorMessage = e.errors[0]?.message;
        setValidationErrors((prev) => ({ ...prev, [name]: errorMessage }));
      }
    }
  };

  const hasErrors = Object.values(validationErrors).some(
    (error) => error !== ""
  );

  useEffect(() => {
    fetchKendaraan();
  }, []);

  useEffect(() => {
    if (customer.id) {
      updateFormConfig({
        initialValues: {
          idKendaraan: "",
          idCustomer: customer.id || "",
          tanggalKembali: "",
          hargaSewa: "",
          tujuan: "",
        },
        onSubmit: async (values) => {
          try {
            const response = await axios.post("sewa", values);
            if (response.data) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: response.data.message,
              });
              console.log(response.data);
              navigate("/rental");
            }
          } catch (error) {
            console.log(error.response?.data?.message || error.message);
            setOpenAlert(true);
          }
        },
        endpoint: type === "edit" ? `rental/${values.id}` : "rental",
        isEdit: type === "edit",
      });
    }
  }, [customer.id]);

  return (
    <>
      <div className="bg-blue-400 py-24 font-poppins h-screen">
        <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">{title}</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center bg-white rounded p-1 shadow mb-4 border-gray-500 border">
              <input
                type="text"
                placeholder="NIK"
                name="NIK"
                value={NIK}
                onChange={(e) => setNIK(e.target.value)}
                onBlur={() => validateField("idCustomer", NIK)}
                className="bg-transparent outline-none flex-1 text-sm text-gray-700 px-1"
              />
              <button
                type="button"
                onClick={handleSearchClick}
                className="text-blue-500 hover:text-blue-600 p-2"
                aria-label="Search NIK"
                disabled={!NIK}
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

            <div className="gap-0 w-full">
              <input
                type="text"
                value={customer?.namaLengkap || ""}
                placeholder="Nama Lengkap"
                className="w-full bg-white rounded p-2 shadow mb-4 border-gray-500 border"
                disabled
              />
            </div>
            <div className="bg-white rounded p-2 shadow mb-4 border-gray-500 border flex">
              <select
                value={selectedKendaraan}
                onChange={handleKendaraanChange}
                name="idKendaraan"
                className="bg-transparent outline-none flex-1 text-sm text-gray-700 px-1"
                onBlur={() => validateField("idKendaraan", selectedKendaraan)}
              >
                <option value="">Pilih Kendaraan</option>
                {kendaraan.length === 0 && (
                  <option value="">Tidak ada kendaraan tersedia</option>
                )}
                {kendaraan?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.jenisKendaraan} - {item.platMotor}
                  </option>
                ))}
              </select>
            </div>
            {validationErrors.idKendaraan && (
              <div className="text-red-500 text-xs mb-2 mt-2">
                {validationErrors.idKendaraan}
              </div>
            )}
            <div className="flex bg-white rounded p-2 shadow mb-4 border-gray-500 border">
              <input
                type="number"
                placeholder="Harga Sewa"
                name="hargaSewa"
                value={values.hargaSewa || ""}
                onChange={handleChange}
                onBlur={() => validateField("hargaSewa", values.hargaSewa)}
                className="bg-transparent outline-none flex-1 text-sm text-gray-700 px-1"
              />
            </div>
            {validationErrors.hargaSewa && (
              <div className="text-red-500 text-xs mb-2 mt-2">
                {validationErrors.hargaSewa}
              </div>
            )}
            <label htmlFor="tanggalKembali">Tanggal Kembali</label>
            <div className="flex bg-white rounded p-2 shadow mb-4 border-gray-500 border">
              <input
                type="date"
                name="tanggalKembali"
                placeholder="Tanggal Kembali"
                value={values.tanggalKembali || ""}
                onChange={handleChange}
                onBlur={() =>
                  validateField("tanggalKembali", values.tanggalKembali)
                }
                className="bg-transparent outline-none flex-1 text-sm text-gray-700 px-1"
              />
            </div>
            {validationErrors.tanggalKembali && (
              <div className="text-red-500 text-xs mb-2 mt-2">
                {validationErrors.tanggalKembali}
              </div>
            )}
            <div className="bg-white rounded p-2 shadow mb-4 border-gray-500 border">
              <input
                type="text"
                name="tujuan"
                placeholder="Tujuan"
                value={values.tujuan || ""}
                onChange={handleChange}
                onBlur={() => validateField("tujuan", values.tujuan)}
                className="bg-transparent outline-none flex-1 text-sm text-gray-700 px-1"
              />
            </div>
            {validationErrors.tujuan && (
              <div className="text-red-500 text-xs mb-2 mt-2">
                {validationErrors.tujuan}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              disabled={isLoading || hasErrors}
            >
              {isLoading ? (
                <UseLoading size="sm" />
              ) : type === "edit" ? (
                "Update Sewa"
              ) : (
                "Add"
              )}
            </button>
          </form>
        </div>
      </div>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
