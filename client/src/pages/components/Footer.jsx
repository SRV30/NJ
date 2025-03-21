import { motion } from "framer-motion";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Logo from "../../assets/Logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hover: { scale: 1.3, rotate: 10, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  return (
    <footer className="bg-gradient-to-r from-amber-100/90 to-amber-200/90 dark:from-amber-900 dark:via-amber-900 dark:to-amber-900 text-amber-100 px-6 py-12 lg:px-12 lg:py-16 absolte overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.1) 5%, transparent 15%)",
          backgroundSize: "300% 300%",
          opacity: 0.3,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col space-y-5 items-center md:items-start text-center md:text-left"
        >
          <img
            src={Logo}
            alt="Nandani Jewellers Logo"
            className="h-14 lg:h-16 w-auto"
          />

          <p className="text-amber-800 dark:text-amber-300 text-sm lg:text-base font-sans tracking-wider max-w-sm">
            Crafting elegance since 2002. Discover the art of luxury with{" "}
            <span className="font-medium">Nandani Jewellers</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-4 text-center md:text-left ">
          {[
            {
              title: "Collections",
              links: ["New Arrivals", "Best Sellers", "All Jewels"],
              hrefs: ["/products", "/products?type=bestseller", "/products"],
            },
            {
              title: "Our Story",
              links: ["About Us", "Photo Gallery"],
              hrefs: ["/about", "/photo"],
            },
            {
              title: "Help",
              links: ["FAQ", "Contact Us"],
              hrefs: ["/faqs", "/contact"],
            },
            {
              title: "Policies",
              links: ["Privacy", "Terms"],
              hrefs: ["/privacy-policy", "/terms"],
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-sans text-base lg:text-lg font-semibold text-amber-900 dark:text-amber-400 mb-4 uppercase tracking-widest">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5, color: "#fff" }}
                    transition={{ duration: 0.3 }}
                  >
                    <a
                      href={section.hrefs[i]}
                      className="text-amber-800 dark:text-amber-300 text-sm lg:text-base hover:text-amber-600 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto mt-10 pt-8 border-t border-amber-400/40 dark:border-gray-600/40 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-sm lg:text-base relative z-10"
      >
        <motion.p
          variants={itemVariants}
          className="text-amber-900 dark:text-amber-300"
        >
          © {currentYear} Nandani Jewellers. All Rights Reserved.
          <span className="mx-2 md:mx-3">•</span>
          <a
            href="/privacy-policy"
            className="hover:text-amber-600 transition-colors duration-300"
          >
            Privacy
          </a>
          <span className="mx-2 md:mx-3">•</span>
          <a
            href="/terms"
            className="hover:text-amber-600 transition-colors duration-300"
          >
            Terms
          </a>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex space-x-5 mt-6 md:mt-0   md:mr-30"
        >
          {[
            {
              Icon: FaFacebook,
              link: "https://www.facebook.com/NANDANIJEWELLERS",
            },
            { Icon: FaInstagram, link: "https://www.instagram.com/nandaninj" },
          ].map(({ Icon, link }, index) => (
            <motion.a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="p-2 rounded-full bg-amber-700/60 dark:bg-gray-700/60 text-amber-100 hover:bg-amber-800 dark:hover:bg-gray-600 shadow-lg transition-all duration-300 border border-amber-300/20 dark:border-gray-500/20"
            >
              <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
