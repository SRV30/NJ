import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrivacyPolicies,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
} from "@/store/extra/privacyPolicySlice";
import { PencilIcon, TrashIcon, PlusIcon, SaveIcon } from "lucide-react";

const AdminPolicy = () => {
  const dispatch = useDispatch();
  const { policies, loading, error } = useSelector(
    (state) => state.privacyPolicy
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPolicy, setEditingPolicy] = useState(null);

  useEffect(() => {
    dispatch(fetchPrivacyPolicies());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPolicy) {
      dispatch(updatePrivacyPolicy({ id: editingPolicy._id, title, content }));
      setEditingPolicy(null);
    } else {
      dispatch(createPrivacyPolicy({ title, content }));
    }
    setTitle("");
    setContent("");
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setTitle(policy.title);
    setContent(policy.content);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      dispatch(deletePrivacyPolicy({ id }));
    }
  };

  const handleCancel = () => {
    setEditingPolicy(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300 pb-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-amber-900 dark:text-amber-200 border-b border-amber-200 dark:border-amber-800 pb-3">
          Privacy Policy Management
        </h1>

        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            {editingPolicy ? (
              <>
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit Policy
              </>
            ) : (
              <>
                <PlusIcon className="h-5 w-5 mr-2" />
                Create New Policy
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Policy Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Data Collection Policy"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-md bg-amber-50 dark:bg-slate-800 border-amber-200 dark:border-amber-900 focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-700 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Policy Content
              </label>
              <textarea
                id="content"
                placeholder="Enter policy details here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border rounded-md bg-amber-50 dark:bg-slate-800 border-amber-200 dark:border-amber-900 focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-700 focus:border-transparent min-h-32"
                required
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
              >
                {editingPolicy ? (
                  <>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Update Policy
                  </>
                ) : (
                  <>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Policy
                  </>
                )}
              </button>
              
              {editingPolicy && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 font-medium px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 mb-6 rounded">
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Existing Policies</h2>

              {policies.length === 0 ? (
                <div className="text-center py-8 bg-white dark:bg-slate-900 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">No policies found. Create your first policy above.</p>
                </div>
              ) : (
                policies.map((policy) => (
                  <div 
                    key={policy._id} 
                    className="bg-white dark:bg-slate-900 rounded-lg shadow p-5 hover:shadow-md transition-shadow duration-200"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-amber-900 dark:text-amber-200">{policy.title}</h3>
                    <div className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
                      {policy.content}
                    </div>
                    <div className="flex space-x-2 pt-2 border-t border-amber-100 dark:border-amber-900">
                      <button
                        onClick={() => handleEdit(policy)}
                        className="flex items-center justify-center px-3 py-1.5 rounded text-sm bg-amber-100 dark:bg-amber-900 hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(policy._id)}
                        className="flex items-center justify-center px-3 py-1.5 rounded text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPolicy;