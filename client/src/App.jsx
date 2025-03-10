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
import { useSelector } from "react-redux";
import AdminJewellery from "./pages/admin/AdminJewellery";
import ProductsPage from "./pages/products/Products";
import SingleProductPage from "./pages/products/SingleProduct";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col overflow-hidden bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 mt-15 sm:mt-20 text-amber-800 dark:text-amber-300">
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

        {isAuthenticated && user?.role === "ADMIN" && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/jewellery" element={<AdminJewellery />} />
          </>
        )}
      </Routes>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default App;
