import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "@mui/icons-material";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); 

  const handleReset = () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    toast.success("Password reset successful!");
    navigate("/login"); 
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
          Reset Your Password
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-amber-700 dark:text-amber-300 mb-6 text-center"
        >
          Enter your new password below.
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
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-amber-400 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-600/50 transition-all duration-300"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6 relative">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
          >
            <Lock />
          </motion.div>
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-amber-400 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-600/50 transition-all duration-300"
          />
        </motion.div>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-medium tracking-wide shadow-md hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
        >
          Reset Password
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ResetPassword;