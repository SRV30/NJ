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
import adminOrdersReducer from "./order-slice/AdminOrderSlice";
import testimonialsReducer from "./extra/testimonialSlice";
import faqSlice from "./extra/faqSlice";
import privacyPolicyReducer from "./extra/privacyPolicySlice";
import photoSlice from "./extra/photoSlice";
import termsReducer from "./extra/termsSlice";

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
    adminOrders: adminOrdersReducer,
    testimonials: testimonialsReducer,
    faq: faqSlice,
    privacyPolicy: privacyPolicyReducer,
    photo: photoSlice,
    terms: termsReducer,
  },
});

export default store;
