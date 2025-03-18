'use client';
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
  // Add middleware configuration if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This helps with date objects
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 