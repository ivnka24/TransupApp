import { useContext, useEffect, useState } from "react";
import { ContextStore } from "../store/ContextStore";
import { instance as axios } from "../instance";
import { useNavigate, useParams } from "react-router-dom";
import { UseLoading } from "../components/Loading";
import { z } from "zod";

const kendaraanSchema = z.object({
  jenisKendaraan: z.string().nonempty("Jenis Kendaraan is required"),
  platMotor: z
    .string()
    .regex(/^[A-Z]{1,2} \d{1,4} [A-Z]{1,3}$/, "Plat Motor tidak valid")
    .nonempty("Plat Motor is required"),
  ccKendaraan: z
    .string()
    .regex(/^\d+$/, "CC Kendaraan must be a number")
    .nonempty("CC Kendaraan is required"),
  noRangka: z.string().nonempty("No Rangka is required"),
  noMesin: z.string().nonempty("No Mesin is required"),
  pajak: z.string().nonempty("Pajak date is required"),
  kepemilikan: z
    .string()
    .nonempty("Kepemilikan is required")
    .regex(
      /^Mitra - .+|^Transup$/,
      'Kepemilikan must be either "Mitra - {nama}" or "Transup"'
    ),
});

export function AddKendaraan({ title, type }) {
  const { id } = useParams();
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
    const fetchData = async () => {
      if (type === "edit" && id) {
        const endpoint = `/kendaraan/${id}`;

        updateFormConfig({
          initialValues: {},
          onSubmit: async (values) => {
            await axios.put(`/kendaraan/${id}`, values);
            navigate("/aset");
          },
          endpoint,
          isEdit: true,
        });
      } else {
        updateFormConfig({
          initialValues: {
            jenisKendaraan: "",
            platMotor: "",
            ccKendaraan: "",
            noRangka: "",
            noMesin: "",
            pajak: "",
            kepemilikan: "",
          },
          onSubmit: async (values) => {
            await axios.post("/kendaraan", values);
            navigate("/aset");
          },
          endpoint: null,
        });
      }
    };

    fetchData();
    return () => clearForm && clearForm();
  }, [type, id, clearForm]);

  const validateField = (name, value) => {
    const result = kendaraanSchema.safeParse({ ...values, [name]: value });
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
    // Check if all values are non-empty
    const allFieldsFilled = Object.values(values).every(
      (value) => value !== ""
    );

    // Check if there are any errors
    const hasErrors = Object.values(errors).some(
      (error) => error !== undefined
    );

    // Set form validity based on field content and errors
    setIsFormValid(allFieldsFilled && !hasErrors);
  }, [values, errors]);

  return (
    <div className="bg-blue-400 py-24 font-poppins">
      <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">{title}</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="jenisKendaraan" className="block text-gray-700">
              Jenis Kendaraan
            </label>
            <input
              type="text"
              id="jenisKendaraan"
              name="jenisKendaraan"
              value={values.jenisKendaraan || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.jenisKendaraan ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.jenisKendaraan && (
              <p className="text-red-500 text-sm">{errors.jenisKendaraan}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="platMotor" className="block text-gray-700">
              Plat Motor
            </label>
            <input
              type="text"
              id="platMotor"
              name="platMotor"
              value={values.platMotor || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.platMotor ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.platMotor && (
              <p className="text-red-500 text-sm">{errors.platMotor}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="ccKendaraan" className="block text-gray-700">
              CC Kendaraan
            </label>
            <input
              type="text"
              id="ccKendaraan"
              name="ccKendaraan"
              value={values.ccKendaraan || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.ccKendaraan ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.ccKendaraan && (
              <p className="text-red-500 text-sm">{errors.ccKendaraan}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="noRangka" className="block text-gray-700">
              No Rangka
            </label>
            <input
              type="text"
              id="noRangka"
              name="noRangka"
              value={values.noRangka || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.noRangka ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.noRangka && (
              <p className="text-red-500 text-sm">{errors.noRangka}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="noMesin" className="block text-gray-700">
              No Mesin
            </label>
            <input
              type="text"
              id="noMesin"
              name="noMesin"
              value={values.noMesin || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.noMesin ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.noMesin && (
              <p className="text-red-500 text-sm">{errors.noMesin}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="pajak" className="block text-gray-700">
              Pajak
            </label>
            <input
              type="date"
              id="pajak"
              name="pajak"
              value={values.pajak || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.pajak ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.pajak && (
              <p className="text-red-500 text-sm">{errors.pajak}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="kepemilikan" className="block text-gray-700">
              Kepemilikan
            </label>
            <input
              type="text"
              id="kepemilikan"
              name="kepemilikan"
              value={values.kepemilikan || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.kepemilikan ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.kepemilikan && (
              <p className="text-red-500 text-sm">{errors.kepemilikan}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
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
