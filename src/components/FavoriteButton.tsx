'use client';

import { useFavoritesManager } from '@/hooks/useFavoritesManager';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

// Interface de favoritos
interface FavoriteButtonProps {
  id: number;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id }) => {
  const { isFavorite, removeFavorite, addFavorite } = useFavoritesManager();
  const { status } = useSession();
  const [fav, setFav] = useState(isFavorite(id));

  if (status !== 'authenticated') return null;

  /**
   * Método para marcar o desmarcar el objeto de favorito.
   */
  const handleChangeState = async (): Promise<void> => {
    const isFav = isFavorite(id);

    if (!isFav) {
      await addFavorite(id);
    } else {
      await removeFavorite(id);
    }

    setFav(!isFav);
  };

  return (
    <button
      type="button"
      onClick={handleChangeState}
      className={classNames(
        'w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center  inline-flex items-center transition-colors ease-in-out duration-300',
        fav
          ? 'text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
          : 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5 me-2"
      >
        <path
          fillRule="evenodd"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          clipRule="evenodd"
        />
      </svg>
      <span className="flex-1">
        {fav ? 'Remove from favorite' : 'Add to favorite'}
      </span>
    </button>
  );
};

export default FavoriteButton;
