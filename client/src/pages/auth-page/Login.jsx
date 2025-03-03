import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getSingleDetail, loginUser } from "@/store/auth-slice/user";
import MetaData from "../extras/MetaData";
import { showJewelryToast } from "../extras/showJewelryToast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const { verifyEmail } = useSelector((state) => state.otp);

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/my-profile";

  const loginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showJewelryToast("Please fill in all fields", "error");
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (error) {
      showJewelryToast(error, "error");
    }
    if (isAuthenticated) {
      dispatch(getSingleDetail());
      showJewelryToast("Welcome back!", "success");
      const isEmailVerified = localStorage.getItem("verifyEmail") === "true";

      if (!verifyEmail && !isEmailVerified) {
        navigate("/verify-email");
      } else {
        navigate(redirect || "/");
      }
    }
  }, [isAuthenticated, error, navigate, redirect, verifyEmail, dispatch]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <MetaData
        title="Login | Nandani Jewellers - Elegant Access"
        description="Sign in to your Nandani Jewellers account with elegance. Track your precious orders and unlock exclusive jewelry collections."
        keywords="Nandani Jewellers login, luxury jewelry login, premium account access, secure shopping"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-amber-100 dark:border-gray-700"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-6 text-center"
        >
          Welcome Back
        </motion.h2>

        <motion.form variants={itemVariants} onSubmit={loginSubmit}>
          <div className="mb-6 relative">
            <Email className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600" />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-amber-400 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-600/50 transition-all duration-300"
            />
          </div>

          <div className="mb-6 relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-lg border border-amber-400 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-600/50 transition-all duration-300"
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-amber-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex justify-between items-center mb-6 text-sm"
          >
            <label className="flex items-center text-amber-700 dark:text-amber-300">
              <input type="checkbox" className="mr-2 accent-amber-600" />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-amber-600 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-400 transition-colors duration-200"
            >
              Forgot Password?
            </Link>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-medium tracking-wide shadow-md hover:from-amber-700 hover:to-amber-800 disabled:opacity-70 transition-all duration-300"
            disabled={loading}
            type="submit"
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
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </motion.form>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-center text-amber-700 dark:text-amber-300"
        >
          New to Nandani Jewellers?
          <Link
            to="/signup"
            className="ml-1 text-amber-600 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-400 font-medium transition-colors duration-200"
          >
            Create an Account
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;