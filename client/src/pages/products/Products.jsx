import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/store/product-slice/product";
import { fetchJewelleryCategories } from "@/store/product-slice/jewelleryType";
import { fetchCategories } from "@/store/product-slice/category";
// import { showJewelryToast } from "../extras/showJewelryToast";
import MetaData from "../extras/MetaData";
import Typewriter from "typewriter-effect/dist/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../extras/Loader";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, totalPages, currentPage, loading } = useSelector(
    (state) => state.product
  );
  const { categories: jewelleryTypes } = useSelector(
    (state) => state.jewellery
  );
  const { categories } = useSelector((state) => state.category);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type");
  const jewelleryType = params.get("jewelleryType");
  const productCategory = params.get("productCategory");

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    keyword: "",
    priceRange: [0, 100000],
    sort: "newest",
    jewelleryType: "",
    productCategory: "",
    metalColour: "",
    bestseller: "",
    newArrival: "",
    page: 1,
    limit: 20,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getProducts({ ...filters, priceRange: filters.priceRange }));
    }, 300);
    dispatch(fetchJewelleryCategories());
    dispatch(fetchCategories());
    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, filters]);

  useEffect(() => {
    if (type === "bestseller") {
      setFilters((prev) => ({ ...prev, bestseller: "Yes" }));
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, type]);

  useEffect(() => {
    if (jewelleryType) {
      setFilters((prev) => ({ ...prev, jewelleryType }));
    }
  }, [jewelleryType]);

  useEffect(() => {
    if (productCategory) {
      setFilters((prev) => ({ ...prev, productCategory }));
    }
  }, [productCategory]);

  useEffect(() => {
    const input = document.querySelector(".typewriter-input");
    if (input) {
      new Typewriter(input, {
        strings: [
          "Find Your Perfect Jewel...",
          "Search for Gold, Diamond & More...",
          "Discover Timeless Elegance...",
        ],
        autoStart: true,
        loop: true,
        cursor: "|",
        typeSpeed: 60,
        deleteSpeed: 40,
        delay: 200,
      });
    }
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...filters.priceRange];
    const parsedValue = parseInt(value);
    newRange[index] = isNaN(parsedValue)
      ? index === 0
        ? 0
        : 100000
      : Math.max(0, Math.min(parsedValue, 100000));
    if (index === 0 && newRange[0] > newRange[1]) newRange[0] = newRange[1];
    if (index === 1 && newRange[1] < newRange[0]) newRange[1] = newRange[0];
    setFilters((prev) => ({ ...prev, priceRange: newRange, page: 1 }));
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      priceRange: [0, 100000],
      sort: "newest",
      jewelleryType: "",
      productCategory: "",
      metalColour: "",
      bestseller: "",
      newArrival: "",
      page: 1,
      limit: 20,
    });
    navigate("/products");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateY: -5 },
    visible: {
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 font-sans overflow-hidden relative">
      <MetaData
        title="Luxury Jewelry Collection | Gold, Diamond & Silver Jewellery Online"
        description="Explore an exquisite collection of gold, diamond, and silver jewelry. Shop stunning rings, necklaces, bracelets, and more. Find your perfect jewel today!"
        keywords="luxury jewelry, gold jewelry, diamond rings, silver necklaces, fine jewelry, online jewelry shopping, elegant bracelets, best jewellery collection"
      />

      <div className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-5 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/30 via-transparent to-transparent dark:from-amber-800/10 -z-10" />

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
            className="text-4xl md:text-5xl font-serif text-center font-light text-amber-950 dark:text-amber-200"
          >
            <span className="font-extralight tracking-widest">
              Nandani Jewellers
            </span>
            <span className="text-lg text-amber-500 ml-2">LUXURY JEWELRY</span>
          </motion.h1>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 md:px-8 pt-4 pb-16 flex flex-col md:flex-row gap-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`md:w-1/4 lg:w-1/5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:sticky md:top-8 h-fit overflow-hidden transition-all ${
            isFilterOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          } md:translate-x-0 absolute md:relative z-30 md:z-10 inset-0 md:inset-auto`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif text-amber-950 dark:text-amber-200">
              Filter
            </h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="md:hidden text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-amber-500 dark:text-amber-300 font-medium mb-4">
                Price Range
              </h3>
              <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                <input
                  type="number"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                  className="w-24 lg:w-36 px-2 py-1 border border-amber-300 dark:border-amber-700 rounded-md text-sm bg-white dark:bg-slate-900 text-gray-800 dark:text-amber-300 focus:ring-amber-500 focus:outline-none"
                />
                <motion.span
                  className="relative text-gray-600 dark:text-amber-400 font-semibold tracking-wide px-2 text-md flex items-center mx-8 lg:mx-12"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <span className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-amber-400"></span>
                  To
                </motion.span>

                <input
                  type="number"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                  className="w-24 lg:w-36 px-2 py-1 border border-amber-300 dark:border-amber-700 rounded-md text-sm bg-white dark:bg-slate-900 text-gray-800 dark:text-amber-300 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 my-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                <span className="text-amber-600 dark:text-amber-300 text-sm font-semibold tracking-wide relative">
                  OR
                  <motion.div
                    className="absolute left-0 top-1/2 w-full h-0.5 bg-amber-500 opacity-50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              </div>

              <div className="flex justify-between text-sm text-gray-600 dark:text-amber-400 mb-2">
                <span>₹{filters.priceRange[0].toLocaleString()}</span>
                <span>₹{filters.priceRange[1].toLocaleString()}</span>
              </div>

              <div className="relative h-1 bg-amber-100 dark:bg-amber-900/50 rounded-full mt-4">
                <motion.div
                  className="absolute h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                  style={{
                    left: `${(filters.priceRange[0] / 100000) * 100}%`,
                    width: `${
                      ((filters.priceRange[1] - filters.priceRange[0]) /
                        100000) *
                      100
                    }%`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                  className="absolute w-full h-2 opacity-0 cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                  className="absolute w-full h-2 opacity-0 cursor-pointer"
                />
                <motion.div
                  className="absolute w-4 h-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full -top-1.5 shadow-lg shadow-amber-200 dark:shadow-amber-900"
                  style={{
                    left: `calc(${
                      (filters.priceRange[0] / 100000) * 100
                    }% - 8px)`,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="absolute w-4 h-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full -top-1.5 shadow-lg shadow-amber-200 dark:shadow-amber-900"
                  style={{
                    left: `calc(${
                      (filters.priceRange[1] / 100000) * 100
                    }% - 8px)`,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            {[
              {
                label: "Sort By",
                key: "sort",
                options: [
                  { value: "newest", label: "Latest Arrivals" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "rating", label: "Top Rated" },
                ],
              },
              {
                label: "Jewelry Type",
                key: "jewelleryType",
                options: [
                  { value: "", label: "All Types" },
                  ...(jewelleryTypes?.map((type) => ({
                    value: type._id,
                    label: type.name,
                  })) || []),
                ],
              },
              {
                label: "Category",
                key: "productCategory",
                options: [
                  { value: "", label: "All Categories" },
                  ...(categories?.map((cat) => ({
                    value: cat._id,
                    label: cat.name,
                  })) || []),
                ],
              },
              {
                label: "Metal Color",
                key: "metalColour",
                options: [
                  { value: "", label: "All Colors" },
                  { value: "Gold", label: "Yellow Gold" },
                  { value: "Rose Gold", label: "Rose Gold" },
                  { value: "White Gold", label: "White Gold" },
                  { value: "Silver", label: "Silver" },
                ],
              },
              {
                label: "Collection",
                key: "bestseller",
                options: [
                  { value: "", label: "All Collections" },
                  { value: "Yes", label: "Bestseller" },
                ],
              },
            ].map((filterGroup) => (
              <div key={filterGroup.key}>
                <h3 className="text-sm uppercase tracking-wider text-amber-500 dark:text-amber-300 font-medium mb-4">
                  {filterGroup.label}
                </h3>
                <select
                  className="w-full p-3 rounded-lg bg-amber-50/80 dark:bg-black border border-amber-100 dark:border-amber-800/50 text-gray-800 dark:text-amber-300 focus:ring-2 focus:ring-amber-300/50 focus:border-transparent hover:bg-amber-100/80 dark:hover:bg-black transition-all duration-300 text-sm tracking-wide appearance-none"
                  value={filters[filterGroup.key]}
                  onChange={(e) =>
                    handleFilterChange(filterGroup.key, e.target.value)
                  }
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23818cf8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "2.5rem",
                  }}
                >
                  {filterGroup.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearAllFilters}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 font-medium text-sm tracking-wide mt-4"
            >
              Reset Filters
            </motion.button>
          </div>
        </motion.div>

        <div className="flex-1 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mb-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                className="w-full p-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-xl border-0 focus:ring-2 focus:ring-amber-300/50 text-amber-900 dark:text-gray-100 text-lg font-light tracking-wide transition-all duration-500 pl-6 pr-12"
                value={filters.keyword}
                onChange={(e) =>
                  handleFilterChange("keyword", e.target.value.trim())
                }
                placeholder=" "
              />
              <div className="typewriter-input absolute top-1/2 left-6 transform -translate-y-1/2 text-amber-900/70 dark:text-amber-500/70 text-lg font-light tracking-wide pointer-events-none"></div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 rounded-full"
                onClick={() => setIsFilterOpen(true)}
              >
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </motion.button>
            </div>

            <div className="text-center mt-6">
              <motion.div
                className="inline-block text-amber-700 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-900/30 backdrop-blur-sm px-6 py-2 rounded-full shadow-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="font-medium">{products.length}</span>
                <span className="font-light ml-1">exquisite designs found</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {products?.map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  layout
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-xl transition-all duration-500 border border-amber-50/80 dark:border-amber-900/30 h-full">
                    <div className="overflow-hidden">
                      <Link to={`/products/${product._id}`} className="">
                        <motion.div
                          className="absolute inset-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                        <motion.img
                          src={product.images[0]?.url}
                          alt={product.name}
                          className="w-full h-80 object-fit object-fit"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.7 }}
                        />
                      </Link>
                    </div>

                    <div className="absolute top-3 left-3 right-3 flex justify-between z-20">
                      {new Date(product.createdAt) >=
                        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gradient-to-r from-amber-500 to-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full tracking-wider flex items-center gap-1 backdrop-blur-md"
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

                    <div className="p-5">
                      <div className="mb-2">
                        <h3 className="font-serif text-lg text-amber-950 dark:text-amber-100 tracking-wide truncate group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-light tracking-wide">
                          {product.metalColour} · {product.metal}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex flex-col">
                          <span className="text-amber-700 dark:text-amber-300 font-medium text-lg tracking-wide">
                            ₹
                            {Math.round(
                              product.price -
                                (product.price * product.discount) / 100
                            ).toLocaleString()}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 line-through font-light">
                              ₹{product.price.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2 text-amber-800 dark:text-amber-300">
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-2 mt-16"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 rounded-full shadow-lg text-sm font-medium transition-all duration-300 flex items-center justify-center ${
                  currentPage === page
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                    : "bg-white/90 dark:bg-slate-900/90 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/40"
                }`}
                onClick={() => handleFilterChange("page", page)}
              >
                {page}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default ProductsPage;
