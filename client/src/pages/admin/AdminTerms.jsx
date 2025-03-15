import {
    createTerms,
    deleteTerms,
    fetchTerms,
    updateTerms,
  } from "@/store/extra/termsSlice";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { showJewelryToast } from "../extras/showJewelryToast";
  
  const AdminTerms = () => {
    const dispatch = useDispatch();
    const { policies, loading, error, success } = useSelector(
      (state) => state.terms
    );
  
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingPolicy, setEditingPolicy] = useState(null);
  
    useEffect(() => {
      dispatch(fetchTerms());
    }, [dispatch]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingPolicy) {
        dispatch(updateTerms({ id: editingPolicy._id, title, content }));
        setEditingPolicy(null);
      } else {
        dispatch(createTerms({ title, content }));
      }
      setTitle("");
      setContent("");
  
      if (success) {
        showJewelryToast("Terms updated successfully", "success");
      }
    };
  
    const handleEdit = (policy) => {
      setEditingPolicy(policy);
      setTitle(policy.title);
      setContent(policy.content);
    };
  
    const handleDelete = (id) => {
      dispatch(deleteTerms({ id }));
    };
  
    return (
      <div className="bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800 pb-3">
            Manage Terms & Conditions
          </h2>
  
          <form onSubmit={handleSubmit} className="space-y-5 mb-8">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">
                Terms Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter title for terms"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-amber-300 dark:border-amber-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50 dark:bg-slate-800 text-amber-800 dark:text-amber-200"
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">
                Terms Content
              </label>
              <textarea
                id="content"
                placeholder="Enter terms content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-amber-300 dark:border-amber-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50 dark:bg-slate-800 text-amber-800 dark:text-amber-200 min-h-32"
                required
              />
            </div>
            
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
            >
              {editingPolicy ? "Update Terms" : "Create Terms"}
            </button>
          </form>
  
          {loading && (
            <div className="flex justify-center my-6">
              <div className="animate-pulse text-amber-600 dark:text-amber-400">Loading...</div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 my-4 rounded">
              <p>{error}</p>
            </div>
          )}
  
          <div className="space-y-6">
            {policies.length === 0 && !loading ? (
              <div className="text-center py-8 text-amber-700 dark:text-amber-400">
                No terms and conditions found. Create your first one above.
              </div>
            ) : (
              policies.map((policy) => (
                <div
                  key={policy._id}
                  className="bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-amber-800 rounded-lg p-6 transition-all hover:shadow-md"
                >
                  <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-300 mb-3">
                    {policy.title}
                  </h3>
                  <div className="text-amber-700 dark:text-amber-400 mb-4 prose dark:prose-invert max-w-none">
                    <p>{policy.content}</p>
                  </div>
                  <div className="flex items-center justify-end space-x-3 pt-3 border-t border-amber-200 dark:border-amber-800">
                    <button
                      onClick={() => handleEdit(policy)}
                      className="flex items-center text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(policy._id)}
                      className="flex items-center text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminTerms;