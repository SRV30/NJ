import { createTestimonial } from "@/store/extra/testimonialSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showJewelryToast } from "./showJewelryToast";
import { Star } from "lucide-react";

const CreateTestimonialPage = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  const {
    loading,
    error,
    success: testimonialSuccess,
  } = useSelector((state) => state.testimonials);

  useEffect(() => {
    if (testimonialSuccess) {
      showJewelryToast("Testimonial submitted successfully", "success");
      resetForm();
    }
  }, [testimonialSuccess]);

  const resetForm = () => {
    setName("");
    setRating(5);
    setReview("");
    setStateVal("");
    setCountry("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      createTestimonial({
        name,
        rating: Number(rating),
        review,
        state: stateVal,
        country,
      })
    );
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 flex items-center justify-center p-4 text-amber-800 dark:text-amber-300">
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="bg-amber-600 dark:bg-amber-800 p-6 text-white">
            <h2 className="text-2xl font-bold text-center">
              Share Your Experience
            </h2>
            <p className="text-center text-amber-100 mt-1">
              We value your feedback
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-center">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full p-3 border border-amber-200 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Your Rating
              </label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="mr-1 focus:outline-none"
                  >
                    <Star
                      size={28}
                      className={`${
                        star <= rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300 dark:text-gray-600"
                      } hover:scale-110 transition-transform`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-amber-600 dark:text-amber-400">
                  {rating} out of 5
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Your Review
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                rows="4"
                placeholder="Tell us about your experience..."
                className="w-full p-3 border border-amber-200 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  value={stateVal}
                  onChange={(e) => setStateVal(e.target.value)}
                  required
                  placeholder="Your state"
                  className="w-full p-3 border border-amber-200 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  placeholder="Your country"
                  className="w-full p-3 border border-amber-200 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
            >
              {loading ? (
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
                  Submitting...
                </>
              ) : (
                "Submit Your Testimonial"
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-4 text-sm opacity-80">
          Thank you for taking the time to share your experience with us
        </p>
      </div>
    </div>
  );
};

export default CreateTestimonialPage;
