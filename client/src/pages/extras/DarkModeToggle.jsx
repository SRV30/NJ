import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { toggleDarkMode } from "@/store/extra/darkModeSlice";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const buttonVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    initial: { rotate: -90, opacity: 0 },
    animate: { rotate: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { rotate: 90, opacity: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const textVariants = {
    initial: { x: -10, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { x: 10, opacity: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={handleToggle}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 dark:from-gray-700 dark:to-gray-800 border border-amber-300 dark:border-gray-600 shadow-md transition-all duration-500"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={darkMode ? "moon" : "sun"}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {darkMode ? (
            <Moon className="text-amber-400" size={22} />
          ) : (
            <Sun className="text-amber-600" size={22} />
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.span
          key={darkMode ? "dark" : "light"}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-sm font-serif font-medium text-amber-800 dark:text-amber-200 hidden sm:block"
        >
          {darkMode ? "Dark Mode" : "Light Mode"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default DarkModeToggle;