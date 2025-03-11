import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAuthState, verifyOtp } from "@/store/auth-slice/user";
import { useNavigate } from "react-router-dom";
import MetaData from "../extras/MetaData";
import { showJewelryToast } from "../extras/showJewelryToast";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleVerifyOtp = () => {
    if (!email || !otp) {
      showJewelryToast("Please enter both email and OTP!", "error");
      return;
    }
    dispatch(verifyOtp({ email, otp }));
  };

  useEffect(() => {
    if (success && otp) {
      showJewelryToast("OTP Verified! Redirecting to Reset Password.", "success");

      localStorage.setItem("resetEmail", email);

      setTimeout(() => {
        navigate("/reset-password");
        dispatch(clearAuthState());
      }, 2000);
    }
    if (error) {
      showJewelryToast(error, "error");
    }
  }, [success, error, navigate, otp, dispatch, email]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch]);

  return (
    <>
      <MetaData title="Verify OTP - Nandani Jewellers" />

      {/* Verify OTP Card */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 px-4">
        <div className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-amber-800 dark:text-amber-300 text-center">
            Verify OTP
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            Enter the OTP sent to your email to reset your password.
          </p>

          <div className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-amber-500 bg-transparent text-amber-800 dark:text-amber-300"
            />

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-amber-500 bg-transparent text-amber-800 dark:text-amber-300"
            />
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full mt-4 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold rounded-lg transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
