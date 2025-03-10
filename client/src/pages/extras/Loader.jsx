import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-amber-950/60 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="relative">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            borderRadius: ["50% 50%", "40% 60%", "50% 50%"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 border-4 border-transparent border-t-amber-400 border-r-amber-500 border-b-amber-500 rounded-full shadow-2xl"
        />
        <motion.div
          animate={{
            rotate: -180,
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-20 h-20 border-4 border-transparent border-l-amber-300 border-t-amber-300 rounded-full"
          style={{ marginTop: "-2px", marginLeft: "-2px" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
