import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./extra/darkModeSlice";
import authReducer from "./auth-slice/user";
import otpSlice from "./auth-slice/otpSlice";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    otp: otpSlice,
  },
});

export default store;
