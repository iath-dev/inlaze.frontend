"use client";

// eslint-disable-next-line @typescript-eslint/naming-convention
import React, { useEffect, useRef, useState } from "react";

const UserMenu = (): React.ReactNode => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="/user_profile.png"
          alt="user photo"
        />
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-4 top-0 mt-2 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          aria-labelledby="user-menu-button"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              name@flowbite.com
            </span>
          </div>
          <ul className="py-2">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
