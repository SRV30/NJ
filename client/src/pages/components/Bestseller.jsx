import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { motion, useInView, useAnimation } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "@/store/product-slice/product";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectCoverflow,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { ArrowRight } from "lucide-react";

const ShimmerEffect = () => (
  <div className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-shimmer z-10"></div>
);

const BestSeller = ({ product, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  const staggerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      },
    },
  };
  return (
    <motion.div
      ref={cardRef}
      variants={staggerVariants}
      initial="hidden"
      animate={controls}
      className="relative rounded-xl overflow-hidden backdrop-blur-sm shadow-xl transition-all duration-700 group hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-200/30 will-change-transform"
      style={{
        backdropFilter: "blur(8px)",
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <ShimmerEffect />
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative h-[420px] overflow-hidden">
          <img
            src={product?.images?.[0]?.url || "/api/placeholder/400/320"}
            alt={product?.name || "Luxury Jewelry Item"}
            className="w-full h-full object-fit transition-all duration-1000 ease-in-out group-hover:scale-110 group-hover:saturate-125"
            style={{ filter: "contrast(1.05) brightness(1.02)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500 ease-out"></div>
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
          {product?.discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                delay: 0.2 + index * 0.1,
              }}
              className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
            >
              <span className="inline-block animate-pulse">
                {product.discount}% OFF
              </span>
            </motion.div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:translate-y-0 text-white transition-all duration-500 ease-out">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-300 transition-colors duration-300 group-hover:-translate-y-1 transform">
            {product?.name}
          </h3>
          <div className="flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <p className="text-lg font-medium group-hover:translate-y-0 transform transition-all duration-300">
                <span className="text-amber-400 group-hover:text-amber-300">
                  ₹
                </span>
                <span className="ml-1 relative">
                  <span className="group-hover:blur-sm transition-all duration-300 absolute">
                    {Math.round(
                      product.price - (product.price * product.discount) / 100
                    ).toLocaleString()}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    {Math.round(
                      product.price - (product.price * product.discount) / 100
                    ).toLocaleString()}
                  </span>
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-gray-400 line-through ml-2 opacity-70 group-hover:opacity-100">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
              </p>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block opacity-0 transform translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-amber-300 text-sm font-medium">
                View Details
                <span className="ml-1 inline-block group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </div>
          </div>
          <div className="mt-3 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-700 ease-out"></div>
        </div>
      </Link>
    </motion.div>
  );
};

BestSeller.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    bestseller: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    name: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-xl overflow-hidden shadow-lg relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-200 -translate-x-full animate-shimmer"></div>
          <div className="h-[420px] bg-amber-50"></div>
          <div className="p-5">
            <div className="h-6 bg-amber-100 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-amber-100 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="w-full h-40 bg-gradient-to-b from-amber-300/10 to-transparent rounded-full blur-3xl transform -translate-y-1/2"></div>
      </div>
      <div
        className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-amber-400/5 blur-3xl animate-float"
        style={{ animationDelay: "0s", animationDuration: "15s" }}
      ></div>
      <div
        className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl animate-float"
        style={{ animationDelay: "5s", animationDuration: "20s" }}
      ></div>
      <div
        className="absolute top-2/3 right-1/4 w-40 h-40 rounded-full bg-amber-600/5 blur-3xl animate-float"
        style={{ animationDelay: "10s", animationDuration: "18s" }}
      ></div>
    </div>
  );
};

const SectionTitle = ({ subtitle, title }) => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={titleRef}
      initial={{ opacity: 0, y: -30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-16 relative"
    >
      <h5 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-800 mb-2 uppercase font-[Playfair Display] tracking-wider">
        {subtitle}
      </h5>
      <h3 className="text-6xl font-bold text-amber-800 dark:text-amber-300  font-mono">
        {title}
        <motion.span
          className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
          initial={{ width: 0, x: "-50%" }}
          animate={{ width: "60%", x: "-50%" }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        />
      </h3>
    </motion.div>
  );
};

SectionTitle.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

const CustomButton = ({ children, to, className }) => {
  return (
    <Link
      to={to}
      className={`group relative px-8 py-3 bg-amber-600 text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 group-hover:from-amber-700 group-hover:to-amber-800 transition-all duration-500"></span>
      <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)] group-hover:scale-150 transition-all duration-700 ease-out"></span>
    </Link>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const SlideNavButton = ({ direction, swiperRef }) => {
  const isNext = direction === "next";
  return (
    <button
      onClick={() =>
        isNext ? swiperRef.current.slideNext() : swiperRef.current.slidePrev()
      }
      className={`absolute z-10 top-1/2 -translate-y-1/2 ${
        isNext ? "right-0" : "left-0"
      } w-10 h-10 flex items-center justify-center rounded-full text-amber-800 bg-white bg-opacity-80 backdrop-blur-sm shadow-md transform transition-all duration-300 hover:scale-110 hover:bg-amber-50 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 opacity-0 group-hover:opacity-100 ${
        isNext ? "-mr-5" : "-ml-5"
      }`}
    >
      <span className="sr-only">{isNext ? "Next" : "Previous"}</span>
      {isNext ? (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      )}
    </button>
  );
};

SlideNavButton.propTypes = {
  direction: PropTypes.oneOf(["next", "prev"]).isRequired,
  swiperRef: PropTypes.object.isRequired,
};

const BestsellerPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const swiperRef = useRef(null);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    if (products && products.length > 0) {
      const bestsellers = products.filter(
        (product) =>
          product.bestseller === "Yes" ||
          product.bestseller === true ||
          (typeof product.bestseller === "string" &&
            product.bestseller.toLowerCase() === "yes")
      );
      setBestsellerProducts(bestsellers);
    }
  }, [products]);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--swiper-pagination-color", "#d97706");
    root.style.setProperty("--swiper-pagination-bullet-size", "10px");
    root.style.setProperty(
      "--swiper-pagination-bullet-inactive-color",
      "#fcd34d"
    );
    root.style.setProperty(
      "--swiper-pagination-bullet-inactive-opacity",
      "0.5"
    );
    return () => {
      root.style.removeProperty("--swiper-pagination-color");
      root.style.removeProperty("--swiper-pagination-bullet-size");
      root.style.removeProperty("--swiper-pagination-bullet-inactive-color");
      root.style.removeProperty("--swiper-pagination-bullet-inactive-opacity");
    };
  }, []);
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-16 rounded-2xl shadow-inner relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
      <motion.img
        initial={{ y: 10 }}
        animate={{ y: -10 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        }}
        src="/api/placeholder/120/120"
        alt="No products found"
        className="w-24 h-24 mx-auto mb-4 opacity-40"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="text-amber-800 text-xl font-medium">
          No bestseller products found at the moment.
        </p>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Please check back soon as we update our collection with exquisite new
          pieces.
        </p>
      </motion.div>
    </motion.div>
  );
  return (
    <div className="min-h-screen pb-16 relative overflow-hidden">
      <BackgroundDecoration />
      <div className="max-w-7xl mx-auto px-6 py-20 relative">
        <SectionTitle
          subtitle="Curated Excellence"
          title="Best Sellers"
          description="Discover our most cherished pieces that have captivated hearts across the nation. Each bestseller represents the pinnacle of craftsmanship and timeless elegance."
        />
        {loading ? (
          <LoadingSkeleton />
        ) : bestsellerProducts.length > 0 ? (
          <div className="relative group">
            <SlideNavButton direction="prev" swiperRef={swiperRef} />
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              effect="coverflow"
              coverflowEffect={{
                rotate: 2,
                stretch: 0,
                depth: 150,
                modifier: 1.5,
                slideShadows: false,
              }}
              slidesPerView={1}
              spaceBetween={40}
              speed={700}
              breakpoints={{
                640: { slidesPerView: 1.5, centeredSlides: true },
                768: { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 3 },
              }}
              loop={true}
              className="pb-16 [--swiper-pagination-bullet-inactive-opacity:0.5] [--swiper-pagination-bullet-size:10px]"
            >
              {bestsellerProducts.map((product, index) => (
                <SwiperSlide key={product._id || index} className="py-6">
                  <BestSeller product={product} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
            <SlideNavButton direction="next" swiperRef={swiperRef} />
          </div>
        ) : (
          <EmptyState />
        )}
        {bestsellerProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mt-10"
          >
            <motion.button
              onClick={() =>
                (window.location.href = "/products?type=bestseller")
              }
              className="relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-4 rounded-2xl font-serif font-semibold text-xl tracking-wide shadow-xl overflow-hidden group"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(217, 119, 6, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                Explore All Collections
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
        )}
      </div>
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-amber-100/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default BestsellerPage;
