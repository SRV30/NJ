import { motion } from "framer-motion";
import Loader from "./Loader";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "./MetaData";
import { useEffect } from "react";
import { fetchTerms } from "@/store/extra/termsSlice";
import { Link } from "react-router-dom";

const Section = ({ title, content, lastUpdated }) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white/90 dark:bg-slate-900/90 shadow-xl rounded-xl p-8 transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-amber-200 dark:border-amber-900 mb-8 backdrop-blur-sm"
    >
      <h2 className="text-2xl font-semibold text-amber-800 dark:text-amber-300 mb-4 border-b border-amber-400 dark:border-amber-700 pb-2 capitalize flex items-center">
        <span className="inline-block w-2 h-8 bg-amber-500 dark:bg-amber-600 mr-3 rounded-full"></span>
        {title}
      </h2>
      <p className="text-amber-900 dark:text-amber-200 leading-relaxed mb-6 text-lg">
        {content}
      </p>
      <div className="flex items-center justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-amber-600 dark:text-amber-500 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
          Last Updated:{" "}
          <span className="ml-1">
            {new Date(lastUpdated).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

const TermsAndServices = () => {
  const { policies, loading, error } = useSelector((state) => state.terms);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTerms());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  let latestUpdated = null;
  if (policies && policies.length > 0) {
    latestUpdated = new Date(
      Math.max(...policies.map((policy) => new Date(policy.lastUpdated)))
    );
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 py-16 px-6 sm:px-12 lg:px-16"
    >
      <MetaData title="Terms & Conditions | Nandani Jewellers" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="h-1 w-24 bg-amber-500 dark:bg-amber-600 mx-auto mb-2"></div>
            <div className="h-1 w-16 bg-amber-400 dark:bg-amber-700 mx-auto"></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-extrabold text-amber-800 dark:text-amber-300 text-center mb-4 tracking-tight"
          >
            Terms & Conditions
          </motion.h1>

          {latestUpdated && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center text-amber-700 dark:text-amber-400 text-sm mb-4"
            >
              Last Updated:{" "}
              <span className="font-medium">
                {latestUpdated.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="max-w-2xl mx-auto text-amber-700 dark:text-amber-400"
          >
            Please read these terms carefully before using our services. By
            accessing or using Nandani Jewellers services, you agree to be bound
            by these terms and conditions.
          </motion.p>
        </div>

        {loading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
          >
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}

        {!loading && !error && policies && policies.length > 0 ? (
          <div className="space-y-8">
            {policies.map((policy) => (
              <Section
                key={policy._id}
                title={policy.title}
                content={policy.content}
                lastUpdated={policy.lastUpdated}
              />
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
            >
              <p className="text-amber-700 dark:text-amber-400">
                No policies available at this time. Please check back later.
              </p>
            </motion.div>
          )
        )}

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
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-800 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TermsAndServices;
