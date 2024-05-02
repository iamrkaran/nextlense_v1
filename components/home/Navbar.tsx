'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 h-16 w-full bg-[#03001417] px-4 shadow-lg shadow-[#2A0E61]/50 backdrop-blur-md ">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 md:px-0">
        <Link href="/" className="flex items-center">
          <span className="ml-4 text-lg font-bold text-gray-300 md:text-2xl">
            NextLense
          </span>
        </Link>

        <div className="flex items-center space-x-4 md:space-x-0 md:space-x-reverse">
          <Link
            href="/auth/login"
            className=" w-32  ml-2 cursor-pointer rounded-lg py-2 text-center text-white"
          >
            Sign In
          </Link>
          <Link href="/auth/register">
            <span className="block w-32 rounded-lg button-primary py-2 text-center  text-white hover:stroke-white md:w-40">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
