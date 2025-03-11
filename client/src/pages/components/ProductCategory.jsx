import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { showJewelryToast } from "../extras/showJewelryToast";
import { fetchCategories, clearError } from "@/store/product-slice/category";
import { ArrowRight } from "lucide-react";
import Loader from "../extras/Loader";
import { Link } from "react-router-dom";

const ProductCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.category);
  const [shuffledCategories, setShuffledCategories] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRotateX = useTransform(mouseY, [0, 500], [5, -5]);
  const cardRotateY = useTransform(mouseX, [0, 500], [-5, 5]);
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
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateY: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      y: -15,
      scale: 1.05,
      boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      backgroundColor: "#d97706",
      boxShadow: "0 0 35px rgba(217,119,6,0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.9 },
  };
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };
  const gradientColors = useMemo(
    () => [
      "from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600",
      "from-amber-500 to-red-600 dark:from-amber-300 dark:to-red-500",
      "from-yellow-500 to-amber-700 dark:from-yellow-300 dark:to-amber-500",
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {}, 3000);
    return () => clearInterval(interval);
  }, [gradientColors.length]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 ">
      <motion.div
        className="relative mx-auto max-w-lg md:max-w-4xl lg:max-w-6xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h5
          className={`text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-800 tracking-wide uppercase font-[Playfair Display]`}
          variants={titleVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          Shop By
        </motion.h5>
        <motion.h3
          className="text-6xl font-bold text-center text-amber-800 dark:text-amber-300 mb-12 font-mono relative"
          variants={titleVariants}
        >
          <span className="relative inline-block">
            Category
            <motion.span
              className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: "60%", x: "-50%" }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </span>
        </motion.h3>
        <motion.div
          ref={containerRef}
          className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden shadow-[0_20px_70px_-15px_rgba(217,119,6,0.3)] dark:shadow-[0_20px_70px_-15px_rgba(217,119,6,0.2)] border border-amber-100/30 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            boxShadow:
              "0 20px 70px -15px rgba(217,119,6,0.3), 0 0 40px rgba(217,119,6,0.1) inset",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-600/10 dark:to-yellow-600/10 pointer-events-none"
            animate={
              isHovering
                ? {
                    background: [
                      "radial-gradient(circle at 0% 0%, rgba(217,119,6,0.15) 0%, rgba(0,0,0,0) 50%)",
                      "radial-gradient(circle at 100% 0%, rgba(217,119,6,0.15) 0%, rgba(0,0,0,0) 50%)",
                      "radial-gradient(circle at 100% 100%, rgba(217,119,6,0.15) 0%, rgba(0,0,0,0) 50%)",
                      "radial-gradient(circle at 0% 100%, rgba(217,119,6,0.15) 0%, rgba(0,0,0,0) 50%)",
                      "radial-gradient(circle at 0% 0%, rgba(217,119,6,0.15) 0%, rgba(0,0,0,0) 50%)",
                    ],
                  }
                : {}
            }
            transition={
              isHovering
                ? { duration: 10, repeat: Infinity, ease: "linear" }
                : {}
            }
          />
          {shuffledCategories.length > itemsPerPage && (
            <>
              <motion.button
                onClick={prevSlide}
                className="absolute z-20 left-6 top-1/2 -translate-y-1/2 bg-amber-600/90 dark:bg-amber-700/90 text-white p-5 rounded-full shadow-[0_10px_30px_rgba(217,119,6,0.3)] backdrop-blur-sm"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <FaAngleLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                className="absolute z-20 right-6 top-1/2 -translate-y-1/2 bg-amber-600/90 dark:bg-amber-700/90 text-white p-5 rounded-full shadow-[0_10px_30px_rgba(217,119,6,0.3)] backdrop-blur-sm"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <FaAngleRight className="w-6 h-6" />
              </motion.button>
            </>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="w-full"
              initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-10">
                {getVisibleCategories().map((category, idx) => (
                  <Link
                    key={category._id}
                    to={`/products?productCategory=${category._id}`}
                  >
                    <motion.div
                      key={category._id}
                      className="relative group h-80 rounded-3xl overflow-hidden shadow-lg border border-amber-100/30 dark:border-gray-700/50 perspective-1000"
                      variants={cardVariants}
                      whileHover="hover"
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.1 }}
                      style={{
                        transformStyle: "preserve-3d",
                        WebkitTransformStyle: "preserve-3d",
                        boxShadow:
                          "0 15px 35px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.07)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(217,119,6,0.1) 100%)",
                        }}
                      />
                      {category.images[0]?.url && (
                        <motion.div
                          className="w-full h-full"
                          style={{
                            rotateX: isHovering ? cardRotateX : 0,
                            rotateY: isHovering ? cardRotateY : 0,
                            transformStyle: "preserve-3d",
                          }}
                        >
                          <motion.img
                            src={category.images[0].url}
                            alt={category.name}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            style={{
                              transformStyle: "preserve-3d",
                              transition:
                                "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                            }}
                            whileHover={{ scale: 1.1 }}
                          />
                        </motion.div>
                      )}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 z-20"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                      >
                        <div className="p-4 backdrop-blur-md bg-amber-800/90 relative overflow-hidden">
                          <motion.div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-30" />
                          <h3 className="text-xl font-serif font-semibold text-white drop-shadow-md capitalize relative">
                            {category.name}
                          </h3>
                        </div>
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 bg-amber-500 mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        whileHover={{
                          opacity: 0.2,
                          transition: { duration: 0.3 },
                        }}
                      />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          {shuffledCategories.length > itemsPerPage && (
            <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-3 z-20">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-3 rounded-full cursor-pointer ${
                    currentIndex === index
                      ? "bg-amber-500 dark:bg-amber-400"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  animate={{
                    scale: currentIndex === index ? [1, 1.2, 1] : 1,
                    width: currentIndex === index ? "2rem" : "0.75rem",
                    boxShadow:
                      currentIndex === index
                        ? "0 0 10px rgba(217,119,6,0.7)"
                        : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    ...(currentIndex === index && {
                      scale: { repeat: Infinity, duration: 2 },
                    }),
                  }}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}

          <motion.div
            className="pb-16 pt-10 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={() => (window.location.href = "/products")}
              className="relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-4 rounded-2xl font-serif font-semibold text-xl tracking-wide shadow-xl overflow-hidden group"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(217, 119, 6, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                All Categories
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight />
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductCategory;
