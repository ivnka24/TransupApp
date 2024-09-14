import React from "react";
import stop from "../assets/stop.png";

export function Authorization() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-poppins bg-blue-400 w-full h-screen">
      <img src={stop} alt="Stop" className="mb-4" width={600} height={600}/>
      <h6 className="text-4xl text-white font-bold">
        Kamu tidak bisa akses halaman ini!
      </h6>
    </div>
  );
}
