import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { cancelOrder, getSingleOrder } from "@/store/order-slice/order";
import MetaData from "../extras/MetaData";
import { Alert } from "@mui/material";
import ConfirmationModal from "../extras/ConfirmationModel";
import Loader from "../extras/Loader";
import { showJewelryToast } from "../extras/showJewelryToast";

const OrderDetails = () => {
  const { Id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getSingleOrder(Id));
  }, [dispatch, Id]);

  const handleStatus = (status) => {
    switch (status) {
      case "PURCHASED":
        return "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-3 py-1 rounded-full font-medium text-xs sm:text-sm";
      case "BOOKED":
        return "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full font-medium text-xs sm:text-sm";
      case "EXPIRED":
        return "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full font-medium text-xs sm:text-sm";
      case "CANCELLED":
        return "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-3 py-1 rounded-full font-medium text-xs sm:text-sm";
      default:
        return "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full font-medium text-xs sm:text-sm";
    }
  };

  if (!order) return null;

  const handleCancelOrder = async () => {
    setIsLoading(true);
    try {
      await dispatch(cancelOrder(order._id)).unwrap();
      showJewelryToast("Booking canceled successfully!", "success");
      window.location.reload();
    } catch (error) {
      showJewelryToast(error || "Failed to cancel booking.", "error");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300 pt-8 pb-16">
      <MetaData title="Order Details | Nandani Jewellers" />
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-300 dark:to-amber-500">
              Order Details
            </span>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="h-px bg-gradient-to-r from-transparent via-amber-500/70 dark:via-amber-400/70 to-transparent absolute bottom-0 left-0"
            />
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : error ? (
          <Alert severity="error" className="max-w-2xl mx-auto">
            {error}
          </Alert>
        ) : order ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-amber-200/50 dark:border-amber-900/30"
            >
              {/* Order Header */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-amber-500/20 dark:from-amber-900/30 dark:to-amber-800/30" />
                <div className="relative z-10 px-6 py-8 md:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl font-serif font-bold text-amber-800 dark:text-amber-200">
                        Order ID:{" "}
                        <span className="font-mono text-amber-700 dark:text-amber-300">
                          {order._id}
                        </span>
                      </h3>
                      <p className="text-amber-700/80 dark:text-amber-400/80 mt-1 text-sm">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className={handleStatus(order.orderStatus)}
                    >
                      {order.orderStatus}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6 md:p-8 space-y-8">
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-sm border border-amber-200/50 dark:border-amber-900/30"
                >
                  <h4 className="text-lg font-serif font-semibold mb-4 flex items-center gap-2 text-amber-800 dark:text-amber-300">
                    <span className="inline-block w-6 h-px bg-amber-800 dark:bg-amber-500"></span>
                    Booking Details
                    <span className="inline-block w-6 h-px bg-amber-800 dark:bg-amber-500"></span>
                  </h4>
                  <div className="space-y-3 text-amber-700 dark:text-amber-400">
                    <p>{order.address.address_line}</p>
                    <p>
                      {order.address.city}, {order.address.state}{" "}
                      {order.address.pincode}
                    </p>
                    <p>{order.address.country}</p>
                    <p className="mt-4 font-medium flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-200/50 dark:bg-amber-900/30">
                        📱
                      </span>
                      {order.address.mobile}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-200/50 dark:bg-amber-900/30">
                        📅
                      </span>
                      Booking Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </motion.div>

                <p>
                  {" "}
                  Please visit our showrooms within 7 days of booking for final
                  fitting and collection of your selected pieces.
                </p>

                <motion.div variants={itemVariants}>
                  <h4 className="text-xl font-serif font-semibold mb-6 text-amber-800 dark:text-amber-300 flex items-center gap-3">
                    <span className="inline-block w-8 h-px bg-amber-800 dark:bg-amber-500"></span>
                    Booked Items
                    <span className="inline-block w-8 h-px bg-amber-800 dark:bg-amber-500"></span>
                  </h4>
                  <div className="space-y-4">
                    {order.products?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        className="flex items-center bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm p-4 rounded-lg shadow-md border border-amber-200/50 dark:border-amber-900/20"
                      >
                        <Link
                          to={`/products/${item.product._id}`}
                          className="flex items-center w-full"
                        >
                          <div className="relative overflow-hidden rounded-lg">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.4 }}
                              className="w-20 h-20 overflow-hidden rounded-lg border-2 border-amber-200/50 dark:border-amber-800/30"
                            >
                              <img
                                src={
                                  item.product?.images?.[0]?.url ||
                                  "/default-image.jpg"
                                }
                                alt={item.product?.name}
                                className="w-full h-full object-fit"
                              />
                            </motion.div>
                          </div>
                          <div className="ml-4 flex-1">
                            <h5 className="font-serif font-semibold text-amber-800 dark:text-amber-300 capitalize">
                              {item.product?.name}
                            </h5>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {order.orderStatus === "BOOKED" && (
                  <motion.div
                    variants={itemVariants}
                    className="flex justify-center mt-10"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      onClick={() => setIsModalOpen(true)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Canceling..." : "Cancel Booking"}
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <Alert severity="info" className="max-w-2xl mx-auto">
            Order not found.
          </Alert>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancelOrder}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? This action cannot be undone."
      />
    </div>
  );
};

export default OrderDetails;
