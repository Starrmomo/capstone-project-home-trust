import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

/**
 * Redux Store Configuration
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
