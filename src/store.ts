// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/apiSlice.ts';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
