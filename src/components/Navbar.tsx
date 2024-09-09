'use client';

// eslint-disable-next-line @typescript-eslint/naming-convention
import React from 'react';
import { UserMenu } from '@/components/UserMenu';
import Link from 'next/link';

export const Navbar = (): React.ReactNode => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MOVIES.LIB
          </span>
        </Link>

        <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
