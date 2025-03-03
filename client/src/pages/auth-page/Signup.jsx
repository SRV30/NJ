import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Person,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { showJewelryToast } from "../extras/showJewelryToast";
import { clearError, signupUser } from "@/store/auth-slice/user";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, user } = useSelector((state) => state.auth);
  useEffect(() => {}, [user, loading, navigate, dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showJewelryToast("Please fill in all fields", "error");
      return;
    }
    dispatch(signupUser({ name, email, password }));
    showJewelryToast("Welcome to Nandani Jewellers!", "success");
    navigate("/login");
  };

  useEffect(() => {
    if (error) {
      showJewelryToast(error, "error");
      dispatch(clearError());
    }
  }, [dispatch, error, navigate]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
          Join Nandani Jewellers
        </motion.h2>

        <div className="mb-6 relative">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
          >
            <Person />
          </motion.div>
          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-amber-400 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-600/50 transition-all duration-300"
          />
        </div>

        <div className="mb-6 relative">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
          >
            <Email />
          </motion.div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-amber-400 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-600/50 transition-all duration-300"
          />
        </div>

        <div className="mb-6 relative">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
          >
            <Lock />
          </motion.div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
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

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={loading}
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-medium tracking-wide shadow-md hover:from-amber-700 hover:to-amber-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
        >
          {loading ? (
            <>
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
              Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </motion.button>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-center text-amber-700 dark:text-amber-300"
        >
          Already a member?
          <Link
            to="/login"
            className="ml-1 text-amber-600 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-400 font-medium transition-colors duration-200"
          >
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;
