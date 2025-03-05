import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, Menu, X, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "@/store/auth-slice/user";
import { showJewelryToast } from "../extras/showJewelryToast";
import PropTypes from "prop-types";
import DarkModeToggle from "../extras/DarkModeToggle";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    showJewelryToast("Logged out successfully!", "success");
    navigate("/");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const isActiveRoute = (route) => location.pathname === route;

  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => setMenuOpen(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (dropdownOpen) {
      const timer = setTimeout(() => setDropdownOpen(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [dropdownOpen]);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.header
      className="fixed bg-gradient-to-r from-amber-100/90 to-amber-200/90 dark:from-gray-700 dark:to-gray-600 flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4 top-0 z-50 shadow-md backdrop-blur-md border-b border-amber-200/20 dark:border-gray-700/20 transition-all duration-500 w-full"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Logo */}
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <a href="/" className="flex items-center gap-2">
          <img
            src={""} // Replace with your logo path
            alt="Nandani Jewellers Logo"
            className="h-10 w-auto lg:h-12"
          />
        </a>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.nav
        className="hidden md:flex space-x-6 lg:space-x-10 font-sans font-medium text-amber-900 dark:text-amber-100 tracking-wide"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        {["/", "/products", "/about", "/contactus"].map((path, index) => {
          const label =
            path === "/"
              ? "Home"
              : path === "/products"
              ? "Shop"
              : path === "/about"
              ? "About"
              : "Contact";

          return (
            <motion.a
              key={index}
              href={path}
              className={`relative px-3 py-1 rounded-full transition-all duration-300 ${
                isActiveRoute(path)
                  ? "text-amber-700 bg-amber-700/40 dark:bg-gray-700/50 shadow-sm"
                  : "hover:text-white hover:bg-amber-700/20 dark:hover:bg-gray-700/30"
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
              <motion.span
                className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-amber-800 dark:bg-amber-200 rounded-full transform -translate-x-1/2"
                initial={{ width: 0 }}
                animate={{ width: isActiveRoute(path) ? "80%" : 0 }}
                whileHover={{ width: "80%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.a>
          );
        })}
      </motion.nav>

      {/* Right Icons */}
      <div className="flex items-center space-x-4 lg:space-x-6 text-amber-900 dark:text-amber-100">
        <motion.a
          href="/products"
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Search className="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:text-amber-600 transition-colors" />
        </motion.a>

        <motion.a
          href="/wishlist"
          className="relative"
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:text-amber-600 transition-colors" />
        </motion.a>

        <motion.a
          href="/cart"
          className="relative"
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:text-amber-600 transition-colors" />
        </motion.a>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={toggleDarkMode}
          className="cursor-pointer"
        >
          <DarkModeToggle />
        </motion.div>

        <div className="relative">
          <motion.button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 lg:w-10 lg:h-10 bg-amber-700/70 dark:bg-gray-700/70 text-amber-100 flex items-center justify-center rounded-full shadow-lg hover:bg-amber-800 dark:hover:bg-gray-600 border border-amber-300/30 dark:border-gray-600/30 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-4 h-4 lg:w-5 lg:h-5" />
          </motion.button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-2xl rounded-xl border border-amber-200/50 dark:border-gray-700/50 overflow-hidden z-50"
              >
                {isAuthenticated ? (
                  <>
                    {user.role === "ADMIN" && (
                      <DropdownLink
                        href="/admin/dashboard"
                        text="Admin Dashboard"
                      />
                    )}
                    <DropdownLink href="/my-profile" text="My Profile" />
                    <DropdownLink href="/my-orders" text="My Orders" />
                    <DropdownLink
                      href="/update-password"
                      text="Update Password"
                    />
                    <DropdownLink href="/update-profile" text="Edit Profile" />
                    <motion.button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-amber-600 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-gray-700 border-t border-amber-200/50 dark:border-gray-600/50 transition-all duration-200 font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <DropdownLink href="/login" text="Login" />
                    <DropdownLink href="/signup" text="Signup" />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-amber-800" />
          ) : (
            <Menu className="w-6 h-6 text-amber-800" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-2xl rounded-xl border border-amber-200/50 dark:border-gray-700/50  md:hidden flex flex-col items-center space-y-4 py-6  border-t "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {["/", "/products", "/about", "/contactus"].map((path, index) => {
              const label =
                path === "/"
                  ? "Home"
                  : path === "/products"
                  ? "Shop"
                  : path === "/about"
                  ? "About"
                  : "Contact";

              return (
                <motion.a
                  key={index}
                  href={path}
                  className={`text-base font-sans font-medium dark:text-amber-300  ${
                    isActiveRoute(path)
                      ? "bg-amber-700/40 dark:bg-gray-700/50 rounded-full px-4 py-2 shadow-sm"
                      : "hover:bg-amber-700/20 dark:hover:bg-gray-700/30 rounded-full px-4 py-2"
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

const DropdownLink = ({ href, text }) => (
  <motion.a
    href={href}
    className="block px-4 py-2 text-amber-600 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
    whileHover={{ x: 5 }}
  >
    {text}
  </motion.a>
);

DropdownLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
