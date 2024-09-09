// eslint-disable-next-line @typescript-eslint/naming-convention
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/naming-convention
import React from 'react';

export const Footer = (): React.ReactNode => {
  return (
    <footer className="m-4 bg-white rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MOVIES.LIB
            </span>
          </Link>

          {/* TMDB Logo */}
          <a
            href="https://www.themoviedb.org/"
            className="flex items-center mb-4 space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <img src="/tmdb_logo.svg" className="h-8" alt="TMDB Logo" />
          </a>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <a href="https://flowbite.com/" className="hover:underline">
            Daniel Neira
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
