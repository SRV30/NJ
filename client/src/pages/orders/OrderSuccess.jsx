import { useEffect } from "react";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MetaData from "../extras/MetaData";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    window.history.replaceState(null, "", window.location.href);

    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventBack);

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300 px-4 sm:px-6 py-8">
      <MetaData title="Order Booked Successfully | Nandani Jewellers" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 text-center max-w-lg w-full border border-amber-200 dark:border-amber-800"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center mb-5"
        >
          <CheckCircle className="text-amber-600 dark:text-amber-300 w-14 h-14" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-amber-800 dark:text-amber-300 mt-4 font-serif">
            Booking Confirmed
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 mx-auto my-4"></div>

          <p className="text-amber-700 dark:text-amber-400 mt-4 font-light">
            Thank you for choosing our exquisite collection. Your order has been
            booked successfully.
          </p>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
            <p className="text-amber-800 dark:text-amber-300">
              Please visit our showroom within{" "}
              <span className="font-semibold text-amber-700 dark:text-amber-200">
                7 days
              </span>{" "}
              of booking for final fitting and collection of your selected
              pieces.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-700 dark:to-amber-800 dark:hover:from-amber-600 dark:hover:to-amber-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium shadow-md transition-all duration-300"
          >
            <Home className="w-5 h-5" /> Return to Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/my-orders")}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-800 dark:to-amber-900 dark:hover:from-amber-700 dark:hover:to-amber-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium shadow-md transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5" /> My Booking
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 pt-4 border-t border-amber-200 dark:border-amber-800"
        >
          <p className="text-amber-700 dark:text-amber-400 text-sm font-light italic">
            Experience the elegance of our timeless collection
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
