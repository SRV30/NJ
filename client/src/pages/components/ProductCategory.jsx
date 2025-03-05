import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { showJewelryToast } from "../extras/showJewelryToast";
import { fetchCategories, clearError } from "@/store/product-slice/category";

const ProductCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.category);

  const [shuffledCategories, setShuffledCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showJewelryToast(error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    if (categories.length > 0) {
      setShuffledCategories(shuffleArray(categories));
    }
  }, [categories]);

  const getItemsPerPage = () => {
    if (window.innerWidth >= 1280) return 10;
    if (window.innerWidth >= 1024) return 8;
    if (window.innerWidth >= 768) return 6;
    return 4;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(shuffledCategories.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
  };

  const getVisibleCategories = () => {
    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return shuffledCategories.slice(start, end);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
    hover: { y: -10, scale: 1.02 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "#d97706",
      boxShadow: "0 0 25px rgba(217, 119, 6, 0.3)",
    },
    tap: { scale: 0.95 },
  };

  const categoryColors = {
    Diamond: "from-blue-100 via-indigo-100 to-purple-100",
    Gold: "from-amber-400 via-amber-500 to-amber-600",
    Silver: "from-gray-200 via-gray-300 to-gray-400",
    Earrings: "from-rose-200 via-pink-200 to-red-200",
    Necklace: "from-emerald-100 via-teal-500 to-cyan-300",
    Pendants: "from-violet-200 via-purple-200 to-fuchsia-200",
    Bracelets: "from-orange-200 via-amber-200 to-yellow-200",
    Mangalsutra: "from-pink-300 via-rose-300 to-red-300",
    Coins: "from-yellow-300 via-amber-300 to-orange-300",
    "Jewellery with Gems": "from-green-300 via-emerald-300 to-teal-300",
    Ring: "from-blue-300 via-indigo-300 to-purple-300",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full border-4 border-t-amber-500 border-l-amber-400 border-r-transparent border-b-transparent animate-spin"></div>

          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <h5 className="text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 tracking-wide uppercase font-[Playfair Display]">
        Shop By
      </h5>

      <h3 className="text-4xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8 font-mono">
        Category
      </h3>

      <motion.div
        className="max-w-7xl mx-auto relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-amber-100/30 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {shuffledCategories.length > itemsPerPage && (
          <>
            <motion.button
              onClick={prevSlide}
              className="absolute z-20 left-6 top-1/2 -translate-y-1/2 bg-amber-600/90 dark:bg-amber-700/90 text-white p-4 rounded-full shadow-2xl hover:bg-amber-700 transition-all duration-300 backdrop-blur-sm"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaAngleLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="absolute z-20 right-6 top-1/2 -translate-y-1/2 bg-amber-600/90 dark:bg-amber-700/90 text-white p-4 rounded-full shadow-2xl hover:bg-amber-700 transition-all duration-300 backdrop-blur-sm"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaAngleRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-8">
              {getVisibleCategories().map((category) => (
                <motion.div
                  key={category._id}
                  className="relative group h-72 rounded-3xl overflow-hidden shadow-lg border border-amber-100/30 dark:border-gray-700/50"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                  {category.images[0]?.url && (
                    <motion.img
                      src={category.images[0].url}
                      alt={category.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  <div
                    className={`absolute bottom-0 left-0 right-0 p-4 text-center z-20 bg-gradient-to-r ${
                      categoryColors[category.name]
                    }`}
                  >
                    <h3 className="text-xl font-serif font-semibold text-white drop-shadow-md capitalize">
                      {category.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {shuffledCategories.length > itemsPerPage && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-20">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentIndex === index
                    ? "bg-amber-500 dark:bg-amber-400"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                animate={{
                  scale: currentIndex === index ? 1.4 : 1,
                  width: currentIndex === index ? "1.5rem" : "0.75rem",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}

        <motion.div
          className="pb-12 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => (window.location.href = "/products")}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-2xl font-serif font-semibold text-xl tracking-wide shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(217, 119, 6, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            All Jewellery →
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductCategory;
