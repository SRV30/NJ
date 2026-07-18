import { FaGem, FaCrown, FaHandHoldingHeart } from "react-icons/fa";

const LuxuryExperience = () => {
  return (
    <section className=" py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-amber-700 dark:text-amber-400 mb-4 font-serif">
          Experience Luxury Like Never Before
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          At{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            Gitanjali Jewellers
          </span>
          , we craft exquisite pieces that blend tradition with modern elegance.
          Explore timeless beauty and unmatched craftsmanship.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-slate-900 shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 flex flex-col justify-between h-full">
            <div>
              <div className="text-amber-600 dark:text-amber-400 text-4xl sm:text-5xl mb-4 flex justify-center">
                <FaGem />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Pure & Certified Gems
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Every piece is crafted with 100% authentic, certified diamonds and
                precious stones.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 flex flex-col justify-between h-full">
            <div>
              <div className="text-amber-600 dark:text-amber-400 text-4xl sm:text-5xl mb-4 flex justify-center">
                <FaCrown />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Royal Elegance
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Inspired by regal designs, our jewelry reflects timeless luxury
                and grace.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 sm:col-span-2 lg:col-span-1 flex flex-col justify-between h-full">
            <div>
              <div className="text-amber-600 dark:text-amber-400 text-4xl sm:text-5xl mb-4 flex justify-center">
                <FaHandHoldingHeart />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Handcrafted Perfection
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Each jewelry piece is meticulously handcrafted by skilled artisans
                with passion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryExperience;
