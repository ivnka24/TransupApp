import React from "react";

function Mitra() {
  const handleClick = () => {
    const phoneNumber = "+6282257933579";
    const message = "Halo, saya tertarik untuk menjadi mitra TransUp!";
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <div className="bg-gray-100 py-10 px-8 rounded-lg shadow-lg text-center mt-[24px]">
      <h2 className="text-3xl font-extrabold mb-5 text-gray-800">
        GABUNG DAN JADI MITRA TRANSUP
      </h2>
      <p className="text-gray-600 mb-6">
        Punya Kendaraan nganggur di Rumah? kenapa tidak menjadi mitra kami untuk
        pendapatan lebih dari kendaraanmu
      </p>
      <button
        onClick={handleClick}
        className="bg-[#09d1e3] text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-[#00796b] transition-colors duration-300"
      >
        Daftar Sekarang
      </button>
    </div>
  );
}

export default Mitra;
