import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, deleteCartItem } from "@/store/order-slice/addToCart";
import { showJewelryToast } from "../extras/showJewelryToast";
import Loader from "../extras/Loader";
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft } from "lucide-react";
import MetaData from "../extras/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleDeleteItem = async (item) => {
    try {
      await dispatch(deleteCartItem(item._id)).unwrap();
      showJewelryToast("Item removed from shopping cart", "success");
    } catch (err) {
      showJewelryToast(err, "error");
    }
  };

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-200 min-h-screen py-12 px-4">
      <MetaData title="Cart| Nandani Jewellers" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Shopping Cart
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Review your selected fine jewelry pieces
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/90 dark:bg-slate-900/90 rounded-xl shadow-lg"
          >
            <ShoppingBag className="mx-auto h-16 w-16 mb-4 text-slate-400 dark:text-slate-500" />
            <h2 className="text-2xl font-serif mb-2">Your Cart is Empty</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Explore our curated collection and select your preferred pieces
            </p>
            <a
              href="/products"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-700 dark:hover:bg-amber-600 py-3 px-8 rounded-md font-medium transition-all"
            >
              Browse Collection
            </a>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white/90 dark:bg-slate-900/90 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <h2 className="font-serif text-xl">
                  Items ({cartItems.length})
                </h2>
                <a
                  href="/products"
                  className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 flex items-center text-sm"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Continue Shopping
                </a>
              </div>

              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 mb-4 border-b border-slate-200 dark:border-slate-800 last:border-b-0 last:mb-0"
                  >
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="relative h-24 w-24 md:h-24 md:w-24 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                        <img
                          src={
                            item.productId.images[0]?.url || "/placeholder.jpg"
                          }
                          alt={item.productId.name || "Jewelry Item"}
                          className="h-full w-full object-fit"
                        />
                      </div>

                      <div className="ml-4 md:ml-6">
                        <h3 className="text-md font-mono font-medium text-slate-900 dark:text-slate-200 mb-1">
                          NJ{item.productId._id}
                        </h3>
                        <h3 className="text-lg font-serif font-medium text-slate-900 dark:text-slate-200 mb-1 capitalize">
                          {item.productId.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                          {item.productId.metal} • {item.productId.metalColour}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                      <div className="md:ml-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-500 transition-colors"
                          onClick={() => handleDeleteItem(item)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 dark:bg-slate-900/90 rounded-xl p-6 shadow-lg"
              >
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Book online and receive a special discount. Please visit our
                    showrooms within 7 days of booking for final fitting and
                    collection of your selected pieces.
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-700 dark:hover:bg-amber-600 py-4 px-6 rounded-md font-medium transition-all text-lg flex items-center justify-center cursor-pointer"
                    onClick={handleCheckout}
                  >
                    Proceed to Book
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
