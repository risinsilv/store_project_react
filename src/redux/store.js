// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for web
import cartReducer from './cartSlice';

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // Key for persisting
  storage,     // Use localStorage
};

// Create a persisted reducer with the configuration
const persistedReducer = persistReducer(persistConfig, cartReducer);

// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: {
    cart: persistedReducer, // Apply the persisted reducer to cart state
  },
});

// Create a persistor to manage rehydration
export const persistor = persistStore(store);
