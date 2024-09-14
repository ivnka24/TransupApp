import { useContext, useEffect, useState } from "react";
import { ContextStore } from "../store/ContextStore";
import { instance as axios } from "../instance";
import { useNavigate } from "react-router-dom";
import { UseLoading } from "../components/Loading";
import { z } from "zod";

const serviceSchema = z.object({
  idKendaraan: z.string().nonempty("ID Kendaraan is required"),
  debet: z
    .string()
    .optional()
    .refine((value) => value === "" || /^\d+$/.test(value), {
      message: "Debet must be a number or left empty",
    }),
  kredit: z
    .string()
    .optional()
    .refine((value) => value === "" || /^\d+$/.test(value), {
      message: "Kredit must be a number or left empty",
    }),
  deskripsi: z.string().nonempty("Deskripsi is required"),
});

export function FormService() {
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
  const [kendaraans, setKendaraans] = useState([]);

  const fetchKendaraan = async () => {
    try {
      const response = await axios.get("/kendaraan/ready");

      setKendaraans(response.data);
    } catch (err) {
      console.error("Error fetching kendaraan:", err);
    }
  };

  useEffect(() => {
    fetchKendaraan();
    updateFormConfig({
      initialValues: {
        idKendaraan: "",
        debet: "",
        kredit: "",
        deskripsi: "",
      },
      onSubmit: async (values) => {
        await axios.post("/service", values);
        navigate("/riwayat-service");
      },
    });
    return () => clearForm && clearForm();
  }, [clearForm]);

  const validateField = (name, value) => {
    const result = serviceSchema.safeParse({ ...values, [name]: value });
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
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Add Riwayat Services
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="idKendaraan" className="block text-gray-700">
              Kendaraan
            </label>
            <select
              id="idKendaraan"
              name="idKendaraan"
              value={values.idKendaraan || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.idKendaraan ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            >
              <option value="" disabled>
                Select Kendaraan
              </option>
              {kendaraans.map((kendaraan) => (
                <option key={kendaraan.id} value={kendaraan.id}>
                  {kendaraan.jenisKendaraan} ({kendaraan.platMotor})
                </option>
              ))}
            </select>
            {errors.idKendaraan && (
              <p className="text-red-500 text-sm">{errors.idKendaraan}</p>
            )}
          </div>
          <p className="text-sm">
            Input salah salah satu antara debet (pemasukan) dan kredit
            (pengeluaran)
          </p>
          <div className="mb-4">
            <label htmlFor="debet" className="block text-gray-700">
              Debet (optional)
            </label>
            <input
              type="text"
              id="debet"
              name="debet"
              value={values.debet || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.debet ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.debet && (
              <p className="text-red-500 text-sm">{errors.debet}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="kredit" className="block text-gray-700">
              Kredit (optional)
            </label>
            <input
              type="text"
              id="kredit"
              name="kredit"
              value={values.kredit || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.kredit ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.kredit && (
              <p className="text-red-500 text-sm">{errors.kredit}</p>
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

          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded `}
          >
            Submit
          </button>
        </form>
      </div>
      {isLoading && <UseLoading size="sm" />}
    </div>
  );
}
