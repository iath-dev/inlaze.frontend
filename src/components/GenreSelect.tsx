'use client';

import useAxios from '@/hooks/useAxios';
import { GenreResponse } from '@/types/tmdb';
import classNames from 'classnames';
import React, { memo } from 'react';

interface GenreSelectProps {
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const GenreSelect: React.FC<GenreSelectProps> = ({ onChange }) => {
  const [data, loading] = useAxios<GenreResponse>({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/genre/movie/list`,
    params: {},
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  return (
    <div className="relative">
      <div
        className={classNames(
          'absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none',
          { hidden: !loading },
        )}
      >
        <div className="w-4 h-4 border-t-2 border-b-2 border-blue-500 rounded-full aspect-square animate-spin"></div>
      </div>
      <select
        id="genre"
        onChange={onChange}
        defaultValue={0}
        className={classNames(
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          { 'ps-10': loading },
        )}
        // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={0}>Choose a genre</option>
        {data &&
          data.genres.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default memo(GenreSelect);
