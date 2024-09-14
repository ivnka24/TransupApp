import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { instance as axios } from "../instance";

export function useForm(initialValues, onSubmit, endpoint, isEdit) {
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);

  // Fungsi untuk handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(values);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data berhasil disimpan!",
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menyimpan data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit && endpoint) {
        setIsLoading(true);
        try {
          const { data } = await axios.get(`${endpoint}`);
          setValues(data.data);
        } catch (err) {
          setError(err.message || "Failed to fetch data");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [endpoint, isEdit]);

  return {
    values,
    handleChange,
    handleSubmit,
    isLoading,
    error,
    formData,
    setValues,
  };
}
