import { useState } from "react";
import logo from "../assets/logo2.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // const [language, setLanguage] = useState("ID");

  // const handleLanguageChange = () => {
  //   setLanguage((prevLanguage) => (prevLanguage === "ID" ? "ENG" : "ID"));
  // };

  return (
    <header className="w-full h-[64px] flex justify-between items-center px-4">
      <div className="flex items-center gap-[10px]">
        <img src={logo} alt="logo" className="h-12" />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-[#09d1e3]">Transup</h1>
          <p className="text-sm text-[#09d1e3]">Jasa Sewa Motor</p>
        </div>
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8 text-[#09d1e3]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      <nav className="hidden md:flex items-center gap-4 bg-white w-full max-w-[330px] h-12 justify-between rounded-full shadow-md px-6 py-2 lg:max-w-[700px]">
        <a
          href="#sewa"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
        >
          SEWA MOTOR
        </a>
        <a
          href="#faq"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
        >
          FAQ
        </a>
        <a
          href="#testimoni"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
        >
          TESTIMONI
        </a>
      </nav>

      <div className="hidden md:flex items-center">
        {/* <button
          onClick={handleLanguageChange}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
          {language === "ID" ? "EN" : "ID"}
        </button> */}
      </div>

      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-[64px] left-0 w-full bg-white md:hidden shadow-lg z-10`}
      >
        <a
          href="#sewa"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          SEWA MOTOR
        </a>
        <a
          href="#faq"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          FAQ
        </a>
        <a
          href="#testimoni"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          TESTIMONI
        </a>
      </nav>
    </header>
  );
}

export default Header;
