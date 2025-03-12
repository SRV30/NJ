import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  getSingleProduct,
  getProductReviews,
  postProductReview,
  getSimilarProducts,
} from "@/store/product-slice/product";
import { showJewelryToast } from "../extras/showJewelryToast";
import MetaData from "../extras/MetaData";
import { Rating } from "@mui/material";
import ShareButton from "../extras/ShareButton";

const SingleProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const {
    currentProduct: product = [],
    loading,
    error,
    productReviews: reviews = [],
    similarProducts,
    reviewPosting,
  } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(getSingleProduct(productId));
      dispatch(getProductReviews(productId));
    }
    window.scrollTo(0, 0);
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(0);
    }
  }, [product]);

  const getRandomReviews = useCallback(
    (count) => {
      if (!reviews || reviews.length === 0) return [];
      const shuffledReviews = [...reviews].sort(() => 0.5 - Math.random());
      return shuffledReviews.slice(0, count);
    },
    [reviews]
  );

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      setVisibleReviews(getRandomReviews(4));
    }
  }, [reviews, getRandomReviews]);

  useEffect(() => {
    if (product?.jewelleryType || product?.productCategory) {
      dispatch(
        getSimilarProducts(product.jewelleryType, product.productCategory)
      );
    }
  }, [dispatch, product?.jewelleryType, product?.productCategory]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product?.stock > 0) {
      showJewelryToast(`Added ${quantity} item(s) to your cart!`);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return Math.round(price - (price * discount) / 100).toLocaleString();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 font-sans flex items-center justify-center">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-lg">
          <h2 className="text-2xl font-serif text-amber-950 dark:text-violet-200 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The product you&apos;re looking for could not be found. Please try
            again later.
          </p>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = () => {
    if (!user) {
      return showJewelryToast("Please login to post a review", "error");
    }
    if (!rating) {
      return showJewelryToast("Please select a rating", "error");
    }
    if (!reviewText) {
      return showJewelryToast("Please enter a review", "error");
    }
    dispatch(
      postProductReview({
        productId,
        reviewData: { rating, comment: reviewText, name: user.name },
      })
    );
    showJewelryToast("Review posted successfully", "success");
    window.location.reload();
    setReviewText("");
    setRating(0);
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const handleShowNext = () => {
    setVisibleReviews((prevReviews) => {
      const nextReviews = getRandomReviews(3);
      return [...prevReviews, ...nextReviews];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 font-sans overflow-hidden relative">
      <MetaData title={product?.name || "Product Details"} />

      <div className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-5 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/30 via-transparent to-transparent dark:from-violet-800/10 -z-10" />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-8 relative z-30"
      >
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ letterSpacing: "1px", scale: 1 }}
            animate={{ letterSpacing: "3px", scale: 1.02 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-4xl md:text-5xl font-serif text-center font-light text-amber-950 dark:text-violet-200"
          >
            <span className="font-extralight tracking-widest">
              Nandani Jewellers
            </span>
            <span className="text-lg text-amber-500 ml-2">LUXURY JEWELRY</span>
          </motion.h1>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 md:px-8 pt-4 pb-16 relative z-20">
        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loading"
              className="fixed inset-0 bg-amber-950/60 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="relative">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                    borderRadius: ["50% 50%", "40% 60%", "50% 50%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-20 h-20 border-4 border-transparent border-t-amber-400 border-r-amber-500 border-b-amber-500 rounded-full shadow-2xl"
                />
                <motion.div
                  animate={{
                    rotate: -180,
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-20 h-20 border-4 border-transparent border-l-amber-300 border-t-amber-300 rounded-full"
                  style={{ marginTop: "-2px", marginLeft: "-2px" }}
                />
              </motion.div>
            </motion.div>
          ) : product ? (
            <motion.div
              key="product"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left side - Product Images */}
                <div className="p-6 lg:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-square overflow-hidden rounded-xl mb-4"
                  >
                    {product.images?.length > 0 && (
                      <motion.img
                        key={selectedImage}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        src={product.images[selectedImage]?.url}
                        alt={product.name}
                        className="w-full h-full object-fit object-center"
                      />
                    )}
                    <div className="absolute top-3 left-3 right-3 flex justify-between z-20">
                      {new Date(product.createdAt) >=
                        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gradient-to-r from-violet-500 to-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full tracking-wider flex items-center gap-1 backdrop-blur-md"
                        >
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          NEW
                        </motion.span>
                      )}
                      {product.bestseller === "Yes" && (
                        <motion.span
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs font-medium px-3 py-1 rounded-full tracking-wider flex items-center gap-1 backdrop-blur-md"
                        >
                          BESTSELLER
                        </motion.span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-5 gap-2"
                  >
                    {product.images?.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                          selectedImage === index
                            ? "border-amber-500 shadow-lg shadow-amber-500/20"
                            : "border-transparent"
                        }`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img
                          src={image.url}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-fit object-center"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Right side - Product Details */}
                <div className="p-6 lg:p-8 flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="font-serif text-2xl md:text-3xl text-amber-950 dark:text-amber-100 mb-2">
                      {product.name}
                    </h1>

                    <h1 className="font-mono text-sm md:text-sm text-amber-950 dark:text-amber-100 mb-2">
                      NJ{product._id}
                    </h1>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.ratings || 0)
                                ? "text-amber-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({product.numOfReviews || 0} reviews)
                      </span>
                    </div>

                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-3xl font-medium text-amber-700 dark:text-amber-300">
                        ₹
                        {calculateDiscountedPrice(
                          product.price,
                          product.discount || 0
                        )}
                      </span>
                      {product.discount > 0 && (
                        <>
                          <span className="text-lg text-gray-500 dark:text-gray-400 line-through font-light">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {product.discount}% OFF
                          </span>

                          <ShareButton />
                        </>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 bg-amber-50/80 dark:bg-amber-900/30 p-4 rounded-lg"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Metal
                        </p>
                        <p className="font-medium text-amber-950 dark:text-amber-100">
                          {product.metal || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Color
                        </p>
                        <p className="font-medium text-amber-950 dark:text-amber-100">
                          {product.metalColour || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Jewelry Type
                        </p>
                        <p className="font-medium text-amber-950 dark:text-amber-100">
                          {Array.isArray(product.jewelleryType) &&
                          product.jewelleryType.length > 0
                            ? product.jewelleryType.map((type, index) => (
                                <span key={type._id || index}>
                                  {type.name}
                                  {index < product.jewelleryType.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Product Category
                        </p>
                        <p className="font-medium text-amber-950 dark:text-amber-100">
                          {Array.isArray(product.productCategory) &&
                          product.productCategory.length > 0
                            ? product.productCategory.map((cat, index) => (
                                <span key={cat._id || index}>
                                  {cat.name}
                                  {index < product.productCategory.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Stock
                        </p>
                        <p
                          className={`font-medium ${
                            product.stock > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-500"
                          }`}
                        >
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Weight
                        </p>
                        <p className="font-medium text-amber-950 dark:text-amber-100">
                          {product.weight || "N/A"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-medium text-amber-950 dark:text-amber-200 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {product.description ||
                        "No description available for this product."}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-lg font-medium text-amber-950 dark:text-amber-200 mb-2">
                      Quantity
                    </h3>
                    <div className="flex items-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(-1)}
                        className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 flex items-center justify-center"
                        disabled={quantity <= 1}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 12H4"
                          />
                        </svg>
                      </motion.button>

                      <span className="w-16 text-center font-medium text-amber-950 dark:text-amber-100">
                        {quantity}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(1)}
                        className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 flex items-center justify-center"
                        disabled={quantity >= 10 || product.stock <= quantity}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 py-4 rounded-full bg-white dark:bg-slate-800 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all duration-300 font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Add to Wishlist
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={product.stock <= 0}
                      className={`flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-amber-100 to-amber-300 text-amber-800 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 font-medium ${
                        product.stock <= 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                    </motion.button>
                  </motion.div>
                </div>
              </div>

              {/* Product Reviews Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="border-t border-amber-100 dark:border-amber-900/50 p-8 lg:p-10 relative overflow-hidden"
              >
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-100/30 dark:bg-amber-900/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 bottom-10 w-72 h-72 bg-orange-100/20 dark:bg-orange-900/10 rounded-full blur-3xl"></div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif text-amber-950 dark:text-amber-100 relative">
                      Customer Reviews
                      <span className="block h-1 w-12 bg-gradient-to-r from-amber-300 to-amber-400 mt-2 rounded-full"></span>
                    </h2>

                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowReviewForm(true)}
                      className="py-3 px-8 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 hover:shadow-lg hover:shadow-amber-300/20 dark:hover:shadow-amber-600/30 transition-all duration-300 font-medium flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        ></path>
                      </svg>
                      Write a Review
                    </motion.button>
                  </div>

                  {visibleReviews && visibleReviews.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                      {visibleReviews.map((review, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.15 * (index % 4),
                          }}
                          className="bg-gradient-to-br from-amber-50/90 to-orange-50/90 dark:from-amber-900/30 dark:to-amber-800/20 backdrop-blur-sm rounded-xl p-5 border border-amber-100/50 dark:border-amber-700/30 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center text-amber-800 font-medium shadow-inner shadow-amber-600/20">
                              {review.name
                                ? review.name.charAt(0).toUpperCase()
                                : "A"}
                            </div>

                            <div className="flex-1">
                              <div className="flex flex-wrap items-center justify-between mb-1">
                                <h4 className="font-medium text-amber-950 dark:text-amber-100 text-lg">
                                  {review.name || "Anonymous"}
                                </h4>

                                <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                                  {review.createdAt
                                    ? new Date(
                                        review.createdAt
                                      ).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })
                                    : "N/A"}
                                </span>
                              </div>

                              <div className="mb-3">
                                <Rating
                                  value={review?.rating || 0}
                                  readOnly
                                  size="small"
                                  sx={{
                                    color: "#FFB800",
                                    "& .MuiRating-iconEmpty": {
                                      color: "rgba(255, 184, 0, 0.2)",
                                    },
                                  }}
                                />
                              </div>

                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {review.comment || "No comment provided."}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-center py-12 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl border border-amber-100/50 dark:border-amber-800/20"
                    >
                      <div className="mb-4">
                        <svg
                          className="w-16 h-16 mx-auto text-amber-200 dark:text-amber-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        No reviews yet. Be the first to share your experience!
                      </p>
                    </motion.div>
                  )}
                  {visibleReviews.length < reviews.length && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShowNext}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-full shadow-md transition-all duration-300 flex items-center justify-center mx-auto"
                    >
                      Show Next Reviews
                    </motion.button>
                  )}
                </div>

                {/* Review Form Popup */}
                <AnimatePresence>
                  {showReviewForm && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                      onClick={(e) => {
                        if (e.target === e.currentTarget)
                          setShowReviewForm(false);
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        className="bg-white dark:bg-slate-600 rounded-2xl p-7 max-w-lg w-full shadow-2xl m-4 border border-amber-100/20 dark:border-amber-800/20"
                      >
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-2xl font-serif text-amber-950 dark:text-amber-100">
                            Write a Review
                          </h3>
                          <motion.button
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setShowReviewForm(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </motion.button>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-center space-x-4 mb-6">
                            <span className="text-gray-700 dark:text-gray-200 font-medium">
                              Your Rating:
                            </span>
                            <Rating
                              value={rating}
                              onChange={(e, newValue) => setRating(newValue)}
                              size="large"
                              classname="text-amber-500 dark:text-amber-300"
                            />
                          </div>

                          <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Share your experience with this product..."
                            className="w-full p-4 border border-amber-200 dark:border-amber-700/50 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-amber-50/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-100 shadow-sm resize-none"
                            rows="4"
                            autoFocus
                          />

                          <div className="flex gap-4 justify-end mt-6">
                            <motion.button
                              variants={buttonVariants}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setShowReviewForm(false)}
                              className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              Cancel
                            </motion.button>
                            <motion.button
                              variants={buttonVariants}
                              whileHover={{ scale: 1.02, y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                handleReviewSubmit();
                                if (!user || (rating && reviewText)) {
                                  setShowReviewForm(false);
                                }
                              }}
                              disabled={reviewPosting}
                              className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-amber-300/20 dark:hover:shadow-amber-600/30 transition-all duration-300"
                            >
                              {reviewPosting ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Submitting...
                                </>
                              ) : (
                                <>Submit Review</>
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="border-t border-amber-100 dark:border-amber-900/50 p-6 lg:p-8"
              >
                <h2 className="text-2xl font-serif text-amber-950 dark:text-amber-100 mb-6">
                  You May Also Like
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {similarProducts && similarProducts.length > 0 ? (
                    similarProducts.map((prod, index) => (
                      <motion.div
                        key={prod._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        whileHover={{ y: -5 }}
                        className="bg-white/80 dark:bg-slate-800/80 rounded-xl overflow-hidden shadow-md"
                      >
                        <Link to={`/products/${prod._id}`} className="block">
                          <div className="aspect-square">
                            <img
                              src={prod.images[0]?.url}
                              alt={prod.name}
                              className="w-full h-full object-fit"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-semibold text-amber-950 dark:text-amber-100 truncate">
                              {prod.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              ₹
                              {Math.round(
                                prod.price - (prod.price * prod.discount) / 100
                              )}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-4 text-center text-gray-500">
                      No similar products found.
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SingleProductPage;
