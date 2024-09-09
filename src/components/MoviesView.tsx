'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import useAxios from '@/hooks/useAxios';
import { PopularResponse } from '@/types/tmdb';
import { MovieCard } from '@/components/MovieCard';
import { AxiosRequestConfig } from 'axios';

const initialConfig: AxiosRequestConfig = {
  url: `${process.env.NEXT_PUBLIC_API_HOST}/movie/popular`,
  method: 'GET',
  params: { page: 1 },
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
};

export const MoviesView = (): React.ReactNode => {
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(0);
  const [data, loading, _, updateConfig, config] = useAxios<PopularResponse>({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/movie/popular`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  const handleChangePage = (value: -1 | 1): void => {
    if (!data) return;

    const _page = page + value;

    if (_page <= 1 || _page >= data.total_pages) return;

    setPage(_page);

    updateConfig({ params: { ...config.params, page: _page, language: 'en' } });
  };

  const handleSearch = useCallback((query: string, genre: number) => {
    setGenre(genre);
    setPage(1);

    if (query === '') return updateConfig(initialConfig);

    updateConfig({
      url: `${process.env.NEXT_PUBLIC_API_HOST}/search/movie`,
      params: { query, page: 1 },
    });
  }, []);

  const movies = useMemo(() => {
    if (!data) return [];

    if (genre === 0) return data.results;

    return data.results.filter((el) => el.genre_ids.includes(genre));
  }, [data, genre]);

  return (
    <section className="space-y-4">
      <SearchForm onSubmit={handleSearch} />
      <div className="grid justify-center w-full grid-cols-1 gap-4 md:grid-cols-3">
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`loading-card-${index}`}
              className="bg-white border border-gray-200 rounded-lg shadow w-80 h-96 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex flex-col w-full h-full animate-pulse">
                <div className="flex-1 w-full bg-slate-700"></div>
                <div className="flex items-center p-4 space-x-2">
                  <div className="w-8 h-8 p-4 rounded bg-slate-700"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded bg-slate-700"></div>
                    <div className="h-2 rounded bg-slate-700"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {movies.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
      {data && (
        <div className="flex flex-col items-center justify-between w-full gap-4 mt-4 md:flex-row md:justify-end">
          <span className="text-sm text-gray-700 dark:text-gray-400 me-4">
            Page {page} of {data.total_pages}
          </span>
          <div className="flex items-center justify-evenly md:w-fit">
            <button
              onClick={() => handleChangePage(-1)}
              disabled={page === 1}
              className="flex items-center justify-center h-8 px-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg me-3 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Previous
            </button>
            <button
              onClick={() => handleChangePage(1)}
              disabled={page === data.total_pages}
              className="flex items-center justify-center h-8 px-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MoviesView;
