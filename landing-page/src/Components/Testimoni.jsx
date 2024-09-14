import React from "react";
import testimoni from "../assets/testimoni.png";

function Testimoni() {
  return (
    <div className="bg-gray-100 py-10 px-8 rounded-lg shadow-lg mt-[24px]" id="testimoni">
      <h1 className="text-4xl text-gray-900 font-bold text-center mb-8">
        Testimoni
      </h1>
      <img
        src={testimoni}
        alt="Testimoni"
        className="object-cover w-full h-full rounded-lg"
      />
    </div>
  );
}

export default Testimoni;
