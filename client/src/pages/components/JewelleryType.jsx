// src/components/JewelleryType.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { showJewelryToast } from "../extras/showJewelryToast";
import {
  fetchJewelleryCategories,
  clearError,
} from "@/store/product-slice/jewelleryType";
import { ArrowRight } from "lucide-react";
import Loader from "../extras/Loader";
import { Link } from "react-router-dom";

const JewelleryType = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.jewellery
  );

  const [shuffledCategories, setShuffledCategories] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchJewelleryCategories());
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
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateY: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        damping: 12,
      },
    },
    hover: {
      y: -15,
      scale: 1.05,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1, opacity: 0.9 },
    hover: {
      scale: 1.15,
      opacity: 1,
      backgroundColor: "#d97706",
      boxShadow: "0 0 30px rgba(217, 119, 6, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.9 },
  };

  const slideVariants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      scale: 0.95,
      filter: "blur(8px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { type: "spring", stiffness: 500, damping: 25 },
        filter: { duration: 0.4 },
      },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction < 0 ? 100 : -100,
      scale: 0.95,
      filter: "blur(8px)",
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.4 },
        filter: { duration: 0.4 },
      },
    }),
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const [slideDirection, setSlideDirection] = useState(1);

  const handleNextSlide = () => {
    setSlideDirection(1);
    nextSlide();
  };

  const handlePrevSlide = () => {
    setSlideDirection(-1);
    prevSlide();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <h5 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-800 tracking-wide uppercase font-[Playfair Display] mb-3">
          Shop By
        </h5>

        <h3 className="text-6xl md:text-5xl font-bold text-center text-amber-800 dark:text-amber-300 font-mono relative inline-block w-full">
          <span className="relative">
            Jewelry Type
            <motion.span
              className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: "60%", x: "-50%" }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </span>
        </h3>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-amber-100/30 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm backdrop-filter"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          boxShadow:
            "0 20px 60px -15px rgba(0, 0, 0, 0.1), 0 15px 30px -5px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-amber-300/20 dark:bg-amber-700/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-amber-500/20 dark:bg-amber-500/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Navigation Arrows */}
        {shuffledCategories.length > itemsPerPage && (
          <>
            <motion.button
              onClick={handlePrevSlide}
              className="absolute z-20 left-6 top-1/2 -translate-y-1/2 bg-amber-600/70 dark:bg-amber-700/70 text-white p-4 rounded-full shadow-2xl backdrop-blur-sm"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              style={{
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              <FaAngleLeft className="w-6 h-6" />
              <motion.span
                className="absolute inset-0 rounded-full bg-amber-400/30"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
            <motion.button
              onClick={handleNextSlide}
              className="absolute z-20 right-6 top-1/2 -translate-y-1/2 bg-amber-600/70 dark:bg-amber-700/70 text-white p-4 rounded-full shadow-2xl backdrop-blur-sm"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              style={{
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              <FaAngleRight className="w-6 h-6" />
              <motion.span
                className="absolute inset-0 rounded-full bg-amber-400/30"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </>
        )}

        {/* Carousel Items */}

        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentIndex}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full py-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-8">
              {getVisibleCategories().map((category, idx) => (
                <Link
                  key={category._id}
                  to={`/products?jewelleryType=${category._id}`}
                >
                  <motion.div
                    key={category._id}
                    className="relative group h-72 rounded-3xl overflow-hidden shadow-lg border border-amber-100/30 dark:border-gray-700/50 transform perspective-1000"
                    variants={cardVariants}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    whileHover="hover"
                    onHoverStart={() => setHoverIndex(idx)}
                    onHoverEnd={() => setHoverIndex(null)}
                  >
                    {/* Parallax Image Effect */}
                    <motion.div
                      className="absolute inset-0 w-full h-full"
                      animate={{
                        x: hoverIndex === idx ? -5 : 0,
                        y: hoverIndex === idx ? -5 : 0,
                        scale: hoverIndex === idx ? 1.1 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      {/* Image with Gradient Overlay */}

                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-transparent to-transparent z-10" />
                      {category.images[0]?.url && (
                        <motion.img
                          src={category.images[0].url}
                          alt={category.name}
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </motion.div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-amber-400/20 opacity-0 z-10 rounded-3xl"
                      animate={{
                        opacity: hoverIndex === idx ? 0.3 : 0,
                        boxShadow:
                          hoverIndex === idx
                            ? "inset 0 0 30px rgba(251, 191, 36, 0.6)"
                            : "inset 0 0 0px rgba(251, 191, 36, 0)",
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Title Card */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 text-center z-20 bg-gradient-to-t from-amber-800 to-amber-700"
                      animate={{
                        y: hoverIndex === idx ? 0 : 10,
                        opacity: hoverIndex === idx ? 1 : 0.9,
                        height: hoverIndex === idx ? "40%" : "25%",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    >
                      <h3 className="text-xl font-serif font-semibold text-white drop-shadow-md capitalize">
                        {category.name}
                      </h3>

                      <motion.div
                        animate={{
                          opacity: hoverIndex === idx ? 1 : 0,
                          y: hoverIndex === idx ? 0 : 10,
                        }}
                        transition={{ delay: 0.1 }}
                      >
                        <p className="text-amber-100 mt-2 text-sm">
                          Explore our collection
                        </p>
                        <motion.div
                          className="w-8 h-0.5 bg-amber-300 mx-auto mt-2"
                          animate={{
                            width: hoverIndex === idx ? 32 : 0,
                          }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {shuffledCategories.length > itemsPerPage && (
          <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2 z-20">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-3 rounded-full cursor-pointer bg-gradient-to-r
                  ${
                    currentIndex === index
                      ? "from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500"
                      : "from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"
                  }`}
                animate={{
                  scale: currentIndex === index ? 1 : 0.8,
                  width: currentIndex === index ? "2rem" : "0.75rem",
                }}
                whileHover={{
                  scale: 1.2,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}

        <motion.div
          className="pb-16 pt-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
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
              Discover Exquisite Collections
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
    </div>
  );
};

export default JewelleryType;
