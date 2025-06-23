"use client";
import { motion } from "framer-motion";
import React from "react";

type HoverTextProps = {
  label: string;
  url: string;
  minWidth?: number;
};

export default function HoverText({ label, url, minWidth = 100 }: HoverTextProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative h-6 flex items-center overflow-hidden group"
      style={{ minWidth }}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.span
        className="absolute left-0 w-full text-center"
        variants={{
          rest: { y: 0, opacity: 1 },
          hover: { y: 24, opacity: 0 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {label}
      </motion.span>
      <motion.span
        className="absolute left-0 w-full text-center"
        variants={{
          rest: { y: -24, opacity: 0 },
          hover: { y: 0, opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
}