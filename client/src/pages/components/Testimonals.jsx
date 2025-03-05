import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { UserPen } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha K.",
    review:
      "Best jewelry ever! Stunning quality and great customer service. The designs are so elegant!",
    image: "https://ui-avatars.com/api/?name=Ayesha+K&background=random",
    location: "Mumbai, India",
  },
  {
    name: "Rahul S.",
    review:
      "Amazing craftsmanship. Highly recommended! My wife loved the ring I got for her anniversary.",
    image: "https://ui-avatars.com/api/?name=Rahul+S&background=random",
    location: "Delhi, India",
  },
  {
    name: "Sonia P.",
    review:
      "Absolutely gorgeous jewelry! I receive so many compliments whenever I wear my necklace.",
    image: "https://ui-avatars.com/api/?name=Sonia+P&background=random",
    location: "Bangalore, India",
  },
  {
    name: "Ankit M.",
    review:
      "Fast delivery, beautiful packaging, and exquisite jewelry. Highly recommended for gifts!",
    image: "https://ui-avatars.com/api/?name=Ankit+M&background=random",
    location: "Pune, India",
  },
  {
    name: "Priya R.",
    review:
      "The earrings I bought are a masterpiece! Perfect blend of tradition and modernity.",
    image: "https://ui-avatars.com/api/?name=Priya+R&background=random",
    location: "Chennai, India",
  },
  {
    name: "Vikram T.",
    review:
      "Top-notch quality and attention to detail. My purchase exceeded all expectations!",
    image: "https://ui-avatars.com/api/?name=Vikram+T&background=random",
    location: "Hyderabad, India",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-gray-800 dark:text-amber-100 mb-12 font-serif">
          What Our Customers Say
          <span className="block text-xl font-light mt-2 text-amber-600 dark:text-amber-400">
            Genuine experiences from our happy customers
          </span>
        </h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="max-w-4xl mx-auto"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center transition-transform hover:-translate-y-2 duration-300">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 mx-auto rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-lg"
                />
                <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">
                  {t.name}
                </h3>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  {t.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300 italic mt-3 leading-relaxed">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="mt-3 flex justify-center">
                  {[...Array(5)].map((_, idx) => (
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
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-8">
          &ldquo;The best advertising you can have is a loyal customer spreading
          the word about how incredible your jewelry is.&rdquo;
        </p>

        <div className="text-center mt-8">
          <a
            href="#contact"
            className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            <UserPen className="w-5 h-5 mr-2" /> Share Your Experience
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
