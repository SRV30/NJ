import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showJewelryToast } from "../extras/showJewelryToast";
import { motion } from "framer-motion";
import { updatePassword } from "@/store/auth-slice/user";
import { Eye, EyeOff } from "lucide-react";
import MetaData from "../extras/MetaData";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      showJewelryToast("Passwords do not match!", "error");
      return;
    }
    dispatch(updatePassword(form))
      .unwrap()
      .then((message) => showJewelryToast(message, "success"))
      .catch((error) => showJewelryToast(error, "error"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300">
      <MetaData title="Update Password | Nandani Jewellers" />
      <motion.div
        className="w-full max-w-lg p-8 bg-white dark:bg-slate-950 backdrop-blur-lg rounded-3xl shadow-lg border border-amber-300 dark:border-amber-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Update Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {["oldPassword", "newPassword", "confirmPassword"].map(
            (field, idx) => (
              <motion.div
                key={field}
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  className="w-full px-5 py-3 bg-white/30 dark:bg-slate-800 border border-amber-400 dark:border-amber-700 rounded-xl text-lg placeholder:text-amber-600 dark:placeholder:text-amber-400 focus:ring-2 focus:ring-amber-500 transition-all pr-12"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 dark:text-amber-400"
                  onClick={() => togglePasswordVisibility(field)}
                >
                  {showPassword[field] ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </motion.div>
            )
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white text-lg font-semibold rounded-xl shadow-lg transform active:scale-95 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Updating..." : "Update Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdatePassword;
