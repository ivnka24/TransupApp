import Footer from "../Components/Footer";

function Layouts({ children }) {
  return (
    <>
      <div className="w-full h-auto bg-gradient-to-b from-gray-100 to-white px-16 py-8 ">
        {children}
      </div>
      <Footer />
    </>
  );
}
export default Layouts;
