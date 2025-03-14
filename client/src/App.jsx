import { Route, Routes } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/components/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./pages/components/Footer";
import WhatsAppButton from "./pages/extras/Whatsapp";
import VerifyEmail from "./pages/auth-page/VerifyEmail";
import Login from "./pages/auth-page/Login";
import SignUp from "./pages/auth-page/Signup";
import ForgotPassword from "./pages/auth-page/ForgotPassword";
import ResetPassword from "./pages/auth-page/ResetPassword";
import ProtectedRoute from "./pages/extras/ProtectedRoute";
import MyProfile from "./pages/my-profile/MyProfile";
import About from "./pages/components/About";
import ContactUs from "./pages/components/ContactUs";
import ScrollToTop from "./pages/extras/ScrollToTop";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useDispatch, useSelector } from "react-redux";
import ProductsPage from "./pages/products/Products";
import SingleProductPage from "./pages/products/SingleProduct";
import UpdatePassword from "./pages/my-profile/UpdatePassword";
import UpdateProfile from "./pages/my-profile/UpdateProfile";
import SavedAddress from "./pages/my-profile/SavedAddress";
import MyOrders from "./pages/my-profile/MyOrders";
import VerifyOtp from "./pages/auth-page/ResetVerifyOtp";
import AdminSingleUser from "./pages/admin/AdminSingleUser";
import Cart from "./pages/orders/Cart";
import Wishlist from "./pages/orders/Wishlist";
import { useEffect } from "react";
import { getCartItems } from "./store/order-slice/addToCart";
import { getWishListItems } from "./store/order-slice/addToWishList";
// import FAQPage from "./pages/extras/FAQPage";
// import PrivacyPolicy from "./pages/extras/PrivacyPolicy";
// import TermsAndServices from "./pages/extras/TermsAndServices";
import Checkout from "./pages/orders/Checkout";
import OrderSuccess from "./pages/orders/OrderSuccess";
import OrderDetails from "./pages/my-profile/OrderDetails";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
    dispatch(getWishListItems());
  }, [dispatch]);

  return (
    <div className="flex flex-col mt-15 sm:mt-17 lg:mt-20 overflow-hidden bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <WhatsAppButton />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<SingleProductPage />} />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
          <Route
          path="/order/:Id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-address"
          element={
            <ProtectedRoute>
              <SavedAddress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
         <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
         <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/faqs" element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndServices />} /> */}

    

        {isAuthenticated && user?.role === "ADMIN" && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users/:id" element={<AdminSingleUser />} />
          </>
        )}
      </Routes>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default App;
