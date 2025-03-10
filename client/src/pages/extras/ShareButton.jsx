import { useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";

const ShareButton = ({
  title = "Check this out!",
  text = "Check out this amazing item!",
  url = window.location.href,
  className = "",
  size = "medium",
  variant = "amber",
  shape = "pill",
}) => {
  const [copied, setCopied] = useState(false);

  const variantStyles = {
    amber: "bg-gradient-to-r from-amber-100 to-amber-300 hover:from-amber-200 hover:to-amber-300 text-amber-800 border-amber-500",
  };

  const sizeStyles = {
    small: "text-xs py-2 px-3",
    medium: "text-sm py-3 px-4",
    large: "text-base py-4 px-6",
  };

  const shapeStyles = {
    rounded: "rounded-lg",
    pill: "rounded-full",
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleShare}
        className={`flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${shapeStyles[shape]} ${className}`}
      >
        <svg
          className={size === "small" ? "w-4 h-4" : size === "large" ? "w-6 h-6" : "w-5 h-5"}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tooltipVariants}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md mb-1 whitespace-nowrap"
          >
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ✅ Add PropTypes for type validation
ShareButton.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["amber"]),
  shape: PropTypes.oneOf(["rounded", "pill"]),
};

export default ShareButton;
