import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./extra/darkModeSlice";
import authReducer from "./auth-slice/user";
import otpSlice from "./auth-slice/otpSlice";
import jewelleryReducer from "./product-slice/jewelleryType";
import categoryReducer from "./product-slice/category";
import productReducer from "./product-slice/product";
import dashboardReducer from "./extra/dashboardSlice";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    otp: otpSlice,
    jewellery: jewelleryReducer,
    category: categoryReducer,
    product: productReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
