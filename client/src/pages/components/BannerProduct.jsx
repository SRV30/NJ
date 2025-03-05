import { useCallback, useEffect, useState } from "react";
import b1 from "../../assets/slider/1.jpg";
import b2 from "../../assets/slider/2.jpg";
import b3 from "../../assets/slider/3.jpg";
import b4 from "../../assets/slider/1.jpg";
import b5 from "../../assets/slider/2.jpg";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [b1, b2, b3, b4, b5];
  const mobileImages = [b1, b2, b3, b4, b5];

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % desktopImages.length);
  }, [desktopImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImage(
      (prev) => (prev - 1 + desktopImages.length) % desktopImages.length
    );
  }, [desktopImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 10000);

    return () => clearInterval(interval);
  }, [nextImage]);

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.15, rotate: 10, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="container mx-auto px-4 mt-5">
      <div className="h-100 md:h-120 lg:h-[36rem] w-full relative rounded-xl overflow-hidden shadow-2xl border border-amber-200/30 dark:border-gray-700/30">
        {/* Navigation Buttons */}
        <div className="absolute z-10 h-full w-full flex items-center justify-between px-4 lg:px-6">
          <motion.button
            onClick={prevImage}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-amber-600 dark:bg-amber-700 text-white p-3 lg:p-4 rounded-full shadow-md hover:bg-amber-700 dark:hover:bg-amber-800 transition-all duration-300"
            aria-label="Previous Image"
          >
            <FaAngleLeft size={20} className="" />
          </motion.button>
          <motion.button
            onClick={nextImage}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-amber-600 dark:bg-amber-700 text-white p-3 lg:p-4 rounded-full shadow-md hover:bg-amber-700 dark:hover:bg-amber-800 transition-all duration-300"
            aria-label="Next Image"
          >
            <FaAngleRight size={20} className="" />
          </motion.button>
        </div>

        {/* Desktop Slider */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={desktopImages[currentImage]}
              className="w-full h-full"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <img
                src={desktopImages[currentImage]}
                className="w-full h-full object-cover rounded-xl"
                alt={`Nandani Jewellers Banner ${
                  currentImage + 1
                } - Luxury Jewelry`}
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Slider */}
        <div className="flex md:hidden h-full w-full overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={mobileImages[currentImage]}
              className="w-full h-full"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <img
                src={mobileImages[currentImage]}
                className="w-full h-full object-cover rounded-xl"
                alt={`Nandani Jewellers Mobile Banner ${
                  currentImage + 1
                } - Luxury Jewelry`}
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {desktopImages.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentImage === index
                  ? "bg-amber-300 dark:bg-amber-400"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
              animate={{
                scale: currentImage === index ? 1.2 : 1,
                transition: { duration: 0.3 },
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
