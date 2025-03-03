import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Email, Lock } from "@mui/icons-material";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [sentPassword] = useState("123456"); 
  const navigate = useNavigate();

  const handleEmailSubmit = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    toast.success("Temporary password sent to your email!");
    setEmailSubmitted(true);
  };

  const handlePasswordSubmit = () => {
    if (!password) {
      toast.error("Please enter the temporary password");
      return;
    }
    if (password === sentPassword) {
      toast.success("Password verified successfully!");
      navigate("/reset-password");
    } else {
      toast.error("Incorrect password. Please try again.");
    }
  };

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
          Forgot Password
        </motion.h2>

        {!emailSubmitted ? (
          <>
            <motion.p
              variants={itemVariants}
              className="text-amber-700 dark:text-amber-300 mb-6 text-center"
            >
              Enter your registered email to receive a temporary password.
            </motion.p>
            <motion.div variants={itemVariants} className="mb-6 relative">
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
            </motion.div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleEmailSubmit}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-medium tracking-wide shadow-md hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
            >
              Send Code
            </motion.button>
          </>
        ) : (
          <>
            <motion.p
              variants={itemVariants}
              className="text-amber-700 dark:text-amber-300 mb-6 text-center"
            >
              Enter the temporary password sent to your email.
            </motion.p>
            <motion.div variants={itemVariants} className="mb-6 relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
              >
                <Lock />
              </motion.div>
              <input
                type="password"
                placeholder="Temporary Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-amber-200 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-400/50 transition-all duration-300"
              />
            </motion.div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handlePasswordSubmit}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-medium tracking-wide shadow-md hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
            >
              Verify and Reset Password
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;