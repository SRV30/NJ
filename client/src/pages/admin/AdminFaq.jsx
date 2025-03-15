import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "@/store/extra/faqSlice";
import { showJewelryToast } from "../extras/showJewelryToast";
import Loader from "../extras/Loader";
import ConfirmationModal from "../extras/ConfirmationModel";
import MetaData from "../extras/MetaData";

const AdminFaq = () => {
  const dispatch = useDispatch();
  const { faqs, error, loading } = useSelector((state) => state.faq);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateFAQ({ id: editId, faqData: { question, answer } })).then(
        () => {
          showJewelryToast("FAQ updated successfully", "success");
          setEditId(null);
        }
      );
    } else {
      dispatch(createFAQ({ question, answer })).then(() => {
        showJewelryToast("FAQ added successfully", "success");
      });
    }
    setQuestion("");
    setAnswer("");
  };

  const handleEdit = (faq) => {
    setEditId(faq._id);
    setQuestion(faq.question);
    setAnswer(faq.answer);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const confirmDelete = (id) => {
    setFaqToDelete(id);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteFAQ(faqToDelete)).then(() => {
      showJewelryToast("FAQ deleted successfully", "error");
      setIsModalOpen(false);
      setFaqToDelete(null);
    });
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setFaqToDelete(null);
  };

  return (
    <div className="bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300 min-h-screen p-8 rounded-lg">
      <MetaData title="Nandani Jewellers - Admin FAQs" />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-amber-200 dark:border-amber-800">
            <h2 className="text-2xl font-bold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Manage FAQs
            </h2>
          </div>

          {loading && (
            <div className="flex justify-center p-8">
              <Loader />
            </div>
          )}

          {error && (
            <div className="p-4 mb-6 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block font-medium">Question</label>
              <input
                type="text"
                placeholder="Enter FAQ question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 border border-amber-200 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Answer</label>
              <textarea
                placeholder="Enter detailed answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 border border-amber-200 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-slate-800 min-h-32 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              ></textarea>
            </div>

            <div className="flex justify-end">
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setQuestion("");
                    setAnswer("");
                  }}
                  className="px-4 py-2 mr-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className={`px-5 py-2 rounded-lg text-white transition-colors ${
                  editId
                    ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
                    : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                }`}
              >
                {editId ? "Update FAQ" : "Add FAQ"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-xl overflow-hidden">
          <div className="p-6 border-b border-amber-200 dark:border-amber-800">
            <h3 className="text-xl font-semibold">FAQ List</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-amber-50 dark:bg-slate-800">
                  <th className="py-3 px-4 text-left font-medium border-b border-amber-200 dark:border-amber-800">
                    Question
                  </th>
                  <th className="py-3 px-4 text-left font-medium border-b border-amber-200 dark:border-amber-800">
                    Answer
                  </th>
                  <th className="py-3 px-4 text-center font-medium border-b border-amber-200 dark:border-amber-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {faqs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      No FAQs available. Add your first FAQ above.
                    </td>
                  </tr>
                ) : (
                  faqs.map((faq) => (
                    <tr
                      key={faq._id}
                      className="border-b border-amber-100 dark:border-amber-900 hover:bg-amber-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <td className="py-4 px-4 align-top max-w-xs truncate">
                        {faq.question}
                      </td>
                      <td className="py-4 px-4 align-top max-w-sm">
                        <div className="line-clamp-2">{faq.answer}</div>
                      </td>
                      <td className="py-4 px-4 align-top text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(faq)}
                            className="p-2 bg-amber-100 dark:bg-amber-800/40 text-amber-800 dark:text-amber-300 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-800/70 transition-colors"
                            title="Edit FAQ"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => confirmDelete(faq._id)}
                            className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
                            title="Delete FAQ"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={handleDelete}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ? This action cannot be undone."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
      />
    </div>
  );
};

export default AdminFaq;
