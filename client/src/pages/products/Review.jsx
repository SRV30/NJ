import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Reviews = ({ reviews }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="border-t border-amber-100 dark:border-amber-900/50 p-6 lg:p-8"
    >
      <h2 className="text-2xl font-serif text-amber-950 dark:text-amber-100 mb-6">
        Customer Reviews
      </h2>
      {reviews && reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-amber-50/50 dark:bg-amber-900/20 rounded-lg p-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-medium">
                  {review.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-amber-950 dark:text-amber-100">
                    {review.name || "Anonymous"}
                  </h4>
                  <div className="flex items-center mt-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < (review.rating || 0)
                            ? "text-amber-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {review.comment || "No comment provided."}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      )}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 mx-auto block py-3 px-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-all duration-300 font-medium"
      >
        Write a Review
      </motion.button>
    </motion.div>
  );
};

// Add PropTypes validation
Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.number.isRequired,
      createdAt: PropTypes.string,
      comment: PropTypes.string,
    })
  ).isRequired,
};

export default Reviews;
