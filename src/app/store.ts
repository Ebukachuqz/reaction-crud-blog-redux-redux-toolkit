import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "features/api/apiSlice";
import userReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
