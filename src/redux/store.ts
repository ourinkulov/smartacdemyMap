import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./dataStored/authReducer";
import userReducer from "./dataStored/userReducer";

const store = configureStore({
  reducer: {
    dashboard: userReducer,
    auth: authReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
