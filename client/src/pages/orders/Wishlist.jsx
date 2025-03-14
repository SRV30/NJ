import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { X, ShoppingBag, Heart, ChevronRight } from "lucide-react";
import {
  getWishListItems,
  deleteWishListItem,
} from "@/store/order-slice/addToWishList";
import { addToCart } from "@/store/order-slice/addToCart";
import Loader from "../extras/Loader";
import MetaData from "../extras/MetaData";
import { showJewelryToast } from "../extras/showJewelryToast";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { WishListItems, loading } = useSelector(
    (state) => state.wishList
  );

  useEffect(() => {
    dispatch(getWishListItems());
  }, [dispatch]);

  const handleRemoveFromWishlist = (id) => {
    dispatch(deleteWishListItem(id));
    showJewelryToast("Item removed from wishlist", "info");
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    showJewelryToast("Item added to cart", "success");
  };

  const emptyAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const pageTransition = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.4,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950">
        <Loader />
      </div>
    );
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      className="min-h-screen pt-20 pb-12 px-4 md:px-8 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950"
    >
      <MetaData title="My Wishlist | Nandani Jewellers" />

      <nav className="flex mb-6 text-sm font-medium text-amber-700 dark:text-amber-400">
        <motion.a
          href="/"
          className="hover:text-amber-900 dark:hover:text-amber-200 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Home
        </motion.a>
        <ChevronRight className="mx-2 h-4 w-4 text-amber-600 dark:text-amber-500" />
        <span className="text-amber-900 dark:text-amber-300">My Wishlist</span>
      </nav>

      <motion.div variants={headerVariants} className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-amber-800 dark:text-amber-300 relative inline-block">
          My Wishlist
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-600 dark:to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
        </h1>
        <p className="text-amber-700 dark:text-amber-400 max-w-xl mx-auto mt-2 italic">
          Your collection of treasured pieces waiting to become yours
        </p>
      </motion.div>

     
      {!loading && (!WishListItems || WishListItems.length === 0) && (
        <motion.div
          className="flex flex-col items-center justify-center py-16"
          variants={emptyAnimation}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-800/40 dark:to-amber-700/30 flex items-center justify-center shadow-lg"
          >
            <Heart size={40} className="text-amber-700 dark:text-amber-400" />
          </motion.div>
          <h2 className="text-2xl font-semibold mb-2 text-amber-800 dark:text-amber-300">
            Your wishlist is empty
          </h2>
          <p className="text-amber-700 dark:text-amber-400 mb-6 text-center max-w-md">
            Add your favorite jewelry pieces to your wishlist to keep track of
            items you love.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-md shadow-md transition-colors duration-300 font-medium"
            onClick={() => (window.location.href = "/products")}
          >
            Browse Collection
          </motion.button>
        </motion.div>
      )}

      {!loading && WishListItems && WishListItems.length > 0 && (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {WishListItems.map((item) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white/90 dark:bg-amber-900/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-amber-100 dark:border-amber-800/30"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={
                    item.productId.images[0].url || "/placeholder-jewelry.jpg"
                  }
                  alt={item.productId.name}
                  className="w-full h-64 object-fit object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="absolute top-3 right-3 bg-white/70 dark:bg-amber-900/70 hover:bg-white dark:hover:bg-amber-900 p-2 rounded-full shadow-md transition-all duration-300 transform hover:rotate-90"
                  aria-label="Remove from wishlist"
                >
                  <X size={18} className="text-amber-800 dark:text-amber-300" />
                </button>
                <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium truncate">
                    {item.productId.metal}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-amber-800 dark:text-amber-300 line-clamp-1 capitalize">
                  {item.productId.name}
                </h3>
                <p className="text-amber-600 dark:text-amber-400 mb-3 line-clamp-2 text-sm">
                  {item.productId.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(item)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-md shadow-sm flex items-center justify-center gap-2 transition-all duration-300 w-full font-medium"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Wishlist;
