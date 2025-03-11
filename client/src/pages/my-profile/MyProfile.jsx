import { useState, useRef, useEffect } from "react";
import { User, ShoppingBag, Lock, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getSingleDetail } from "@/store/auth-slice/user";
import MediData from "../extras/MetaData";
import Loader from "../extras/Loader";

const MyProfile = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [profileImage, setProfileImage] = useState(
    user?.avatar || "https://placehold.co/150x150"
  );

  useEffect(() => {
    dispatch(getSingleDetail());
  }, [dispatch]);

  useEffect(() => {
    if (user?.avatar) {
      setProfileImage(user.avatar);
    }
  }, [user]);

  const displayFields = ["name", "email", "mobile"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const navLinkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MediData title="My Profile | Nandani Jewellers" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl sm:text-4xl font-serif font-medium text-amber-800 dark:text-amber-200"
            variants={itemVariants}
          >
            My Account
          </motion.h1>
          <motion.p
            className="text-amber-600 dark:text-amber-400 mt-2 text-sm sm:text-base"
            variants={itemVariants}
          >
            Manage your profile and preferences
          </motion.p>
        </div>

        <div className="sm:hidden flex flex-col items-center text-center space-y-8">
          <motion.div
            className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-amber-300 dark:border-amber-600 cursor-pointer shadow-lg"
            variants={itemVariants}
          >
            {loading ? (
              <Loader />
            ) : (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-fit transition-transform duration-300 hover:scale-105 cursor-default"
              />
            )}
          </motion.div>
          <motion.h2
            className="text-xl font-serif font-semibold text-amber-800 dark:text-amber-200 capitalize"
            variants={itemVariants}
          >
            {loading ? "Loading..." : user?.name || "Guest"}
          </motion.h2>
          <motion.p
            className="text-amber-600 dark:text-amber-400 text-sm"
            variants={itemVariants}
          >
            {loading ? "Loading..." : user?.role || "N/A"}
          </motion.p>

          {/* Profile Details */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-lg w-full"
            variants={containerVariants}
          >
            <motion.h3
              className="text-lg font-serif font-medium text-amber-800 dark:text-amber-200 mb-4"
              variants={itemVariants}
            >
              Profile Information
            </motion.h3>
            <div className="grid gap-4">
              {displayFields.map((field) => (
                <motion.div
                  key={field}
                  className="p-4 rounded-lg bg-amber-50 dark:bg-gray-900 border border-amber-200 dark:border-gray-700"
                  variants={itemVariants}
                >
                  <span className="text-sm text-amber-600 dark:text-amber-400 block mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                  <p className="font-medium text-amber-800 dark:text-amber-200 text-sm">
                    {loading ? "Loading..." : user?.[field] || "Not provided"}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-8">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-amber-100 dark:border-gray-700 p-6 lg:col-span-1"
            variants={containerVariants}
          >
            <div className="text-center">
              <motion.div
                className="relative inline-block group"
                variants={itemVariants}
              >
                <div
                  className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-amber-100 dark:bg-gray-700 cursor-pointer border-4 border-amber-300 dark:border-amber-600 shadow-inner"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {loading ? (
                    <p className="flex items-center justify-center h-full text-amber-600 dark:text-amber-300 text-sm">
                      Loading...
                    </p>
                  ) : (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-fit transition-transform duration-300 group-hover:scale-105 cursor-default"
                    />
                  )}
                </div>
              </motion.div>

              <motion.h2
                className="mt-4 text-2xl font-serif font-semibold text-amber-800 dark:text-amber-200 capitalize"
                variants={itemVariants}
              >
                {loading ? "Loading..." : user?.name || "Guest"}
              </motion.h2>
              <motion.p
                className="text-amber-600 dark:text-amber-400 text-sm"
                variants={itemVariants}
              >
                {loading ? "Loading..." : user?.role || "N/A"}
              </motion.p>
            </div>

            <nav className="mt-6 flex flex-col space-y-3">
              {[
                {
                  to: "/my-profile",
                  icon: User,
                  label: "Profile Info",
                  active: true,
                },
                { to: "/my-orders", icon: ShoppingBag, label: "My Orders" },
                {
                  to: "/update-password",
                  icon: Lock,
                  label: "Update Password",
                },
                { to: "/saved-address", icon: MapPin, label: "Saved Address" },
                {
                  to: "/update-profile",
                  icon: FaUserEdit,
                  label: "Update Profile",
                },
              ].map((link) => (
                <motion.div key={link.to} variants={itemVariants}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg font-medium transition-all duration-300 text-center ${
                        isActive || link.active
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md"
                          : "text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <motion.div
                      variants={navLinkVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="flex items-center justify-center gap-2"
                    >
                      <link.icon size={16} />
                      <span className="text-sm">{link.label}</span>
                    </motion.div>
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-amber-100 dark:border-gray-700 p-6 lg:col-span-2"
            variants={containerVariants}
          >
            <motion.h3
              className="text-xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-4"
              variants={itemVariants}
            >
              Profile Information
            </motion.h3>
            <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
              {displayFields.map((field) => (
                <motion.div
                  key={field}
                  className="p-4 rounded-lg bg-amber-50 dark:bg-gray-900 border border-amber-200 dark:border-gray-700"
                  variants={itemVariants}
                >
                  <span className="text-sm text-amber-600 dark:text-amber-400 block mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                  <p className="font-medium text-amber-800 dark:text-amber-200 text-sm sm:text-base">
                    {loading ? "Loading..." : user?.[field] || "Not provided"}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation - Mobile Only */}
        <div className="sm:hidden bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg py-10 flex justify-around border-t border-amber-200 dark:border-gray-700 ">
          {[
            { to: "/my-profile", icon: User, label: "Profile" },
            { to: "/my-orders", icon: ShoppingBag, label: "Orders" },
            { to: "/update-password", icon: Lock, label: "Password" },
            { to: "/saved-address", icon: MapPin, label: "Address" },
            { to: "/update-profile", icon: FaUserEdit, label: "Edit" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs transition-all duration-300 ${
                  isActive
                    ? "text-amber-700 dark:text-amber-300"
                    : "text-gray-500 dark:text-gray-400"
                }`
              }
            >
              <link.icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfile;
