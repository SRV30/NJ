import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Header from "./pages/components/Header";
import Footer from "./pages/components/Footer";
import WhatsAppButton from "./pages/extras/Whatsapp";
import ScrollToTop from "./pages/extras/ScrollToTop";
import ProtectedRoute from "./pages/extras/ProtectedRoute";
import { getCartItems } from "./store/order-slice/addToCart";
import { getWishListItems } from "./store/order-slice/addToWishList";

// 🔄 Lazy-loaded pages
const Home = lazy(() => import("./pages/components/Home"));
const About = lazy(() => import("./pages/components/About"));
const ContactUs = lazy(() => import("./pages/components/ContactUs"));
const Login = lazy(() => import("./pages/auth-page/Login"));
const SignUp = lazy(() => import("./pages/auth-page/Signup"));
const ForgotPassword = lazy(() => import("./pages/auth-page/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth-page/ResetPassword"));
const VerifyEmail = lazy(() => import("./pages/auth-page/VerifyEmail"));
const VerifyOtp = lazy(() => import("./pages/auth-page/ResetVerifyOtp"));
const MyProfile = lazy(() => import("./pages/my-profile/MyProfile"));
const MyOrders = lazy(() => import("./pages/my-profile/MyOrders"));
const OrderDetails = lazy(() => import("./pages/my-profile/OrderDetails"));
const UpdatePassword = lazy(() => import("./pages/my-profile/UpdatePassword"));
const UpdateProfile = lazy(() => import("./pages/my-profile/UpdateProfile"));
const SavedAddress = lazy(() => import("./pages/my-profile/SavedAddress"));
const ProductsPage = lazy(() => import("./pages/products/Products"));
const SingleProductPage = lazy(() => import("./pages/products/SingleProduct"));
const Cart = lazy(() => import("./pages/orders/Cart"));
const Wishlist = lazy(() => import("./pages/orders/Wishlist"));
const Checkout = lazy(() => import("./pages/orders/Checkout"));
const OrderSuccess = lazy(() => import("./pages/orders/OrderSuccess"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminSingleUser = lazy(() => import("./pages/admin/AdminSingleUser"));
const CreateTestimonialPage = lazy(() =>
  import("./pages/extras/CreateTestimonialPage")
);
const FAQPage = lazy(() => import("./pages/extras/FAQPage"));
const PrivacyPolicy = lazy(() => import("./pages/extras/PrivacyPolicy"));
const TermsAndServices = lazy(() => import("./pages/extras/TermsAndServices"));
const Photo = lazy(() => import("./pages/extras/Photo"));
const NotFoundPage = lazy(() => import("./pages/extras/NotFoundPage"));

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

      <Suspense
        fallback={<div className="text-center p-8 text-lg">Loading...</div>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
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
          <Route path="/testimonials" element={<CreateTestimonialPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndServices />} />
          <Route path="/photo" element={<Photo />} />

          {isAuthenticated &&
            (user?.role === "ADMIN" || user?.role === "MANAGER") && (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users/:id" element={<AdminSingleUser />} />
              </>
            )}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default App;
