import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import MetaData from "../extras/MetaData";
import { useState, useEffect } from "react";
import p1 from "../../assets/nandani.jpg";
import p2 from "../../assets/p2.jpg";

const About = () => {
  const navigate = useNavigate();
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

  const shimmerEffect = {
    hidden: {
      backgroundPosition: "200% 0%",
    },
    visible: {
      backgroundPosition: "0% 0%",
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 3,
        ease: "linear",
      },
    },
  };

  return (
    <div className="text-gray-800 dark:text-white overflow-hidden">
      <MetaData
        title="About Us | Nandani Jewellers - Timeless Craftsmanship"
        description="Learn about Nandani Jewellers' legacy, crafting gold, diamond, and silver jewelry since 2002. Explore our luxurious collections today."
        keywords="Nandani Jewellers, gold jewelry, diamond rings, silver accessories, handcrafted ornaments, luxury jewelry"
      />

      <div className="relative h-[80vh] overflow-hidden">
        <motion.div
          className="relative w-full h-[80vh] bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dmv1hs8b9/image/upload/v1742287557/NJ_jmvjki.png')",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
          <motion.div
            className="text-center text-white max-w-4xl px-6"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="mb-4 overflow-hidden"
              variants={fadeInUpVariants}
              custom={0}
            >
              <motion.span
                className="inline-block text-amber-300 text-lg font-light tracking-wider uppercase"
                variants={shimmerEffect}
                initial="hidden"
                animate="visible"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #fcd34d, transparent)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Since 2002
              </motion.span>
            </motion.div>

            <motion.h1
              variants={fadeInUpVariants}
              custom={1}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight leading-tight"
            >
              Nandani Jewellers
            </motion.h1>

            <motion.div
              variants={fadeInUpVariants}
              custom={2}
              className="mt-8 text-xl md:text-2xl font-light text-amber-100"
            >
              <Typewriter
                options={{
                  strings: [
                    "Discover the art of timeless elegance",
                    "Where heritage meets contemporary design",
                    "Crafting masterpieces for generations",
                    "Your journey to exquisite luxury",
                    "Elevating traditions with exceptional artistry",
                    "Setting trends in fine jewelry",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 80,
                  deleteSpeed: 40,
                }}
              />
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              custom={3}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#b45309" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/products")}
                className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium shadow-lg transition-all duration-300 border border-amber-500"
              >
                Explore Collections
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/contact")}
                className="px-8 py-4 bg-transparent text-white rounded-full font-medium border border-white/30 hover:border-white/70 transition-all duration-300"
              >
                Our Showrooms
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute -bottom-6 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-950 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </div>

      <motion.section
        className="relative py-20 lg:py-32 overflow-hidden"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("https://res.cloudinary.com/dmv1hs8b9/image/upload/v1742229643/4_zi5ydh.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            rotate: 360,
            transition: { repeat: Infinity, duration: 180, ease: "linear" },
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              variants={fadeInUpVariants}
              custom={0}
            >
              <motion.span
                className="block text-amber-700 dark:text-amber-300 text-sm uppercase tracking-widest mb-3 font-medium"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Legacy
              </motion.span>

              <h2 className="text-4xl md:text-5xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-6 leading-tight">
                Best Jewellers in <br />
                <span className="relative">
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

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                Nandani Jewellers has been a trusted name in the world of fine
                jewelry, offering an extensive range of high-quality diamond,
                gold, and silver jewelry. Located in the heart of Bettiah,
                Bihar, we specialize in crafting beautiful, timeless pieces
                designed for special occasions like weddings, engagements, and
                festivals. Our commitment to excellence has made us a preferred
                destination for those seeking exceptional value and
                craftsmanship in their jewelry.
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                Over two decades later, we&apos;ve evolved into a distinguished
                name in fine jewelry, celebrated for our uncompromising quality
                and distinctive designs. Our pieces don&apos;t simply adorn;
                they become treasured heirlooms, carrying stories across
                generations.
              </p>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              variants={scaleInVariants}
              custom={1}
            >
              <motion.div
                className="relative z-10 w-full h-[450px] rounded-lg overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={p1}
                  alt="Nandani Jewellers artisans at work"
                  className="w-full h-full object-fit"
                />
              </motion.div>

              <motion.div
                className="absolute -right-4 -bottom-4 w-full h-full border-2 border-amber-200 dark:border-amber-900 rounded-lg z-0"
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
        className="py-20 lg:py-32 "
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUpVariants}
            custom={0}
          >
            <span className="block text-amber-700 dark:text-amber-300 text-sm uppercase tracking-widest mb-3 font-medium">
              What Defines Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-6">
              Why Choose Nandani Jewellers?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Our collection includes meticulously crafted pieces such as
              Jhumkas, Tilahari malas, Ms Lari, Nathiyas, bangles, Kanganas,
              Tikas, lockets, chains, and necklace sets. Each item is designed
              with precision, ensuring both quality and elegance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        className="py-20 lg:py-32 relative overflow-hidden"
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

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            className="flex flex-col lg:flex-row-reverse items-center gap-12"
            variants={fadeInUpVariants}
          >
            <motion.div
              className="lg:w-1/2"
              variants={fadeInUpVariants}
              custom={0}
            >
              <span className="block text-amber-700 dark:text-amber-300 text-sm uppercase tracking-widest mb-3 font-medium">
                Our Commitment
              </span>

              <h2 className="text-4xl md:text-5xl font-serif font-medium text-amber-800 dark:text-amber-200 mb-6 leading-tight">
                Giving Back to <br />
                <span className="relative">
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

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                At Nandani Jewellers, our responsibility extends beyond creating
                beautiful jewelry. We believe in nurturing the communities and
                environment that sustain us.
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
                      <h4 className="text-lg font-medium text-amber-700 dark:text-amber-300 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              variants={scaleInVariants}
              custom={1}
            >
              <motion.div
                className="relative z-10 w-full h-[450px] rounded-lg overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img src={p2} className="w-full h-full object-fit" />
              </motion.div>

              <motion.div
                className="absolute -left-4 -bottom-4 w-full h-full border-2 border-amber-200 dark:border-amber-900 rounded-lg z-0"
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
        className="py-20"
        variants={fadeInUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl font-serif italic text-amber-800 dark:text-amber-300 my-6 leading-relaxed">
              Nandani Jewellers is owned and operated by Shri Muneshwar sir and
              Shri Yogesh sir , whose vision and dedication have played a
              pivotal role in shaping the brand&#39;s reputation for
              trustworthiness and excellence in the jewelry industry. Their
              passion for creating stunning jewelry and offering impeccable
              customer service drives every aspect of the business.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
