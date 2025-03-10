import { motion } from "framer-motion";
import { useState } from "react";
import { showJewelryToast } from "../extras/showJewelryToast";
import Typewriter from "typewriter-effect";
import MetaData from "../extras/MetaData";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showJewelryToast("Please fill in all fields", "error");
      return;
    }
    setLoading(true);
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      showJewelryToast("Message sent successfully!", "success");
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
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
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="text-gray-800 dark:text-white">
     <MetaData
            title="Contact Us | Nandani Jewellers - Timeless Elegance & Craftsmanship"
            description="Discover the legacy of Nandani Jewellers, where tradition meets innovation. Explore our exquisite collection of gold, diamond, and silver jewelry, crafted with precision and passion."
            keywords="Nandani Jewellers, gold jewelry, diamond rings, silver accessories, luxury jewelry, fine craftsmanship, bridal jewelry, handcrafted ornaments"
          />
      {/* Hero Section */}
      <motion.section
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/contact-hero.jpg')" }} // Replace with your hero image
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            className="text-center text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight"
            >
              Contact Nandani Jewellers
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-lg md:text-xl text-amber-200"
            >
              <Typewriter
                options={{
                  strings: [
                    "We’re here to assist you in your jewellery journey",
                    "Your perfect jewel is just a message away",
                    "Let’s craft something timeless together",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form and Details Section */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 md:grid-cols-2 gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-8">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-4 rounded-lg border border-amber-400 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-600/50 transition-all duration-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-4 rounded-lg border border-amber-400 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-600/50 transition-all duration-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                className="w-full p-4 rounded-lg border border-amber-400 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white placeholder-amber-600/50 transition-all duration-300"
              />
            </motion.div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-medium tracking-wide shadow-md hover:from-amber-700 hover:to-amber-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
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
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Details */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-8">
            Contact Information
          </h2>
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Phone:</strong> +91 8434343401
            </p>
            <p>
              <strong>Email:</strong> support@nandanijewellers.com
            </p>
            <p>
              <strong>Address:</strong> Supriya Road, Near Axis Bank, Bettiah,
              Bihar 400001, India
            </p>
          </div>
          {/* Map */}
          <motion.div
            variants={itemVariants}
            className="mt-8 h-64 w-full rounded-lg overflow-hidden shadow-md"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.121810280102!2d84.50274257526758!3d26.80072277671409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39936ebc6b98a2c3%3A0x388ef3c6789aa6e4!2zTmFuZGFuaSBKZXdlbGxlcnMgLSDgpKjgpKjgpY3gpKbgpKjgpYAg4KSc4KWN4KS14KWH4KSy4KSw4KWN4KS4!5e1!3m2!1sen!2sin!4v1741035819873!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Nandani Jewellers Location"
            ></iframe>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ContactUs;
