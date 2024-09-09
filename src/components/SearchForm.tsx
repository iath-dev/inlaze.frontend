'use client';

import React, { useCallback, useState } from 'react';
import GenreSelect from './GenreSelect';

interface SearchFormProps {
  onSubmit: (query: string, genre: number) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState({ q: '', genre: 0 });

  const handleChangeGenre = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      setQuery((q) => ({ ...q, genre: parseInt(value) }));
    },
    [],
  );

  const handleChangeQuery = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.target;

    setQuery((q) => ({ ...q, q: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();

    onSubmit(query.q, query.genre);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-w-lg p-4 mx-auto space-x-4"
    >
      <GenreSelect onChange={handleChangeGenre} />
      <div className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search movie"
            onChange={handleChangeQuery}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
