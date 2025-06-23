import { motion } from "framer-motion";
import React from "react";

interface InvertHoverProps {
  active: boolean;
}

const InvertHover: React.FC<InvertHoverProps> = ({ active }) => (
  <motion.div
    initial={false}
    animate={{
      scaleY: active ? 1 : 0,
      opacity: active ? 1 : 1,
    }}
    transition={{
      scaleY: {
        duration: active ? 0 : 0.25,
        ease: "easeInOut",
      },
      opacity: active
        ? { duration: 0.1, ease: "easeIn" }
        : { duration: 0, ease: "linear" },
    }}
    className="absolute inset-0 bg-white z-0 origin-bottom"
    style={{ scaleY: active ? 1 : 0 }}
  />
);

export default InvertHover;