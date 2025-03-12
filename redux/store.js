import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './slices/imageSlice';
import favoritesReducer from './slices/favouriteSlice';

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    favorites: favoritesReducer,
  },
});
