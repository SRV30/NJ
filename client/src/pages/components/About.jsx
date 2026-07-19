import { AnimatePresence, motion } from "framer-motion";
import MetaData from "../extras/MetaData";
import { useState, useEffect } from "react";
import p1 from "../../assets/slider/7.png";
import p2 from "../../assets/slider/8.png";
import b6 from "../../assets/slider/6.png";

const About = () => {
  // eslint-disable-next-line no-unused-vars
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1],
        delay: custom * 0.1,
      },
    }),
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: "easeOut",
      },
    },
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        delay: custom * 0.1,
      },
    }),
  };

  return (
    <div className="text-gray-800 dark:text-white overflow-hidden mt-7">
      <MetaData
        title="About Us | Gitanjali Jewellers - Timeless Craftsmanship"
        description="Learn about Gitanjali Jewellers' legacy, crafting gold, diamond, and silver jewelry since 2024. Explore our luxurious collections today."
        keywords="Gitanjali Jewellers, gold jewelry, diamond rings, silver accessories, handcrafted ornaments, luxury jewelry"
      />

      <div className="container mx-auto px-4 mt-4 sm:mt-7">
        <motion.div
          className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[36rem] w-full relative rounded-xl overflow-hidden shadow-2xl border-2 border-amber-200/30 dark:border-gray-700/30 backdrop-blur-sm"
          whileHover="hover"
          initial={{
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Desktop Slider */}
          <div className="hidden md:flex h-full w-full overflow-hidden perspective-1000">
            <AnimatePresence initial={false} mode="wait">
              <motion.div key={b6} className="w-full h-full">
                <img
                  src={b6}
                  className="w-full h-full object-fit rounded-xl transform transition-transform duration-1000 hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Slider */}
          <div className="flex md:hidden h-full w-full overflow-hidden perspective-1000">
            <AnimatePresence initial={false} mode="wait">
              <motion.div key={b6} className="w-full h-full" animate="visible">
                <img
                  src={b6}
                  className="w-full h-full object-fit rounded-xl"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.section
        className="relative py-12 sm:py-20 lg:py-32 overflow-hidden"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url(${b6})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            rotate: 360,
            transition: { repeat: Infinity, duration: 180, ease: "linear" },
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <motion.div
              className="w-full lg:w-1/2"
              variants={fadeInUpVariants}
              custom={0}
            >
              <motion.span
                className="block text-amber-700 dark:text-amber-300 text-xs sm:text-sm uppercase tracking-widest mb-3 font-medium"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Legacy
              </motion.span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-6 leading-tight">
                Best Jewellers in <br />
                <span className="relative inline-block mt-2">
                  Bihar
                  <motion.span
                    className="absolute -bottom-3 left-0 h-1 bg-amber-400 dark:bg-amber-300"
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                </span>
              </h2>

              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                Gitanjali Jewellers has been a trusted name in the world of fine
                jewelry, offering an extensive range of high-quality diamond,
                gold, and silver jewelry. Located in the heart of Bettiah,
                Bihar, we specialize in crafting beautiful, timeless pieces
                designed for special occasions like weddings, engagements, and
                festivals. Our commitment to excellence has made us a preferred
                destination for those seeking exceptional value and
                craftsmanship in their jewelry.
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                Over two decades later, we&apos;ve evolved into a distinguished
                name in fine jewelry, celebrated for our uncompromising quality
                and distinctive designs. Our pieces don&apos;t simply adorn;
                they become treasured heirlooms, carrying stories across
                generations.
              </p>
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2 relative"
              variants={scaleInVariants}
              custom={1}
            >
              <motion.div
                className="relative z-10 w-full h-[280px] sm:h-[380px] md:h-[450px] rounded-lg overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={p1}
                  alt="Gitanjali Jewellers artisans at work"
                  className="w-full h-full object-fit"
                />
              </motion.div>

              <motion.div
                className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 w-full h-full border-2 border-amber-200 dark:border-amber-900 rounded-lg z-0"
                initial={{ opacity: 0, x: 20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-12 sm:py-20 lg:py-32"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
            variants={fadeInUpVariants}
            custom={0}
          >
            <span className="block text-amber-700 dark:text-amber-300 text-xs sm:text-sm uppercase tracking-widest mb-3 font-medium">
              What Defines Us
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-4 sm:mb-6">
              Why Choose Gitanjali Jewellers?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
              Our collection includes meticulously crafted pieces such as
              Jhumkas, Tilahari malas, Ms Lari, Nathiyas, bangles, Kanganas,
              Tikas, lockets, chains, and necklace sets. Each item is designed
              with precision, ensuring both quality and elegance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: "Uncompromising Quality",
                desc: "We select only the finest materials and apply exacting standards to every creation.",
                icon: "✦",
              },
              {
                title: "Artisanal Excellence",
                desc: "Our master craftsmen blend traditional techniques with innovative approaches.",
                icon: "✦",
              },
              {
                title: "Variety",
                desc: "Our extensive range caters to diverse preferences, ensuring that every customer finds something they love.",
                icon: "✦",
              },
              {
                title: "Customer Satisfaction",
                desc: "With glowing reviews and a loyal customer base, we prioritize customer happiness and aim to exceed their expectations.",
                icon: "✦",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={scaleInVariants}
                custom={index}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.3 },
                }}
                className="bg-white dark:bg-slate-950 rounded-xl shadow-lg overflow-hidden group border border-amber-100 dark:border-slate-700"
              >
                <div className="h-full flex flex-col p-8">
                  <span className="text-3xl text-amber-500 dark:text-amber-300 mb-4">
                    {value.icon}
                  </span>
                  <h3 className="text-xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    {value.desc}
                  </p>
                  <motion.div
                    className="mt-6 w-12 h-0.5 bg-amber-400 dark:bg-amber-300 group-hover:w-full"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-12 sm:py-20 lg:py-32 relative overflow-hidden"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
          style={{
            backgroundImage: "url('/images/jewelry-pattern.png')",
            backgroundSize: "cover",
          }}
          animate={{
            x: [0, 20, 0],
            transition: { repeat: Infinity, duration: 20, ease: "easeInOut" },
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12"
            variants={fadeInUpVariants}
          >
            <motion.div
              className="w-full lg:w-1/2"
              variants={fadeInUpVariants}
              custom={0}
            >
              <span className="block text-amber-700 dark:text-amber-300 text-xs sm:text-sm uppercase tracking-widest mb-3 font-medium">
                Our Commitment
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-6 leading-tight">
                Giving Back to <br />
                <span className="relative inline-block mt-2">
                  Society & Nature
                  <motion.span
                    className="absolute -bottom-3 left-0 h-1 bg-amber-400 dark:bg-amber-300"
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                </span>
              </h2>

              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                At Gitanjali Jewellers, our responsibility extends beyond
                creating beautiful jewelry. We believe in nurturing the
                communities and environment that sustain us.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Artisan Empowerment",
                    desc: "We provide fair wages, healthcare, and continuous training to our artisans and their families.",
                  },
                  {
                    title: "Customer Satisfaction",
                    desc: "We prioritize exceptional customer service, ensuring a seamless shopping experience with personalized assistance and hassle-free returns.",
                  },
                  {
                    title: "Environmental Stewardship",
                    desc: "We implement sustainable practices throughout our supply chain and manufacturing process.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * idx }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-amber-400 dark:bg-amber-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-amber-700 dark:text-amber-300 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2 relative"
              variants={scaleInVariants}
              custom={1}
            >
              <motion.div
                className="relative z-10 w-full h-[500px] sm:h-[600px] md:h-[780px] rounded-lg overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img src={p2} className="w-full h-full object-fit" />
              </motion.div>

              <motion.div
                className="absolute -left-2 sm:-left-4 -bottom-2 sm:-bottom-4 w-full h-full border-2 border-amber-200 dark:border-amber-900 rounded-lg z-0"
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-12 sm:py-20"
        variants={fadeInUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic text-amber-800 dark:text-amber-300 my-4 sm:my-6 leading-relaxed">
              Gitanjali Jewellers is owned and operated by Vivek Kumar, whose
              vision and dedication have played a pivotal role in shaping the
              brand&#39;s reputation for trustworthiness and excellence in the
              jewelry industry. Their passion for creating stunning jewelry and
              offering impeccable customer service drives every aspect of the
              business.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
