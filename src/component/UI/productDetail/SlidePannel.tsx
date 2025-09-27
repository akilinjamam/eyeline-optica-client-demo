// components/SlideInPanel.tsx
"use client";
import { motion } from "framer-motion";
import SlideImageAndPriceDetail from "./SlideImageAndPriceDetail";
import { TFrame } from "@/ts-definition/types";

const slideInVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

export default function SlideInPanel({ onClose, product }: { onClose: () => void, product: TFrame }) {
  return (
    <motion.div
      className="fixed top-0 right-0 w-full md:w-2/5 h-full bg-white shadow-lg z-50"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideInVariants}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Select Your Lens</h2>
        <button onClick={onClose} className="text-xl cursor-pointer">✕</button>
      </div>
      <br />
      <SlideImageAndPriceDetail product={product} />
    </motion.div>
  );
}
