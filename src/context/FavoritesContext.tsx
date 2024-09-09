import {
  FavoritesAction,
  favoritesReducer,
  FavoritesState,
} from '@/reducers/favoritesReducer';
import React, { createContext, useContext, useReducer } from 'react';

const initialState: FavoritesState = {
  favorites: [],
};

interface FavoritesContextType {
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
}

const FavoritesContext = createContext<FavoritesContextType>({
  state: initialState,
  dispatch: () => null,
});

export const FavoritesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);

  if (!context)
    throw new Error('useFavorites debe ser usado en un FavoriteProvider');

  return context;
};
