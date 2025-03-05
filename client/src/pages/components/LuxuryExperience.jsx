import { FaGem, FaCrown, FaHandHoldingHeart } from "react-icons/fa";

const LuxuryExperience = () => {
  return (
    <section className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-amber-700 dark:text-amber-400 mb-4 font-serif">
          Experience Luxury Like Never Before
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          At <span className="font-semibold text-amber-600 dark:text-amber-400">Nandani Jewellers</span>, we craft exquisite pieces that blend tradition with modern elegance. Explore timeless beauty and unmatched craftsmanship.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-amber-600 dark:text-amber-400 text-5xl mb-4">
              <FaGem />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Pure & Certified Gems
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every piece is crafted with 100% authentic, certified diamonds and precious stones.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-amber-600 dark:text-amber-400 text-5xl mb-4">
              <FaCrown />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Royal Elegance
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Inspired by regal designs, our jewelry reflects timeless luxury and grace.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-amber-600 dark:text-amber-400 text-5xl mb-4">
              <FaHandHoldingHeart />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Handcrafted Perfection
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each jewelry piece is meticulously handcrafted by skilled artisans with passion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryExperience;
