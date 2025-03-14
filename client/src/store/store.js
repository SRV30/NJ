import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./extra/darkModeSlice";
import authReducer from "./auth-slice/user";
import otpSlice from "./auth-slice/otpSlice";
import jewelleryReducer from "./product-slice/jewelleryType";
import categoryReducer from "./product-slice/category";
import productReducer from "./product-slice/product";
import dashboardReducer from "./extra/dashboardSlice";
import addressReducer from "./address-slice/addressSlice";
import contactReducer from "@/store/extra/getintouchSlice";
import productSlice from "./product-slice/getbySlice";
import cartReducer from "./order-slice/addToCart";
import wishListReducer from "./order-slice/addToWishList";
import orderReducer from "./order-slice/order";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    otp: otpSlice,
    product: productReducer,
    jewellery: jewelleryReducer,
    category: categoryReducer,
    dashboard: dashboardReducer,
    address: addressReducer,
    contact: contactReducer,
    getproducts: productSlice,
    cart: cartReducer,
    wishList: wishListReducer,
    order: orderReducer,
  },
});

export default store;
