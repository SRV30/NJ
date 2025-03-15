import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import MetaData from "./MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchFAQs } from "@/store/extra/faqSlice";
import Loader from "./Loader";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { faqs, error, loading } = useSelector((state) => state.faq);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950">
        <p className="text-amber-800 dark:text-amber-300 text-xl font-medium">
          {error}
        </p>
      </div>
    );
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 py-16 px-4 sm:px-6 lg:px-8"
    >
      <MetaData
        title="FAQs | Nandani Jewellers"
        description="Find answers to frequently asked questions about Nandani Jewellers, including payments, shipping, order tracking, and more."
        keywords="Nandani Jewellers FAQs, online shopping questions, payment methods, shipping details, order tracking, cancellation policy"
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-6"
          >
            <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400 mr-2" />
            <span className="h-px w-12 bg-amber-300 dark:bg-amber-700" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-extrabold text-amber-800 dark:text-amber-300 text-center mb-4 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-amber-700 dark:text-amber-400 text-lg max-w-2xl mx-auto"
          >
            Find answers to common questions about our jewelry, ordering
            process, and policies
          </motion.p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border border-amber-200 dark:border-amber-900 transform hover:shadow-amber-200/30 dark:hover:shadow-amber-700/20 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left text-xl font-medium text-amber-900 dark:text-amber-200 hover:text-amber-600 dark:hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 focus:ring-inset transition-colors duration-200"
              >
                <span className="pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-amber-500/70 dark:text-amber-500/70" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="px-6 pb-6 text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-slate-800/50"
                  >
                    <div className="pt-2 border-t border-amber-200 dark:border-amber-800/50">
                      <p className="leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-xl border border-amber-200 dark:border-amber-900 shadow-lg text-center"
        >
          <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-3">
            Still have questions?
          </h3>
          <p className="text-amber-700 dark:text-amber-400 text-lg mb-6">
            We&apos;re here to help with any questions you might have
          </p>
          <Link
            to="/contactus"
            className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-800 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQPage;
