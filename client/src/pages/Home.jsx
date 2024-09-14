import { useEffect } from "react";
import { decodeToken } from "../auth/helpers";

export default function Home() {
  useEffect(() => {
    // const decodeTkn = decodeToken(localStorage.getItem("access_token"));
  }, []);
  return (
    <>
      <div className="px-16 w-full h-screen bg-blue-400 py-8 font-poppins">
        <h1 className="font-bold text-white text-4xl">Welcome Aplikasi CMS</h1>
        <hr className="border-t-4 border-white w-16 mb-4 mt-28" />
        <p className="text-white font-light">
          Platform Jasa Sewa Motor di Kota Probolinggo
        </p>
      </div>
    </>
  );
}
