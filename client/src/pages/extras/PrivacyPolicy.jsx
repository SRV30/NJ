import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivacyPolicies } from "@/store/extra/privacyPolicySlice";
import Loader from "./Loader";
import MetaData from "./MetaData";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const { policies, loading, error } = useSelector(
    (state) => state.privacyPolicy
  );

  useEffect(() => {
    dispatch(fetchPrivacyPolicies());
  }, [dispatch]);

  let latestUpdated = null;
  if (policies && policies.length > 0) {
    latestUpdated = new Date(
      Math.max(...policies.map((policy) => new Date(policy.lastUpdated)))
    );
  }

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 flex items-center justify-center">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg p-6 max-w-md w-full border-l-4 border-red-500">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Error Occurred
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
          <button
            onClick={() => dispatch(fetchPrivacyPolicies())}
            className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors duration-200 inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950">
      <MetaData title="Privacy Policy| Nandani Jewellers" />
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-300 mb-3">
            Privacy Policies
          </h1>
          <div className="w-20 h-1 bg-amber-600 dark:bg-amber-500 mx-auto rounded-full "></div>
          {latestUpdated && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center text-amber-700 dark:text-amber-400 text-sm mb-4 mt-5"
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

          <p className="mt-4 text-amber-700 dark:text-amber-400 max-w-xl mx-auto">
            Our commitment to protecting your data and respecting your privacy
          </p>
        </header>

        {policies.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg p-8 text-center border border-amber-200 dark:border-amber-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-amber-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg text-amber-800 dark:text-amber-300">
              No privacy policies found.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {policies.map((policy) => (
              <div
                key={policy._id}
                className="bg-white dark:bg-slate-900 shadow-lg rounded-lg overflow-hidden border-l-4 border-amber-500 dark:border-amber-600 transition-all hover:shadow-xl group"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-300 group-hover:text-amber-600 dark:group-hover:text-amber-200 transition-colors capitalize">
                    {policy.title}
                  </h2>
                  <div className="prose max-w-none text-amber-800 dark:text-amber-300 opacity-90">
                    <p className="line-clamp-4">{policy.content}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-slate-800 dark:to-slate-900 py-3 px-6 flex justify-between items-center">
                  <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Last Updated:{" "}
                    <span className="font-medium ml-1">
                      {new Date(policy.lastUpdated).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-16 text-center text-amber-700 dark:text-amber-400 text-sm bg-white dark:bg-slate-900 py-6 px-8 rounded-lg shadow-md border-t-2 border-amber-200 dark:border-amber-800">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p>
              If you have any questions about our policies, please contact our
              support team.
            </p>
            <a
              href="/contactus"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors duration-200 inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
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
              Contact Us
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
