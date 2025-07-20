import { useState } from "react";

function ModalSewa() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    social: "",
    destination: "",
    placeLocation: "Probolinggo", // Default to Probolinggo
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    vehicleType: "110CC",
  });

  const whatsappNumbers = {
    Probolinggo: "6282257933579",
    Malang: "6282221674996",
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message =
      `*Hallo mau sewa kendaraan!*\n\n` +
      `Nama: ${formData.name}\n` +
      `Nomor HP: ${formData.phone}\n` +
      `Medsos (IG/FB): ${formData.social}\n` +
      `Tujuan: ${formData.destination}\n` +
      `Lokasi Sewa: ${formData.placeLocation}\n` + // Added placeLocation to the message
      `Tanggal Sewa: ${formData.startDate}\n` +
      `Jam Sewa: ${formData.startTime}\n` +
      `Tanggal Kembali: ${formData.endDate}\n` +
      `Jam Kembali: ${formData.endTime}\n` +
      `Jenis Kendaraan: ${formData.vehicleType}`;

    const selectedWhatsappNumber = whatsappNumbers[formData.placeLocation];
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${selectedWhatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
    setFormData({
      name: "",
      phone: "",
      social: "",
      destination: "",
      placeLocation: "Probolinggo", // Reset to default Probolinggo
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      vehicleType: "110CC",
    });
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-[#09d1e3] text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-[#07b2c1] transition-colors duration-300"
      >
        Sewa Sekarang
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-end justify-center md:items-center md:justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full md:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Form Sewa Kendaraan</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Nomor HP
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Masukkan nomor telepon Anda"
                  />
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2" htmlFor="social">
                    Medsos (IG/FB)
                  </label>
                  <input
                    type="text"
                    id="social"
                    name="social"
                    value={formData.social}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Masukkan akun IG atau FB Anda"
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="destination"
                  >
                    Tujuan
                  </label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Masukkan tujuan Anda"
                  />
                </div>
              </div>

              {/* New Dropdown for placeLocation */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="placeLocation"
                >
                  Lokasi Sewa
                </label>
                <select
                  id="placeLocation"
                  name="placeLocation"
                  value={formData.placeLocation}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Probolinggo">Probolinggo</option>
                  <option value="Malang">Malang</option>
                </select>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="start-date"
                  >
                    Tanggal Sewa
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="start-time"
                  >
                    Jam Sewa
                  </label>
                  <input
                    type="time"
                    id="start-time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="end-date"
                  >
                    Tanggal Kembali
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="end-time"
                  >
                    Jam Kembali
                  </label>
                  <input
                    type="time"
                    id="end-time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="vehicle-type"
                >
                  Jenis Kendaraan
                </label>
                <select
                  id="vehicle-type"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="110CC">110 CC</option>
                  <option value="125CC">125 CC</option>
                  <option value="150CC">150 CC</option>
                  <option value="TRAIL">TRAIL</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className="bg-[#09d1e3] text-white py-2 px-4 rounded"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalSewa;