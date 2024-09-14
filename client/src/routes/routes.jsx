import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import Customer from "../pages/Customer";
import FormCustomer from "../pages/FormCustomer";
import Aset from "../pages/Aset";
import { decodeToken } from "../auth/helpers";
import { AddKendaraan } from "../pages/FormAset";
import { Rental } from "../pages/Rental";
import { FormRental } from "../pages/FormRental";
import { Service } from "../pages/Service";
import { FormService } from "../pages/FormServices";
import { Kas } from "../pages/Kas";
import { AddKas } from "../pages/AddKas";
import { User } from "../pages/User";
import { Authorization } from "../pages/Authorization";
import { FormUser } from "../pages/FormUser";
const roleGuard = () => {
  const token = localStorage.getItem("access_token");
  const decode = decodeToken(token);
  if (decode.role !== "Admin") {
    return redirect("/authorization");
  }
  return null;
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: async () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/customer",
        element: <Customer />,
      },
      {
        path: "customer/edit-customer/:id",
        element: <FormCustomer title={"Edit Customer"} type={"edit"} />,
      },
      {
        path: "customer/add-customer",
        element: <FormCustomer title={"Add Customer"} type={"add"} />,
      },
      {
        path: "/user",
        element: <User />,
        loader: roleGuard,
      },
      {
        path: "user/add-user",
        element: <FormUser title={"Add User"} type={"add"} />,
        loader: roleGuard,
      },
      {
        path: "user/edit-user/:id",
        element: <FormUser title={"Edit User"} type={"edit"} />,
        loader: roleGuard,
      },
      {
        path: "/rental",
        element: <Rental />,
      },
      {
        path: "rental/add-rental",
        element: <FormRental title={"Add Rental"} type={"add"} />,
      },
      {
        path: "rental/edit-rental/:id",
        element: <FormRental title={"Edit Rental"} type={"edit"} />,
      },
      { path: "/kas", element: <Kas /> },
      { path: "kas/add-kas", element: <AddKas /> },
      {
        path: "riwayat-service",
        element: <Service />,
      },
      {
        path: "riwayat-service/add-services",
        element: <FormService />,
      },
      {
        path: "/aset",
        element: <Aset />,
      },
      {
        path: "aset/add-aset",
        element: <AddKendaraan title={"Add Aset"} type={"add"} />,
      },
      {
        path: "aset/edit-aset/:id",
        element: <AddKendaraan title={"Edit Aset"} type={"edit"} />,
      },
      {
        path: "/authorization",
        element: <Authorization />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }

      return null;
    },
  },
]);
