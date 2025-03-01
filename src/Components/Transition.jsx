import { motion } from "framer-motion";

const Transition = ({ onAnimationComplete }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onAnimationComplete}
      className="fixed top-0 left-0 w-full h-full bg-black z-50"
    />
  );
};

export default Transition;
