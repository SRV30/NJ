import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "@/store/auth-slice/user";
import { ArrowLeft, ArrowLeftCircle, ArrowRightCircle, Search, Users } from "lucide-react";
import MetaData from "../extras/MetaData.jsx";
import { showJewelryToast } from "../extras/showJewelryToast";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const {
    users = [],
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllUsers({ page, search }));
  }, [dispatch, page, search]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      } 
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      } 
    }),
  };

  const handleStatus = (status) => {
    if (status === "Active") {
      return "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
    } else if (status === "Inactive") {
      return "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
    } else {
      return "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800";
    }
  };

  const shimmer = {
    animate: {
      backgroundPosition: ["0 0", "100% 0"],
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 md:p-8"
    >
      <MetaData title="Admin Users | Nandani Jewellers" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="relative mb-12 flex flex-col gap-4"
          variants={itemVariants}
        >
          <Link
            to="/admin/dashboard"
            className="absolute left-0 top-1 flex items-center gap-2 text-amber-600 dark:text-amber-500 hover:text-amber-800 dark:hover:text-amber-300 transition-colors group"
          >
            <motion.div
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="text-xl group-hover:stroke-2 transition-all" />
            </motion.div>
            <span className="font-medium">Back to Dashboard</span>
          </Link>

          <motion.div
            className="flex flex-col items-center justify-center pt-10"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-600 dark:to-amber-400 rounded-full mb-4"></div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-2 tracking-tight">
              User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-lg">
              Manage all user accounts and permissions for Nandani Jewellers
            </p>
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-600 rounded-full mt-4"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            ></motion.div>
          </motion.div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8 relative"
          variants={itemVariants}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 3px rgba(245, 158, 11, 0.2)" }}
              type="text"
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 transition-all shadow-sm"
            />
          </div>
        </motion.div>

        {/* Content Section */}
        {loading ? (
          <motion.div 
            className="flex flex-col justify-center items-center h-64 gap-4"
            variants={itemVariants}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-12 h-12 rounded-full border-4 border-t-amber-600 border-r-amber-600/40 border-b-amber-600/10 border-l-amber-600/70"
            />
            <motion.p
              animate={shimmer.animate}
              className="text-gray-500 dark:text-gray-400 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent bg-[length:200%_100%]"
            >
              Loading user data...
            </motion.p>
          </motion.div>
        ) : error ? (
          <motion.div
            variants={itemVariants}
            className="p-6 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 rounded-xl border border-rose-200 dark:border-rose-800/50 shadow-sm"
          >
            {showJewelryToast(error, "error")}
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={itemVariants}
              className="overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      {["Name", "Email", "Role", "Status", "Actions"].map(
                        (header, idx) => (
                          <th
                            key={idx}
                            className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {users.length === 0 ? (
                      <motion.tr
                        variants={itemVariants}
                      >
                        <td
                          colSpan="5"
                          className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex flex-col items-center justify-center gap-3">
                            <Users className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                            <p>No users found</p>
                          </div>
                        </td>
                      </motion.tr>
                    ) : (
                      users.map((user, index) => (
                        <motion.tr
                          key={user._id}
                          custom={index}
                          variants={rowVariants}
                          className="hover:bg-amber-50/40 dark:hover:bg-amber-900/10 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {(user.role === "ADMIN" || user.role === "MANAGER")? (
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                {user.role}
                              </span>
                            ) : (
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                {user.role}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${handleStatus(
                                user.status
                              )}`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Link
                                to={`/admin/users/${user._id}`}
                                className="px-4 py-1.5 rounded-lg text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-800 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white transition-colors inline-block"
                              >
                                View Details
                              </Link>
                            </motion.div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Pagination */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Showing page {page} of {totalPages}
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-amber-900/10 hover:border-amber-300 dark:hover:border-amber-700 transition-all"
                >
                  <ArrowLeftCircle className="text-lg" />
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-amber-900/10 hover:border-amber-300 dark:hover:border-amber-700 transition-all"
                >
                  Next
                  <ArrowRightCircle className="text-lg" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AdminUsers;