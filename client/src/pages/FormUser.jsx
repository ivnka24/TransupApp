import { useContext, useEffect, useState } from "react";
import { ContextStore } from "../store/ContextStore";
import { instance as axios } from "../instance";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { UseLoading } from "../components/Loading";

// Validation schema for FormUser
const userSchema = z.object({
  namaLengkap: z.string().nonempty("Nama Lengkap tidak boleh kosong"),
  username: z.string().nonempty("Username tidak boleh kosong"),
  password: z.string().min(6, "Password harus 6 characters atau lebih"),
  role: z.enum(["Admin", "Karyawan"], "Role tidak boleh kosong"),
});

export function FormUser({ title, type }) {
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
        const endpoint = `/users/${id}`;

        updateFormConfig({
          initialValues: {},
          onSubmit: async (values) => {
            await axios.put(`/users/${id}`, values);
            navigate("/user");
          },
          endpoint,
          isEdit: true,
        });
      } else {
        updateFormConfig({
          initialValues: {
            namaLengkap: "",
            username: "",
            password: "",
            role: "",
          },
          onSubmit: async (values) => {
            await axios.post("/users", values);
            navigate("/user");
          },
          endpoint: null,
        });
      }
    };

    fetchData();
    return () => clearForm && clearForm();
  }, [type, id, clearForm]);

  const validateField = (name, value) => {
    const result = userSchema.safeParse({ ...values, [name]: value });
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
    <div className="h-screen w-full bg-blue-400 py-24 font-poppins">
      <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">{title}</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="namaLengkap" className="block text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="namaLengkap"
              name="namaLengkap"
              value={values.namaLengkap || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.namaLengkap ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.namaLengkap && (
              <p className="text-red-500 text-sm">{errors.namaLengkap}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={values.username || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={values.role || ""}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.role ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
              onBlur={handleBlur}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Karyawan">Karyawan</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormValid}
          >
            {isLoading ? (
              <UseLoading size={"sm"} />
            ) : type === "edit" ? (
              "Update User"
            ) : (
              "Add User"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
