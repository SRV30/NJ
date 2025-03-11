import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAuthState, resetPassword } from "@/store/auth-slice/user";
import { useNavigate } from "react-router-dom";
import MetaData from "../extras/MetaData";
import { showJewelryToast } from "../extras/showJewelryToast";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      showJewelryToast("Invalid request! Please verify OTP first.", "error");
      navigate("/verify-otp");
    }
  }, [navigate]);

  const handleResetPassword = () => {
    if (!email || !newPassword || !confirmPassword) {
      showJewelryToast("All fields are required!", "error");
      return;
    }
    if (newPassword.length < 8) {
      showJewelryToast("Password must be at least 8 characters!", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showJewelryToast("Passwords do not match!", "error");
      return;
    }
    dispatch(resetPassword({ email, newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (success) {
      showJewelryToast(
        "Password updated successfully! Redirecting to login...",
        "success"
      );
      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    if (error) {
      showJewelryToast(error, "error");
    }
  }, [success, error, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch]);

  return (
    <>
      <MetaData title="Reset Password - Nandani Jewellers" />

      {/* Reset Password Card */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 px-4">
        <div className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-amber-800 dark:text-amber-300 text-center">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            Enter a new password for your account.
          </p>

          <div className="mt-6 space-y-4">
            <input
              type="email"
              value={email}
              readOnly
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            />

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-amber-500 bg-transparent text-amber-800 dark:text-amber-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-400"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-amber-500 bg-transparent text-amber-800 dark:text-amber-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full mt-4 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold rounded-lg transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
