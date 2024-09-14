import ModalSewa from "../Components/ModalSewa";

function FormSewa() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 bg-gray-100 mt-[25px] shadow-lg" id="sewa">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#09d1e3]">
          Siap Memulai Perjalanan Anda?
        </h2>
        <p className="text-lg mb-6 text-gray-700 text-center">
          Temukan kendaraan yang sempurna untuk kebutuhan Anda dan nikmati
          perjalanan yang nyaman.
        </p>
        <ModalSewa />
      </div>
    </>
  );
}

export default FormSewa;
