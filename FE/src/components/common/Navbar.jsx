import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isSignupPage = location.pathname === "/daftar";
  const isLoginPage = location.pathname === "/masuk";

  return (
    !isSignupPage &&
    !isLoginPage && (
      <nav
        className={`${
          location.pathname === "/"
            ? "xs:bg-primary md:bg-transparent"
            : "bg-primary"
        } p-4 font-Poppins absolute top-0 left-0 w-full z-10`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="text-white font-bold text-lg">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  width={171}
                  height={36}
                />
              </div>
              <div className="flex items-center md:hidden ml-auto">
                <button onClick={toggleMenu} className="text-white text-2xl">
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>
            <div
              className={`flex-col md:flex md:flex-row items-center ${
                isMenuOpen ? "flex" : "hidden"
              } md:flex w-full md:w-auto mt-4 md:mt-0`}
            >
              <Link
                to="/"
                className="text-white font-medium text-[18px] hover:text-gray-300 px-4 py-2"
              >
                Beranda
              </Link>
              <Link
                to="/category"
                className="text-white font-medium text-[18px] hover:text-gray-300 px-4 py-2"
              >
                Destinasi Wisata
              </Link>
              <Link
                to="/cuaca"
                className="text-white font-medium text-[18px] hover:text-gray-300 px-4 py-2"
              >
                Cuaca
              </Link>
              <Link
                to="/Tentang"
                className="text-white font-medium text-[18px] hover:text-gray-300 px-4 py-2"
              >
                Tentang Kami
              </Link>
              <div className="flex items-center mt-4 md:mt-0 md:ml-auto">
                {location.pathname === "/" ? (
                  <>
                    <Link
                      to="/daftar"
                      className="font-normal text-[16px] rounded-[10px] bg-transparent border-white border-[1px] text-white w-[111px] h-[32px] mr-4 flex items-center justify-center"
                    >
                      Daftar
                    </Link>
                    <Link
                      to="/masuk"
                      className="font-normal text-[16px] rounded-[10px] bg-white border-[1px] text-primary w-[111px] h-[32px] flex items-center justify-center"
                    >
                      Masuk
                    </Link>
                  </>
                ) : (
                  <button>
                    <a href="/users">
                      <FaRegUser
                        size={32}
                        className="bg-[#273B4A] rounded-full p-1"
                        color="white"
                        to="/user"
                      />
                    </a>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  );
}

export default Navbar;
