import { useFavorites } from '@/context/FavoritesContext';
import { Favorite } from '@/types/api';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

interface UseFavoritesManagerType {
  favorites: Favorite[];
  isLoading: boolean;
  addFavorite: (id: number) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesManager = (): UseFavoritesManagerType => {
  const { data, status } = useSession();
  const { state, dispatch } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const hasLoadedFavorites = useRef<boolean>(false);

  const loadFavorites = async (): Promise<void> => {
    if (hasLoadedFavorites.current || status !== 'authenticated') return;

    setIsLoading(true);
    try {
      const uri = `${process.env.NEXT_PUBLIC_SERVER}/favorites`;
      const res = await axios<Favorite[]>(uri, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${data!['accessToken']}`,
        },
      });

      dispatch({ type: 'LOAD_FAVORITES', payload: res.data });
      hasLoadedFavorites.current = true;
    } catch (error) {
      throw new Error('Error loading favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (id: number): Promise<void> => {
    if (status !== 'authenticated') return;
    try {
      const uri = `${process.env.NEXT_PUBLIC_SERVER}/favorites/${id}`;
      const res = await axios<Favorite[]>(uri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${data!['accessToken']}`,
        },
      });
      dispatch({ type: 'ADD_FAVORITE', payload: res.data });
    } catch (error) {
      throw new Error('Error adding to favorites');
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    if (status !== 'authenticated') return;
    try {
      const uri = `${process.env.NEXT_PUBLIC_SERVER}/favorites/${id}`;
      const res = await axios<Favorite[]>(uri, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${data!['accessToken']}`,
        },
      });
      dispatch({ type: 'ADD_FAVORITE', payload: res.data });
    } catch (error) {
      throw new Error('Error loading favorites');
    }
  };

  const isFavorite = (id: number): boolean => {
    const res = state.favorites.findIndex((el) => el.itemId === id) !== -1;
    return res;
  };

  useEffect(() => {
    loadFavorites();
  }, [status]);

  return {
    favorites: state.favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    isLoading,
  };
};
