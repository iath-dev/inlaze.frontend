import { MovieData } from '@/types/tmdb';
import { parseImage } from '@/utils/helpers';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface MovieCardProps {
  item: MovieData;
}

export const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  const posterPath = useMemo(() => {
    if (!item.poster_path) return 'https://placehold.co/600x400';

    return parseImage(item.poster_path);
  }, [item.poster_path]);

  return (
    <Link
      href={`/${item.id}`}
      className="transition duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow cursor-pointer min-w-72 max-w-80 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:filter-none"
    >
      <img
        src={posterPath}
        className="object-cover object-center w-full rounded-t-lg h-80"
        alt={`${item.original_title} Image`}
      />
      <div className="w-full p-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center justify-center w-8 h-8 p-4 text-sm text-white bg-blue-500 rounded-lg aspect-square">
            {item.vote_average.toPrecision(2)}
          </span>
          <div className="flex-1">
            <p className="text-base line-clamp-1">{item.title}</p>
            <p className="text-sm opacity-50 line-clamp-1 text-slate-400">
              {item.original_title}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
