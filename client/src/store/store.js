import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./extra/darkModeSlice";
import authReducer from "./auth-slice/user";
import otpSlice from "./auth-slice/otpSlice";
import jewelleryReducer from "./product-slice/jewelleryType";
import categoryReducer from "./product-slice/category";
import productReducer from "./product-slice/product";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    otp: otpSlice,
    jewellery: jewelleryReducer,
    category: categoryReducer,
    product: productReducer,
  },
});

export default store;
