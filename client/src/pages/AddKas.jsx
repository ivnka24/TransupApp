import { useContext, useEffect, useState } from "react";
import { ContextStore } from "../store/ContextStore";
import { instance as axios } from "../instance";
import { useNavigate } from "react-router-dom";
import { UseLoading } from "../components/Loading";
import { z } from "zod";

// Define the schema for validation
const kasSchema = z.object({
  keterangan: z.string().nonempty("Keterangan is required"),
  tanggal: z.string().nonempty("Tanggal is required"),
  deskripsi: z.string().nonempty("Deskripsi is required"),
  jumlah: z.string().min(1, "Jumlah tidak boleh kosong")
});

export function AddKas() {
  const navigate = useNavigate();
  const {
    values,
    handleChange,
    handleSubmit,
    isLoading,
    error,
    updateFormConfig,
    clearForm,
  } = useContext(ContextStore);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    updateFormConfig({
      initialValues: {
        keterangan: "",
        tanggal: "",
        deskripsi: "",
        jumlah: "",
      },
      onSubmit: async (values) => {
        try {
          await axios.post("kas", values);
          navigate("/kas");
        } catch (err) {
          console.error("Error adding kas:", err);
        }
      },
    });
    return () => clearForm && clearForm();
  }, []);

  const validateField = (name, value) => {
    const result = kasSchema.safeParse({ ...values, [name]: value });
    if (!result.success) {
      const error = result.error.errors.find((err) => err.path[0] === name);
      setErrors((prev) => ({ ...prev, [name]: error?.message }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(values).every(
      (value) => value !== ""
    );
    const hasErrors = Object.values(errors).some(
      (error) => error !== undefined
    );
    setIsFormValid(allFieldsFilled && !hasErrors);
  }, [values, errors]);

  return (
    <div className="bg-blue-400 py-24 font-poppins">
      <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Add Kas</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="keterangan" className="block text-gray-700">
              Keterangan
            </label>
            <select
              id="keterangan"
              name="keterangan"
              value={values.keterangan || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.keterangan ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            >
              <option value="" disabled>
                Select Keterangan
              </option>
              <option value="Pengeluaran">Pengeluaran</option>
              <option value="Pemasukan">Pemasukan</option>
            </select>
            {errors.keterangan && (
              <p className="text-red-500 text-sm">{errors.keterangan}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="tanggal" className="block text-gray-700">
              Tanggal
            </label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={values.tanggal || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.tanggal ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.tanggal && (
              <p className="text-red-500 text-sm">{errors.tanggal}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="deskripsi" className="block text-gray-700">
              Deskripsi
            </label>
            <input
              type="text"
              id="deskripsi"
              name="deskripsi"
              value={values.deskripsi || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.deskripsi ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.deskripsi && (
              <p className="text-red-500 text-sm">{errors.deskripsi}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="jumlah" className="block text-gray-700">
              Jumlah
            </label>
            <input
              type="number"
              id="jumlah"
              name="jumlah"
              value={values.jumlah || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.jumlah ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.jumlah && (
              <p className="text-red-500 text-sm">{errors.jumlah}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded ${
              !isFormValid ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </form>
      </div>
      {isLoading && <UseLoading size="sm" />}
    </div>
  );
}
