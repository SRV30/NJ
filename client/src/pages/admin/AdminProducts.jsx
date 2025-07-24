import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { showJewelryToast } from "../extras/showJewelryToast";
import MetaData from "../extras/MetaData";
import ConfirmationModal from "../extras/ConfirmationModel";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  clearProductError,
  resetProductSuccess,
} from "@/store/product-slice/product";
import { fetchJewelleryCategories } from "@/store/product-slice/jewelleryType";
import { fetchCategories } from "@/store/product-slice/category";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [formData, setFormData] = useState({
    product_id: "",
    name: "",
    description: "",
    jewelleryType: [],
    productCategory: [],
    metal: "",
    metalColour: "",
    bestseller: "No",
    images: [],
    gram: 0,
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [filters, setFilters] = useState({
    keyword: "",
    metal: "",
  });
  const [page, setPage] = useState(1);
  const limit = 10;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading: productLoading,
    error: productError,
    success: productSuccess,
    products = [],
    totalPages = 0,
  } = useSelector((state) => state.product || {});
  const {
    categories: jewelleryCategories = [],
    loading: jewelleryLoading,
    error: jewelleryError,
  } = useSelector((state) => state.jewellery || {});
  const {
    categories: productCategories = [],
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.category || {});

  useEffect(() => {
    dispatch(getProducts({ ...filters, page, limit }));
    dispatch(fetchJewelleryCategories());
    dispatch(fetchCategories());
  }, [dispatch, filters, page]);

  useEffect(() => {
    if (jewelleryError) {
      showJewelryToast(
        jewelleryError.message || "Failed to load jewellery types",
        "error"
      );
    }
    if (categoryError) {
      showJewelryToast(
        categoryError.message || "Failed to load categories",
        "error"
      );
    }
  }, [jewelleryError, categoryError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gram" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setFormData((prev) => ({ ...prev, images: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const generateProductId = () => {
    return "JD" + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "product_id") {
        productData.append(key, formData.product_id || generateProductId());
      } else if (!["images", "jewelleryType", "productCategory"].includes(key)) {
        productData.append(key, formData[key]);
      }
    });
    formData.images.forEach((image) => productData.append("images", image));
    if (formData.jewelleryType.length > 0) {
      productData.set("jewelleryType", JSON.stringify(formData.jewelleryType));
    }
    if (formData.productCategory.length > 0) {
      productData.set("productCategory", JSON.stringify(formData.productCategory));
    }
    
    for (let pair of productData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  
    if (editId) {
      dispatch(updateProduct({ id: editId, productData }));
    } else {
      dispatch(createProduct(productData));
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({
      product_id: product.product_id,
      name: product.name,
      description: product.description,
      jewelleryType:
        product.jewelleryType && product.jewelleryType.length
          ? product.jewelleryType.map((item) => item._id)
          : [],
      productCategory:
        product.productCategory && product.productCategory.length
          ? product.productCategory.map((item) => item._id)
          : [],
      metal: product.metal,
      metalColour: product.metalColour || "",
      bestseller: product.bestseller || "No",
      images: [],
      gram: product.gram || 0,
    });
    setImagePreviews(product.images.map((img) => img.url));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      showJewelryToast("Product deleted successfully!", "success");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({
      product_id: "",
      name: "",
      description: "",
      jewelleryType: [],
      productCategory: [],
      metal: "",
      metalColour: "",
      bestseller: "No",
      images: [],
      gram: 0,
    });
    setImagePreviews([]);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  useEffect(() => {
    if (productError) {
      showJewelryToast(productError.message || "An error occurred", "error");
      dispatch(clearProductError());
    }
    if (productSuccess) {
      showJewelryToast(
        editId
          ? "Product updated successfully!"
          : "Product added successfully!",
        "success"
      );
      handleCancelEdit();
      dispatch(resetProductSuccess());
    }
  }, [productError, productSuccess, dispatch, editId]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const cardVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 12px 24px rgba(255, 215, 0, 0.3)",
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <MetaData
        title="Admin Products | Nandani Jewellers"
        description="Manage luxury jewelry products for Nandani Jewellers admin panel with advanced filtering and pagination."
        keywords="Nandani Jewellers admin, luxury jewelry, manage products, gold jewelry, diamond jewelry"
      />

      <motion.div
        className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-amber-200/50 dark:border-gray-700/50 p-10 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/10 to-transparent dark:from-amber-800/10 pointer-events-none" />

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-serif font-semibold text-amber-800 dark:text-amber-100 mb-10 text-center tracking-wide"
        >
          {editId ? "Refine Product" : "Craft New Product"}
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2">
                Product Id
              </label>
              <input
                type="text"
                name="product_id"
                value={formData.product_id}
                onChange={handleInputChange}
                placeholder="e.g., JDH45W5FW"
                className="w-full p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 placeholder-amber-700/50 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Diamond Ring"
                className="w-full p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 placeholder-amber-700/50 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2">
                Weight (grams)
              </label>
              <input
                type="number"
                name="gram"
                value={formData.gram}
                onChange={handleInputChange}
                placeholder="e.g., 10.5"
                min="0"
                step="0.01"
                required
                className="w-full p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 placeholder-amber-700/50 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2">
                Jewellery Type
              </label>
              <select
                name="jewelleryType"
                value={formData.jewelleryType}
                multiple
                onChange={(e) => {
                  const selected = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    jewelleryType: selected,
                  }));
                }}
                className="w-full p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 transition-all duration-300"
                disabled={jewelleryLoading}
              >
                {jewelleryCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2">
                Product Category
              </label>
              <select
                name="productCategory"
                value={formData.productCategory}
                multiple
                onChange={(e) => {
                  const selected = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    productCategory: selected,
                  }));
                }}
                className="w-full p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 transition-all duration-300"
                disabled={categoryLoading}
              >
                {productCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2">
                Metal
              </label>
              <select
                name="metal"
                value={formData.metal}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 transition-all duration-300"
              >
                <option value="">Select Metal</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Diamond">Diamond</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2">
                Metal Colour
              </label>
              <select
                name="metalColour"
                value={formData.metalColour}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 transition-all duration-300"
              >
                <option value="">Select Colour</option>
                <option value="Silver">Silver</option>
                <option value="Yellow">Yellow</option>
                <option value="White">White</option>
                <option value="Rose">Rose</option>
                <option value="White and Rose">White and Rose</option>
                <option value="Yellow and Rose">Yellow and Rose</option>
                <option value="Yellow and White">Yellow and White</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2">
                Bestseller
              </label>
              <select
                name="bestseller"
                value={formData.bestseller}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 transition-all duration-300"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="e.g., A stunning diamond ring..."
              className="w-full p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 placeholder-amber-700/50 transition-all duration-300 h-32 resize-none"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2">
              Product Images (Max 10)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full p-3 border border-amber-300/50 dark:border-gray-600 rounded-xl bg-amber-50/50 dark:bg-gray-800/50 text-amber-800 dark:text-amber-100 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:bg-amber-600 file:text-white hover:file:bg-amber-700 transition-all duration-300"
            />
            {imagePreviews.length > 0 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {imagePreviews.map((preview, index) => (
                  <motion.img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-fit rounded-xl shadow-lg border border-amber-200/50"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
          <div className="flex gap-4">
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={productLoading}
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-medium shadow-lg hover:from-amber-700 hover:to-amber-800 disabled:opacity-60 transition-all duration-300"
            >
              {productLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" className="opacity-75" />
                  </svg>
                  {editId ? "Updating..." : "Creating..."}
                </span>
              ) : editId ? (
                "Update Product"
              ) : (
                "Create Product"
              )}
            </motion.button>
            {editId && (
              <motion.button
                type="button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleCancelEdit}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-medium shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
              >
                Cancel
              </motion.button>
            )}
          </div>
        </form>

        <motion.div variants={itemVariants} className="mt-16">
          <h3 className="text-3xl font-serif font-semibold text-amber-800 dark:text-amber-100 mb-8 text-center">
            Product Inventory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              placeholder="Search products..."
              className="p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 transition-all duration-300 md:w-88 lg:w-120"
            />
          </div>

          {products.length === 0 ? (
            <p className="text-center text-amber-600 dark:text-amber-400 font-medium">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                return (
                  <motion.div
                    key={product._id}
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg border border-amber-300/30 dark:border-gray-600/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 flex-wrap">
                      {product.images[0]?.url && (
                        <motion.img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-24 h-24 object-fit rounded-lg shadow-md border border-amber-200/50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                      <div>
                        <p className="text-sm text-amber-700 dark:text-amber-200">
                          {product.product_id}
                        </p>
                        <h4 className="text-lg font-serif font-semibold text-amber-800 dark:text-amber-100 capitalize">
                          {product.name}
                        </h4>
                        <p className="text-sm text-amber-700 dark:text-amber-200">
                          {product.metal} - {product.gram}g -{" "}
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
                            : "N/A"}{" "}
                          -{" "}
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
                        {product.bestseller === "Yes" && (
                          <span className="text-xs text-amber-500 dark:text-amber-400 font-semibold">
                            Bestseller
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4 flex-wrap">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => {
                          navigate(`/products/${product._id}`);
                        }}
                        className="px-4 py-2 bg-amber-900 text-white rounded-lg shadow-md hover:bg-amber-800 transition-all duration-300 cursor-pointer"
                      >
                        View
                      </motion.button>
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handleEdit(product)}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg shadow-md hover:bg-amber-700 transition-all duration-300 cursor-pointer"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handleDelete(product._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 cursor-pointer"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-4">
              <motion.button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg disabled:opacity-50"
              >
                Previous
              </motion.button>
              <span className="text-amber-800 dark:text-amber-100 font-medium">
                Page {page} of {totalPages}
              </span>
              <motion.button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

export default AdminProducts;