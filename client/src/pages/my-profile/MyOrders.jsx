import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { myOrders } from "@/store/order-slice/order";
import Loader from "../extras/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

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

  const filterOrders = () => {
    let filtered = Array.isArray(orders) ? [...orders] : [];

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((order) => order.orderStatus === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter((order) => {
        const orderId = order._id ? String(order._id).toLowerCase() : "";
        const productNames = order.products
          ?.map((p) => String(p.product?.name || "").toLowerCase())
          .join(" ");
        return (
          orderId.includes(searchQuery.toLowerCase()) ||
          productNames.includes(searchQuery.toLowerCase())
        );
      });
    }

    // Flatten orders so that each product is available with its order info
    const flattenedProducts = filtered.flatMap((order) =>
      order.products.map((product) => ({
        ...product,
        orderId: order._id,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
      }))
    );

    return flattenedProducts;
  };

  const filteredProducts = filterOrders();
  const indexOfLastProduct = currentPage * ordersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / ordersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300 p-3 sm:p-5 lg:p-8"
    >
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative bg-white/80 dark:bg-amber-950/30 backdrop-blur-sm shadow-lg rounded-xl p-5 sm:p-6 mb-6 border border-amber-200/50 dark:border-amber-800/30"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 dark:from-amber-700 dark:via-amber-500 dark:to-amber-700 rounded-t-xl"></div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-800 dark:text-amber-300 text-center font-serif">
          My Collection
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 dark:from-amber-700 dark:via-amber-500 dark:to-amber-700 mx-auto mt-3"></div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="flex flex-col sm:flex-row sm:items-start sm:space-x-5 mb-5 sm:mb-6"
      >
        {/* Filters Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full sm:w-1/4 bg-white/80 dark:bg-amber-950/30 backdrop-blur-sm shadow-lg rounded-xl p-4 sm:p-5 mb-4 sm:mb-0 border border-amber-200/50 dark:border-amber-800/30"
        >
          <h3 className="text-sm sm:text-base font-serif font-semibold mb-3 text-amber-800 dark:text-amber-300 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Refine Your Collection
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-amber-700 dark:text-amber-400 mb-2 font-medium">
                Order Status
              </label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50 text-xs sm:text-sm p-2 rounded-lg focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 focus:border-transparent appearance-none"
                >
                  <option value="ALL">All Orders</option>
                  <option value="BOOKED">Booked</option>
                  <option value="PURCHASED">Purchased</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="EXPIRED">Expired</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-700 dark:text-amber-400">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Orders Display */}
        <div className="w-full sm:w-3/4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-4 sm:mb-5"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search your treasures..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 pl-10 border border-amber-200 dark:border-amber-700/50 bg-white/80 dark:bg-amber-950/30 backdrop-blur-sm rounded-xl text-amber-800 dark:text-amber-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-500 dark:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-16"
            >
              <Loader />
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center py-16 bg-white/80 dark:bg-amber-950/30 backdrop-blur-sm rounded-xl p-8 border border-amber-200/50 dark:border-amber-800/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium">
                Error loading your collection.
              </p>
              <p className="text-sm mt-2">Please try refreshing the page.</p>
            </motion.div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-amber-700 dark:text-amber-400 text-center py-16 bg-white/80 dark:bg-amber-950/30 backdrop-blur-sm rounded-xl p-8 border border-amber-200/50 dark:border-amber-800/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-lg font-medium font-serif">
                No treasures found in your collection.
              </p>
              <p className="text-sm mt-2">
                Explore our catalog to find your perfect piece.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
            >
              <AnimatePresence>
                {currentProducts.map((product) => (
                  <motion.div
                    key={`${product.orderId}-${product._id}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/80 dark:bg-amber-950/30 backdrop-blur-sm shadow-lg rounded-xl p-4 border border-amber-200/50 dark:border-amber-800/30 overflow-hidden group"
                  >
                    <div className="flex items-start space-x-3">
                      <Link
                        to={`/product/${product.product._id}`}
                        className="flex-shrink-0"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20">
                          <img
                            src={
                              product.product.images &&
                              product.product.images.length > 0
                                ? product.product.images[0].url
                                : "https://via.placeholder.com/64"
                            }
                            alt={product.product.name}
                            className="w-full h-full object-fit rounded"
                          />
                        </div>
                      </Link>
                      <div className="flex-1">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 capitalize">
                          {product.product.name || "Unknown Product"}
                        </h3>
                        <div className="mt-1">
                          <span
                            className={`inline-block ${handleStatus(
                              product.orderStatus
                            )}`}
                          >
                            {product.orderStatus}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Order Booked on:{" "}
                          {new Date(product.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 ">
                          Order ID: {product.orderId}
                        </p>
                        <div className="mt-2 flex space-x-2">
                          <Tooltip title="View Order Details">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                to={`/order/${product.orderId}`}
                                className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-xs sm:text-sm"
                              >
                                View Details
                              </Link>
                            </motion.div>
                          </Tooltip>
                          {product.orderStatus === "DELIVERED" && (
                            <Tooltip title="Rate & Review Product">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Link
                                  to={`/product/${product.product._id}`}
                                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm"
                                >
                                  Rate & Review
                                </Link>
                              </motion.div>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Pagination */}
          {filteredProducts.length > ordersPerPage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center items-center mt-4 space-x-1 sm:space-x-2 p-2"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-700 text-xs sm:text-sm px-2 py-1 rounded"
                >
                  Previous
                </button>
              </motion.div>
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.div
                  key={i + 1}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-2 py-1 rounded text-xs sm:text-sm ${
                      currentPage === i + 1
                        ? "bg-indigo-600 text-white"
                        : "border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-700 text-xs sm:text-sm px-2 py-1 rounded"
                >
                  Next
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MyOrders;
