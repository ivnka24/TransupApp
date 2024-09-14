import { useState, useEffect } from "react";
import { instance } from "../instance";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function FormCustomer({ title, type }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    NIK: "",
    namaLengkap: "",
    alamat: "",
    domisili: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === "edit" && id) {
      const fetchCustomer = async () => {
        try {
          setIsLoading(true);
          const response = await instance.get(`customer/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          });
          console.log(response.data.data, "<<<");

          setCustomer(response.data.data);
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to load customer data", "error");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCustomer();
    }
  }, [type, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "edit") {
        await instance.put(`customer/${id}`, customer, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        Swal.fire("Success", "Customer updated successfully", "success");
      } else {
        await instance.post("customer", customer, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        Swal.fire("Success", "Customer added successfully", "success");
      }
      navigate("/customer");
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message;
      Swal.fire("Error", errorMessage, "error");
    }
  };

  return (
    <div className="bg-blue-400 py-24 font-poppins">
      <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md ">
        <h1 className="text-2xl font-semibold mb-4 text-center">{title}</h1>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="NIK" className="block text-gray-700">
                NIK
              </label>
              <input
                type="text"
                id="NIK"
                name="NIK"
                value={customer.NIK}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="namaLengkap" className="block text-gray-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="namaLengkap"
                name="namaLengkap"
                value={customer.namaLengkap}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="alamat" className="block text-gray-700">
                Alamat
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                value={customer.alamat}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="domisili" className="block text-gray-700">
                Domisili
              </label>
              <input
                type="text"
                id="domisili"
                name="domisili"
                value={customer.domisili}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {type === "edit" ? "Update Customer" : "Add Customer"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
