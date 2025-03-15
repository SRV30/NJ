import { showJewelryToast } from "../extras/showJewelryToast";
import { deleteCartItem, getCartItems } from "@/store/order-slice/addToCart";
import { createOrder } from "@/store/order-slice/order";
import { userAddress } from "@/store/address-slice/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../extras/MetaData";

const Checkout = () => {
  const { user } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.address);
  const { cartItems = [] } = useSelector((state) => state.cart);
  const { loading: orderLoading, success } = useSelector(
    (state) => state.order
  );

  const [selectedAddress, setSelectedAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userAddress());
    dispatch(getCartItems());
  }, [dispatch]);

  const handleOrder = () => {
    if (!selectedAddress) {
      showJewelryToast("Please select an address to continue", "error");
      return;
    }
    const orderData = {
      userId: user?._id,
      addressId: selectedAddress,
      products: cartItems.map((item) => ({
        product: item.productId._id,
        quantity: item.quantity,
      })),
    };
    dispatch(createOrder(orderData));
  };

  useEffect(() => {
    if (success) {
      showJewelryToast("Order placed successfully", "success");
      cartItems.forEach((item) => {
        dispatch(deleteCartItem(item._id));
      });

      dispatch(getCartItems());
      navigate("/order-success");
    }
  }, [success, navigate, dispatch, cartItems]);

  useEffect(() => {
    if (address.length > 0 && !selectedAddress) {
      setSelectedAddress(address[0]._id);
    }
  }, [address, selectedAddress, setSelectedAddress]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 py-8 px-4 sm:px-6">
      <MetaData title="Checkout | Nandani Jewellers" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-slate-900 shadow-xl rounded-2xl overflow-hidden"
      >
        <div className="border-b border-amber-200 dark:border-amber-800">
          <div className="px-6 py-4 bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-800">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300">
              Complete Your Purchase
            </h2>
          </div>
        </div>

        <div className="p-6">
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center mb-4">
              <div className="bg-amber-600 dark:bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                1
              </div>
              <h3 className="font-semibold text-lg text-amber-800 dark:text-amber-300">
                Select Delivery Address
              </h3>
            </div>

            <div className="pl-11">
              {address.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <AnimatePresence>
                    {address.map((addr) => (
                      <motion.div
                        key={addr._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`border rounded-xl cursor-pointer p-4 transition-all ${
                          selectedAddress === addr._id
                            ? "border-amber-600 bg-amber-50 dark:bg-amber-900/30 shadow-md"
                            : "border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700"
                        }`}
                        onClick={() => setSelectedAddress(addr._id)}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-amber-800 dark:text-amber-300">
                              {addr.address_line}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                              {addr.city}, {addr.state}, {addr.pincode}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {addr.country}
                            </p>
                            <p className="text-amber-700 dark:text-amber-400 font-medium mt-2">
                              {addr.mobile}
                            </p>
                          </div>
                          {selectedAddress === addr._id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-amber-600 dark:bg-amber-500 rounded-full w-6 h-6 flex items-center justify-center text-white"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800"
                >
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    No saved addresses found. Please add an address to continue.
                  </p>
                  <Link to="/saved-address">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add New Address
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center mb-4">
              <div className="bg-amber-600 dark:bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                2
              </div>
              <h3 className="font-semibold text-lg text-amber-800 dark:text-amber-300">
                Order Summary
              </h3>
            </div>

            <div className="pl-11">
              {cartItems.length > 0 ? (
                <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl overflow-hidden border border-amber-200 dark:border-amber-800">
                  <div className="divide-y divide-amber-200 dark:divide-amber-800">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center p-4 gap-4"
                      >
                        <motion.div
                          className="relative w-20 h-20 rounded-lg overflow-hidden bg-white shadow-md"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={
                              item.productId.images[0]?.url ||
                              "/placeholder.jpg"
                            }
                            alt={item.productId.name}
                            className="w-full h-full object-fit"
                          />
                        </motion.div>
                        <div className="flex flex-col">
                          <div className="flex-1">
                            <h4 className="font-medium text-amber-800 dark:text-amber-300 capitalize">
                              {item.productId.name}
                            </h4>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-amber-800 dark:text-amber-300 capitalize">
                              {item.productId.product_id}
                            </h4>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="bg-amber-100 dark:bg-amber-900/40 p-4 border-t border-amber-200 dark:border-amber-800">
                    <div className="flex justify-between font-semibold text-amber-800 dark:text-amber-300">
                      <span>Total Items:</span>
                      <span>{cartItems.length}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800 text-center"
                >
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Your cart is empty.
                  </p>
                  <Link to="/products">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      Browse Collection
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.6 }}
            className="pt-4"
          >
            <motion.button
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
              onClick={handleOrder}
              disabled={
                orderLoading || cartItems.length === 0 || !selectedAddress
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0.9 }}
              animate={{
                opacity:
                  orderLoading || cartItems.length === 0 || !selectedAddress
                    ? 0.7
                    : 1,
                y: [0, -5, 0],
                transition: {
                  y: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                    ease: "easeInOut",
                    repeatDelay: 0.5,
                  },
                },
              }}
            >
              {orderLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  Processing Your Order...
                </>
              ) : (
                <>
                  Complete Purchase
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4"
            >
              By completing this purchase, you agree to our Terms of Service and
              Privacy Policy
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;
