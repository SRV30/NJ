import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtp, verifyEmailOtp } from "@/store/auth-slice/otpSlice";
import { showJewelryToast } from "../extras/showJewelryToast";
import MetaData from "../extras/MetaData";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, successMessage, verifyEmail } = useSelector(
    (state) => state.otp
  );
  const { user } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (verifyEmail) {
      navigate(redirect);
      showJewelryToast(successMessage, "success");
    }
  }, [verifyEmail, navigate, redirect, successMessage]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length !== 6)
      return showJewelryToast("OTP must be 6 digits", "error");
    dispatch(verifyEmailOtp({ email: user?.email, otp }));
  };

  const handleResendOtp = () => {
    if (user?.email) {
      dispatch(resendOtp(user.email));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <MetaData title="Verify OTP | Nandani Jewellers" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-amber-100 dark:border-gray-700 p-8 max-w-md w-full text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-6"
        >
          Verify Your Email
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-amber-700 dark:text-amber-300 mb-6"
        >
          Enter the 6-digit OTP sent to{" "}
          <strong>{user?.email || "your email"}</strong>
        </motion.p>

        <form onSubmit={handleVerify}>
          <motion.div variants={itemVariants} className="mb-6">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              placeholder="Enter OTP"
              className="w-full p-3 rounded-lg border border-amber-400 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-600/50 text-center text-lg font-semibold tracking-wider transition-all duration-300"
            />
          </motion.div>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-medium tracking-wide shadow-md hover:from-amber-700 hover:to-amber-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </motion.button>
        </form>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleResendOtp}
          className="mt-6 text-amber-600 dark:text-amber-300 font-medium hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200"
          disabled={loading}
        >
          Resend OTP
        </motion.button>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
