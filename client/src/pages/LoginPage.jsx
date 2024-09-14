import { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { instance } from "../instance";
import Swal from 'sweetalert2';

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const changeForm = (e) => {
    const { value, name } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const submitLogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await instance({
        method: "post",
        url: "login",
        data: login,
      });
      localStorage.access_token = data.access_token;
      Swal.fire({
        icon: 'success',
        title: 'Login successful',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: error.response?.data?.message || 'Something went wrong!',
      });
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-blue-400 p-6 font-poppins">
        {/* Logo */}
        <div className="flex items-start justify-start">
          <img src={logo} alt="TransUp" className="h-48 mt-2" />
        </div>
        <div className="grid grid-cols-2 gap-4 items-start justify-between w-full">
          <div className="p-12">
            <h1 className="text-5xl text-white font-bold">Login</h1>
            <p className="text-xl text-white font-semibold mt-4">
              Sign in to continue
            </p>
            <hr className="border-t-4 border-white w-16 mb-4 mt-28" />
            <p className="text-white font-light">
              Platform Jasa Sewa Motor di Kota Probolinggo
            </p>
          </div>
          <div className="bg-blue-300 p-8 rounded-lg shadow-md opacity-80 w-5/6">
            <h1 className="text-2xl text-center font-bold text-white mb-4">
              Admin Login
            </h1>
            <form className="mx-14" onSubmit={submitLogin}>
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={login.username}
                  onChange={changeForm}
                  className="w-96 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={login.password}
                  onChange={changeForm}
                  className="w-96 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-64 bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition duration-300 mx-24 mt-8"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
