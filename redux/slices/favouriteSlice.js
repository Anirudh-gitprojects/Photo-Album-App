import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.favorites.find(item => item.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoriteSlice.actions;

export const loadFavoritesFromStorage = () => async (dispatch) => {
  try {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    if (storedFavorites) {
      dispatch(setFavorites(JSON.parse(storedFavorites)));
    }
  } catch (error) {
    console.error('Failed to load favorites from storage:', error);
  }
};

export default favoriteSlice.reducer;
