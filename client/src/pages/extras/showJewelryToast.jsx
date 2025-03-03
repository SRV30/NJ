import { toast } from "react-toastify";
import { Gem, BellRing, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

// Import success sound (used for all notifications)
import successSound from "../../assets/success.mp3";

const playNotificationSound = () => {
  const sound = new Audio(successSound);
  sound.volume = 0.5;
  sound.play().catch((err) => console.warn("Audio playback failed:", err));
};

export const showJewelryToast = (message, type = "success") => {
  playNotificationSound();

  toast(
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -5, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border-2 ${
        type === "success"
          ? "border-yellow-500 bg-yellow-50/90 text-yellow-900"
          : type === "error"
          ? "border-red-500 bg-red-50/90 text-red-900"
          : "border-orange-500 bg-orange-50/90 text-orange-900"
      } backdrop-blur-lg`}
    >
      {/* Animated Icon */}
      <motion.div
        className="p-3 rounded-full bg-white shadow-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {type === "success" ? (
          <Gem className="text-yellow-500 w-7 h-7 drop-shadow-md" />
        ) : type === "error" ? (
          <BellRing className="text-red-500 w-7 h-7 drop-shadow-md" />
        ) : (
          <AlertTriangle className="text-orange-500 w-7 h-7 drop-shadow-md" />
        )}
      </motion.div>

      {/* Message */}
      <p className="font-semibold text-sm sm:text-base">{message}</p>

      {/* Soft Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-white opacity-5 pointer-events-none"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>,
    {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }
  );
};
