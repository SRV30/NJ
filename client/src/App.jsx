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

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-stone-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
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
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default App;
