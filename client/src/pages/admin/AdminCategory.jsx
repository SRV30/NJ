import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { showJewelryToast } from "../extras/showJewelryToast";
import MetaData from "../extras/MetaData";

import {
  addCategory,
  fetchCategories,
  updateCategory,
  deleteCategory,
  clearError,
  clearSuccess,
} from "@/store/product-slice/category";
import ConfirmationModal from "../extras/ConfirmationModel";

const ManageCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const dispatch = useDispatch();
  const { loading, error, success, categories } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showJewelryToast("Please enter a category name", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("images", image);
    }

    if (editId) {
      dispatch(updateCategory({ id: editId, formData }));
    } else {
      dispatch(addCategory(formData));
    }
  };

  const handleEdit = (category) => {
    setEditId(category._id);
    setName(category.name);
    setImagePreview(category.images[0]?.url || null);
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete));
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setName("");
    setImage(null);
    setImagePreview(null);
  };

  useEffect(() => {
    if (error) {
      showJewelryToast(error, "error");
      dispatch(clearError());
    }
    if (success) {
      showJewelryToast(
        editId
          ? "Category updated successfully!"
          : "Category added successfully!",
        "success"
      );
      setName("");
      setImage(null);
      setImagePreview(null);
      setEditId(null);
      dispatch(clearSuccess());
    }
  }, [error, success, dispatch, editId]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.1, rotate: 2, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(255, 193, 7, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <MetaData
        title="Manage Category | Nandani Jewellers Admin"
        description="Admin panel to manage categories for Nandani Jewellers. Add, update, and delete luxury gold, diamond, and silver with ease."
        keywords="Nandani Jewellers admin, manage categories, luxury jewelry management, gold jewelry categories, diamond, jewelry admin panel"
      />

      <motion.div
        className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-amber-200/50 dark:border-gray-700/50 p-10 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/10 to-transparent dark:from-amber-800/10 pointer-events-none" />

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-serif font-semibold text-amber-800 dark:text-amber-100 mb-10 text-center tracking-wide"
        >
          {editId ? "Refine Category" : "Craft New Category"}
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div variants={itemVariants}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2 tracking-wider"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Gold Necklaces"
              className="w-full p-4 rounded-xl border border-amber-300/50 dark:border-gray-600 bg-amber-50/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-800 dark:text-amber-100 placeholder-amber-800/50 dark:placeholder-amber-200/50 transition-all duration-300 shadow-inner"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-amber-700 dark:text-amber-200 mb-2 tracking-wider"
            >
              Category Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-amber-300/50 dark:border-gray-600 rounded-xl bg-amber-50/50 dark:bg-gray-800/50 text-amber-800 dark:text-amber-100 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-amber-600 file:text-white hover:file:bg-amber-700 transition-all duration-300 shadow-inner"
            />
            {imagePreview && (
              <motion.img
                src={imagePreview}
                alt="Category Preview"
                className="mt-6 w-full h-48 object-cover rounded-xl shadow-lg border border-amber-200/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-medium tracking-wide shadow-lg hover:from-amber-700 hover:to-amber-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  {editId ? "Refining..." : "Crafting..."}
                </span>
              ) : editId ? (
                "Update Category"
              ) : (
                "Add Category"
              )}
            </motion.button>
            {editId && (
              <motion.button
                type="button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleCancelEdit}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-medium tracking-wide shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
              >
                Cancel
              </motion.button>
            )}
          </div>
        </form>

        <motion.div variants={itemVariants} className="mt-16">
          <h3 className="text-3xl font-serif font-semibold text-amber-800 dark:text-amber-100 mb-8 text-center tracking-wide">
            Your Jewelry Collections
          </h3>
          {categories.length === 0 ? (
            <p className="text-center text-amber-600 dark:text-amber-400 font-medium">
              No collections crafted yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <motion.div
                  key={category._id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl shadow-lg border border-amber-300/30 dark:border-gray-600/30 flex items-center justify-between transform transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {category.images[0]?.url && (
                      <motion.img
                        src={category.images[0].url}
                        alt={category.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-md border border-amber-200/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    <span className="text-amber-800 dark:text-amber-100 font-serif font-medium text-lg">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handleEdit(category)}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg shadow-md hover:bg-amber-700 transition-all duration-300"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handleDelete(category._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </div>
  );
};

export default ManageCategory;
