import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { UserPen, Quote } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTestimonials } from "@/store/extra/testimonialSlice";
import { useEffect, useState } from "react";

// const testimonials = [
//     {
//       name: "Ayesha K.",
//       review:
//         "Best jewelry ever! Stunning quality and great customer service. The designs are so elegant!",
//       image: "https://ui-avatars.com/api/?name=Ayesha+K&background=random",
//       location: "Mumbai, India",
//     },
//     {
//       name: "Rahul S.",
//       review:
//         "Amazing craftsmanship. Highly recommended! My wife loved the ring I got for her anniversary.",
//       image: "https://ui-avatars.com/api/?name=Rahul+S&background=random",
//       location: "Delhi, India",
//     },
//     {
//       name: "Sonia P.",
//       review:
//         "Absolutely gorgeous jewelry! I receive so many compliments whenever I wear my necklace.",
//       image: "https://ui-avatars.com/api/?name=Sonia+P&background=random",
//       location: "Bangalore, India",
//     },
//     {
//       name: "Ankit M.",
//       review:
//         "Fast delivery, beautiful packaging, and exquisite jewelry. Highly recommended for gifts!",
//       image: "https://ui-avatars.com/api/?name=Ankit+M&background=random",
//       location: "Pune, India",
//     },
//     {
//       name: "Priya R.",
//       review:
//         "The earrings I bought are a masterpiece! Perfect blend of tradition and modernity.",
//       image: "https://ui-avatars.com/api/?name=Priya+R&background=random",
//       location: "Chennai, India",
//     },
//     {
//       name: "Vikram T.",
//       review:
//         "Top-notch quality and attention to detail. My purchase exceeded all expectations!",
//       image: "https://ui-avatars.com/api/?name=Vikram+T&background=random",
//       location: "Hyderabad, India",
//     },
//   ];
const Testimonials = () => {
  const dispatch = useDispatch();
  const { loading, error, testimonials } = useSelector(
    (state) => state.testimonials
  );

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

  const filteredTestimonials = testimonials.filter((t) => t.rating >= 4);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-medium rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-amber-50 font-serif leading-tight">
            Voices of{" "}
            <span className="text-amber-600 dark:text-amber-400">
              Satisfaction
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover what makes our jewelry collection truly special through the
            experiences of our valued customers.
          </p>
        </div>

        {/* Custom scrollbar hiding styles */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">
            Unable to load testimonials. Please try again later.
          </p>
        ) : filteredTestimonials.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No testimonials available at the moment.
          </p>
        ) : (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Autoplay, Pagination, EffectCoverflow]}
            className="testimonial-swiper mt-8"
            breakpoints={{
              640: { slidesPerView: 1.2, centeredSlides: true },
              768: { slidesPerView: 2, centeredSlides: false },
              1024: { slidesPerView: 3, centeredSlides: false },
            }}
          >
            {filteredTestimonials.map((t, i) => (
              <SwiperSlide key={i} className="pb-16">
                <div
                  className="h-full bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="p-1 bg-gradient-to-r from-amber-400 to-amber-600">
                    <div className="bg-white dark:bg-slate-800 p-6 h-full flex flex-col">
                      <div className="flex-grow">
                        <div className="flex items-center mb-4">
                          <Quote className="w-8 h-8 text-amber-400 opacity-30 mr-2" />
                          <div className="flex gap-1">
                            {[...Array(t.rating)].map((_, idx) => (
                              <svg
                                key={idx}
                                className="w-5 h-5 text-amber-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div
                          className={`relative overflow-y-auto transition-all duration-300 hide-scrollbar ${
                            hoveredIndex === i ? "max-h-64" : "max-h-24"
                          }`}
                        >
                          <p
                            className={`text-gray-700 dark:text-gray-200 mb-6 italic leading-relaxed ${
                              hoveredIndex === i ? "" : "line-clamp-4"
                            }`}
                          >
                            &quot;{t.review}&quot;
                          </p>
                          {hoveredIndex !== i && t.review.length > 150 && (
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white dark:from-slate-800 to-transparent pointer-events-none"></div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            t.name
                          )}&background=random&bold=true&size=128`}
                          alt={t.name}
                          className="w-12 h-12 rounded-full border-2 border-amber-100 dark:border-amber-900"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {t.name}
                          </h3>
                          <p className="text-xs text-amber-600 dark:text-amber-400">
                            {t.state}, {t.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="mt-20 max-w-3xl mx-auto text-center px-4">
          <blockquote className="text-xl md:text-2xl italic font-serif text-gray-700 dark:text-gray-200 leading-relaxed">
            &quot;The best advertising you can have is a loyal customer
            spreading the word about how incredible your jewelry is.&quot;
          </blockquote>

          <div className="mt-12">
            <a
              href="/testimonials"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <UserPen className="w-5 h-5 mr-2" /> Share Your Experience
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
