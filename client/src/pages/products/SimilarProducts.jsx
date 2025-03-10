import PropTypes from "prop-types";
import { motion } from "framer-motion";

const SimilarProducts = ({ similarProducts }) => {
  return (
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
              <div className="aspect-square">
                <img
                  src={prod.images[0]?.url}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-amber-950 dark:text-amber-100 truncate">
                  {prod.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  ₹{Math.round(prod.price - (prod.price * prod.discount) / 100)}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            No similar products found.
          </div>
        )}
      </div>
    </motion.div>
  );
};

SimilarProducts.propTypes = {
  similarProducts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discount: PropTypes.number,
    })
  ).isRequired,
};

export default SimilarProducts;
