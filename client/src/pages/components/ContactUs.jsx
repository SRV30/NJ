import { motion } from "framer-motion";
import { useState } from "react";
import { showJewelryToast } from "../extras/showJewelryToast";
import Typewriter from "typewriter-effect";
import MetaData from "../extras/MetaData";
import { submitContactForm } from "@/store/extra/getintouchSlice";
import { useDispatch, useSelector } from "react-redux";
import b2 from "../../assets/slider/2.png"
import b3 from "../../assets/slider/3.png"


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const dispatch = useDispatch();
  const contactSubmit = useSelector((state) => state.contact);
  const { loading } = contactSubmit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.message
    ) {
      showJewelryToast("Please fill in all fields", "error");
      return;
    }

    await dispatch(submitContactForm(formData));

    setTimeout(() => {
      showJewelryToast("Message sent successfully!", "success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2 },
    },
  };

  const shimmerVariants = {
    initial: { x: "-100%", opacity: 0.3 },
    animate: {
      x: "100%",
      opacity: 0.7,
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(184, 134, 11, 0.4)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
  };

  const iconBoxVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(184, 134, 11, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  const goldGradient =
    "linear-gradient(135deg, #e6c461 0%, #b8860b 50%, #e6c461 100%)";

  return (
    <div className="mt-7">
      <MetaData
        title="Contact Us | Gitanjali Jewellers - Timeless Elegance & Craftsmanship"
        description="Discover the legacy of Gitanjali Jewellers, where tradition meets innovation. Explore our exquisite collection of gold, diamond, and silver jewelry, crafted with precision and passion."
        keywords="Gitanjali Jewellers, gold jewelry, diamond rings, silver accessories, luxury jewelry, fine craftsmanship, bridal jewelry, handcrafted ornaments"
      />

     <motion.section
  className="relative w-full h-[80vh] overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
>
  {/* Background Image */}
<motion.div
  className="absolute inset-0 bg-cover bg-no-repeat"
  style={{
    backgroundImage: `url(${b3})`,
    backgroundPosition: "center 21%", // ya "center 10%"
  }}
/>

  {/* Overlay */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/35"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.8 }}
  />

 
  
</motion.section>

      <motion.section
        className="max-w-5xl mx-auto px-6 py-16 text-center"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-serif mb-6 text-amber-800 dark:text-amber-300">
          Reach Out to Us
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
          At Gitanjali Jewellers, we value every customer and are here to assist
          you with any queries or information you may need. Whether you have
          questions about our collections, need assistance with a purchase, or
          require details about our services, our dedicated team is always ready
          to help. You can reach us via phone, email, or visit our stores in
          Bettiah for a personalized experience.
        </p>
      </motion.section>

      <motion.section
        className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 bg-white dark:bg-black p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-400 dark:border-amber-500 rounded-tl-lg" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-400 dark:border-amber-500 rounded-br-lg" />

          <motion.h2
            className="text-3xl md:text-4xl font-serif font-medium mb-10 text-amber-800 dark:text-amber-300 relative inline-block"
            variants={itemVariants}
          >
            Get in Touch
            <motion.div
              className="absolute -bottom-2 left-0 h-[2px] bg-amber-500"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="relative">
              <label className="text-sm text-amber-700 dark:text-amber-300 font-medium mb-1 block">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-4 rounded-lg border-2 border-amber-200 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent dark:text-white placeholder-amber-700/60 dark:placeholder-amber-200/70 transition-all duration-300"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <label className="text-sm text-amber-700 dark:text-amber-300 font-medium mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full p-4 rounded-lg border-2 border-amber-200 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent dark:text-white placeholder-amber-700/60 dark:placeholder-amber-200/70 transition-all duration-300"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <label className="text-sm text-amber-700 dark:text-amber-300 font-medium mb-1 block">
                Phone Number
              </label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full p-4 rounded-lg border-2 border-amber-200 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent dark:text-white placeholder-amber-700/60 dark:placeholder-amber-200/70 transition-all duration-300"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <label className="text-sm text-amber-700 dark:text-amber-300 font-medium mb-1 block">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                rows="5"
                className="w-full p-4 rounded-lg border-2 border-amber-200 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent dark:text-white placeholder-amber-700/60 dark:placeholder-amber-200/70 transition-all duration-300"
              />
            </motion.div>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg font-medium tracking-wide text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-500 relative overflow-hidden"
              style={{
                backgroundImage: goldGradient,
              }}
            >
              <span className="relative z-10 text-base font-medium">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
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
                    Processing Your Request...
                  </span>
                ) : (
                  "Send Message"
                )}
              </span>
            </motion.button>
          </form>

          <motion.div
            variants={itemVariants}
            className="mt-8 text-sm text-gray-600 dark:text-gray-400 italic text-center px-4"
          >
            By submitting this form, you agree to receive updates via SMS,
            WhatsApp, RCS, Email and other communication channels.
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
          <div className="bg-white dark:bg-black p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <motion.h2
              className="text-3xl md:text-4xl font-serif font-medium mb-8 text-amber-800 dark:text-amber-300 relative inline-block"
              variants={itemVariants}
            >
              Connect With Us
              <motion.div
                className="absolute -bottom-2 left-0 h-[2px] bg-amber-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.h2>

            <div className="space-y-6">
              <motion.div
                className="flex p-4 bg-amber-50 dark:bg-gray-700 rounded-xl transition-all duration-300"
                variants={iconBoxVariants}
                whileHover="hover"
              >
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundImage: goldGradient }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-amber-800 dark:text-amber-300 font-medium">
                    Phone
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    +91 82353 38300
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex p-4 bg-amber-50 dark:bg-gray-700 rounded-xl transition-all duration-300"
                variants={iconBoxVariants}
                whileHover="hover"
              >
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundImage: goldGradient }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-amber-800 dark:text-amber-300 font-medium">
                    Email
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                   gitanjalijewellers22k@gmail.com 
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-black p-8 rounded-2xl shadow-xl"
          >
            <motion.h3
              className="text-2xl font-serif font-medium mb-6 text-amber-800 dark:text-amber-300 relative inline-block"
              variants={itemVariants}
            >
              Visit Our Showrooms
              <motion.div
                className="absolute -bottom-2 left-0 h-[2px] bg-amber-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.h3>

            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300">
                  Gitanjali Jewellers near Pandit ji Chat House, Lal Bazar,
                  Bettiah, Bihar - 845438
                </p>

                <motion.div
                  className="h-48 w-full rounded-lg overflow-hidden shadow-md"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.2454393021276!2d84.5036875!3d26.800312500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39936f0006baf7b7%3A0xfe5b00d605a8bea0!2sGITANJALI%20JEWELLERS!5e0!3m2!1sen!2sin!4v1783885589853!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Gitanjali Jewellers Main Branch"
                  ></iframe>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="py-16 relative overflow-hidden"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/mandala-pattern.png')",
            backgroundSize: "cover",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 200,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-serif mb-6 text-amber-800 dark:text-amber-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            We Look Forward to Serving You
          </motion.h2>

          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Visit our showrooms today to experience the luxury and craftsmanship
            of Gitanjali Jewellers. Our expert team is ready to assist you in
            finding the perfect piece to celebrate your special moments.
          </motion.p>

          <motion.div
            className="inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.a
              href="#top"
              className="inline-block px-8 py-3 rounded-lg text-white font-medium relative overflow-hidden"
              style={{ backgroundImage: goldGradient }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(184, 134, 11, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Our Collections
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactUs;
