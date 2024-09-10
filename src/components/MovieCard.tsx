import { useFavoritesManager } from '@/hooks/useFavoritesManager';
import { MovieData } from '@/types/tmdb';
import { parseImage } from '@/utils/helpers';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface MovieCardProps {
  item: MovieData;
}

export const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  const { isFavorite } = useFavoritesManager();

  const posterPath = useMemo(() => {
    if (!item.poster_path) return 'https://placehold.co/600x400';

    return parseImage(item.poster_path);
  }, [item.poster_path]);

  return (
    <Link
      href={`/${item.id}`}
      className="w-full transition duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow cursor-pointer min-w-72 md:max-w-80 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:filter-none"
    >
      <img
        src={posterPath}
        className="object-cover object-center w-full rounded-t-lg h-96 md:h-72"
        alt={`${item.original_title} Image`}
      />
      <div className="w-full p-4">
        <div className="flex items-center justify-center space-x-4">
          <span className="flex items-center justify-center w-8 h-8 p-4 text-sm text-white bg-blue-500 rounded-lg aspect-square">
            {item.vote_average.toPrecision(2)}
          </span>
          <div className="flex-1">
            <p className="text-base line-clamp-1">{item.title}</p>
            <p className="text-sm opacity-50 line-clamp-1 text-slate-400">
              {item.original_title}
            </p>
          </div>
          <div
            className={classNames(
              isFavorite(item.id) ? 'text-red-500' : 'text-gray-500',
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 me-2"
            >
              <path
                fillRule="evenodd"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
