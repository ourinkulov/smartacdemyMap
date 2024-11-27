import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./dataStored/userReducer";
import authReducer from "./dataStored/authReducer";

/**
 * Two slices are combined
 */
const rootReducer = combineReducers({
  dashboard: userReducer,
  auth: authReducer
});

export default rootReducer;
