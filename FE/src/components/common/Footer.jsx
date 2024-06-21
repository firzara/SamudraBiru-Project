import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  const isSignupPage = location.pathname === "/daftar";
  const isLoginPage = location.pathname === "/masuk";

  return (
    !isSignupPage && !isLoginPage &&
    <footer className='bg-primary p-4 font-Poppins h-auto'>
      <div className='max-w-7xl mx-auto pt-16 sm:pt-16'>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <div className='mb-8 sm:mb-0'>
            <img
              src='/images/logo-footer.svg'
              alt='logo'
              className='w-[200px] h-auto sm:w-[318px] sm:h-[155px]'
            />
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 mt-8 text-center sm:text-left'>
              <a
                href='#'
                className='font-medium text-[16px] text-white hover:opacity-50'
              >
                Kebijakan privasi
              </a>
              <a
                href='#'
                className='font-medium text-[16px] text-white hover:opacity-50'
              >
                Syarat dan Ketentuan
              </a>
              <a
                href='#'
                className='font-medium text-[16px] text-white hover:opacity-50'
              >
                Bahasa
              </a>
            </div>
          </div>
          <div className='flex gap-4'>
            <img
              src='/images/instagram.svg'
              alt='instagram'
              className='w-6 h-6 sm:w-auto sm:h-auto hover:opacity-50 hover:cursor-pointer'
            />
            <img
              src='/images/twitter.svg'
              alt='twitter'
              className='w-6 h-6 sm:w-auto sm:h-auto hover:opacity-50 hover:cursor-pointer'
            />
            <img
              src='/images/facebook.svg'
              alt='facebook'
              className='w-6 h-6 sm:w-auto sm:h-auto hover:opacity-50 hover:cursor-pointer'
            />
            <img
              src='/images/google.svg'
              alt='google'
              className='w-6 h-6 sm:w-auto sm:h-auto hover:opacity-50 hover:cursor-pointer'
            />
          </div>
        </div>
        <div className='w-full sm:w-[32%] h-[1px] bg-white mx-auto mt-8 sm:mt-16' />
        <div className='text-center text-white mt-4 sm:mt-7'>
          &copy; Copyright Info Pegi. All right reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
