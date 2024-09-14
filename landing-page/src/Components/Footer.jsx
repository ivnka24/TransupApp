function Footer() {
    return (
      <footer className="bg-gradient-to-r from-[#09a5c6] to-[#09d1e3] py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <p className="text-white text-base font-semibold">Jl. Dr.Sutomo No.50, Probolinggo</p>
          </div>
  
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://instagram.com/Sewamotorprobolinggo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg transition hover:text-gray-300"
            >
              INSTAGRAM
            </a>
            <a
              href="https://wa.me/6282257933579"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg transition hover:text-gray-300"
            >
              WHATSAPP
            </a>
          </div>
  
          <div className="border-t border-white/20 pt-2">
            <p className="text-xs text-white">
              &copy; {new Date().getFullYear()} Sewa Motor Probolinggo. All rights reserved.
            </p>
          </div>
        </div>
      </footer >
    );
  }
  
  export default Footer;
  