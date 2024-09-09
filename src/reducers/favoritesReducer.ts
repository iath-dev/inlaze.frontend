import { Favorite } from '@/types/api';

export interface FavoritesState {
  favorites: Favorite[];
}

export interface FavoritesAction {
  type: 'LOAD_FAVORITES' | 'ADD_FAVORITE' | 'REMOVE_FAVORITE';
  payload: Favorite[] | Favorite;
}

export const favoritesReducer = (
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState => {
  switch (action.type) {
    case 'LOAD_FAVORITES':
      return {
        ...state,
        favorites: action.payload as Favorite[],
      };
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload as Favorite],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.id !== (action.payload as Favorite).id,
        ),
      };
    default:
      return state;
  }
};
