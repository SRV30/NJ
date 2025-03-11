import { getContactForms } from "@/store/extra/getintouchSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import MetaData from "../extras/MetaData";
import Loader from "../extras/Loader";

const AdminContact = () => {
  const dispatch = useDispatch();

  const contactFetch = useSelector((state) => state.contact);
  const { loading, error, contacts } = contactFetch;

  useEffect(() => {
    dispatch(getContactForms());
  }, [dispatch]);

  const limitedContacts = contacts
    ? contacts.slice(0, 50).sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300 py-12 px-4 sm:px-6 lg:px-8">
      <MetaData title="Customer Inquiries | Admin Dashboard" />

      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-amber-200 dark:border-amber-900 overflow-hidden"
          variants={titleVariants}
        >
          <div className="border-b border-amber-200 dark:border-amber-800 px-6 py-4">
            <motion.h2
              className="font-serif font-extrabold text-3xl text-center bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-300 dark:to-amber-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Customer Inquiries
            </motion.h2>
          </div>

          <div className="p-6">
            {loading && (
              <motion.div
                className="flex justify-center items-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader />
              </motion.div>
            )}

            {error && (
              <motion.div
                className="text-center text-red-500 dark:text-red-400 py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                There was an error loading the inquiries. Please try again.
              </motion.div>
            )}

            {!loading && limitedContacts.length > 0 ? (
              <motion.div variants={containerVariants} className="space-y-6">
                <motion.h3
                  className="font-serif text-2xl text-center mb-8 text-amber-700 dark:text-amber-400"
                  variants={titleVariants}
                >
                  Latest Customer Messages
                </motion.h3>

                <motion.ul className="space-y-6" variants={containerVariants}>
                  {limitedContacts.map((contact) => (
                    <motion.li
                      key={contact.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 rounded-lg shadow-lg overflow-hidden border border-amber-200 dark:border-amber-800"
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                          <h4 className="font-serif font-bold text-xl text-amber-800 dark:text-amber-300">
                            {contact.name}
                          </h4>
                          <p className="text-amber-600 dark:text-amber-500 text-sm">
                            {new Date(contact.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <p className="text-amber-700 dark:text-amber-400">
                            <span className="font-medium">Email:</span>{" "}
                            <span className="text-amber-600 dark:text-amber-500">
                              {contact.email}
                            </span>
                          </p>
                          <p className="text-amber-700 dark:text-amber-400">
                            <span className="font-medium">Phone:</span>{" "}
                            <span className="text-amber-600 dark:text-amber-500">
                              {contact.phone}
                            </span>
                          </p>
                        </div>

                        <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg border border-amber-100 dark:border-amber-900">
                          <p className="text-amber-700 dark:text-amber-400">
                            <span className="font-medium">Message:</span>{" "}
                            <span className="text-amber-600 dark:text-amber-500 italic">
                              {contact.message}
                            </span>
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ) : (
              !loading && (
                <motion.p
                  className="text-center py-12 text-amber-600 dark:text-amber-400 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  No customer inquiries found.
                </motion.p>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-amber-600 dark:text-amber-500">
            Showing the latest {limitedContacts.length} inquiries • Admin
            Dashboard
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminContact;
