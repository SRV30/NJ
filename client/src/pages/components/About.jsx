import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import MetaData from "../extras/MetaData";

const About = () => {
  const navigate = useNavigate();

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

  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <MetaData
        title="About Us | Nandani Jewellers - Timeless Craftsmanship"
        description="Learn about Nandani Jewellers' legacy, crafting gold, diamond, and silver jewelry since 2002. Explore our luxurious collections today."
        keywords="Nandani Jewellers, gold jewelry, diamond rings, silver accessories, handcrafted ornaments, luxury jewelry"
      />

      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/jewellery-hero.jpg')" }} // Replace with your hero image
        variants={imageVariants}
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
              Welcome to Nandani Jewellers
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="mt-4 text-lg md:text-xl text-amber-200"
            >
              <Typewriter
                options={{
                  strings: [
                    "Discover the art of timeless elegance",
                    "Crafting luxury since 2002",
                    "Where tradition meets innovation",
                    "Your journey to exquisite beauty",
                    "Crafting memories in every piece",
                    "Exquisite designs, exceptional craftsmanship",
                    "Where tradition meets modern luxury",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </motion.div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate("/products")}
              className="mt-6 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium shadow-md hover:bg-amber-700 transition-all duration-300"
            >
              Explore Collections
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-12 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-serif font-medium text-amber-800 dark:text-amber-200 text-center mb-8"
        >
          Our Story
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto"
        >
          Founded in 2002 by Mr. Nandani, Nandani Jewellers began as a small
          workshop with a passion for crafting exquisite jewellery. Over the
          decades, we’ve grown into a renowned name, celebrated for our
          dedication to quality, craftsmanship, and customer satisfaction. Our
          journey is a testament to our commitment to blending tradition with
          innovation, creating pieces that become cherished heirlooms.
        </motion.p>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="bg-amber-50 dark:bg-gray-800 py-12 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-serif font-medium text-amber-800 dark:text-amber-200 text-center mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                desc: "We craft every piece with the finest materials and precision.",
              },
              {
                title: "Customer Satisfaction",
                desc: "Your happiness is our priority, every step of the way.",
              },
              {
                title: "Ethical Sourcing",
                desc: "We ensure our materials are responsibly sourced.",
              },
              {
                title: "Innovation",
                desc: "Blending tradition with modern design for unique creations.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md border border-amber-200 dark:border-gray-600"
              >
                <h3 className="text-xl font-serif font-medium text-amber-700 dark:text-amber-300 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CSR Section */}
      <motion.section
        className="bg-amber-50 dark:bg-gray-800 py-12 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-serif font-medium text-amber-800 dark:text-amber-200 text-center mb-12"
          >
            Corporate Social Responsibility
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
          >
            <p className="text-base md:text-lg leading-relaxed text-center">
              At Nandani Jewellers, we believe in giving back to the community
              and preserving our planet. Our initiatives include:
            </p>
            <ul className="mt-6 space-y-3 text-center">
              <li>
                Supporting local artisans with fair wages and training programs.
              </li>
              <li>
                Providing educational scholarships for underrepresented groups.
              </li>
              <li>
                Promoting environmental conservation through sustainable
                practices.
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
