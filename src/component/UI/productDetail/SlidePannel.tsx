// components/SlideInPanel.tsx
"use client";
import { GlassCardProps } from "@/ts-definition/interfaces";
import { motion } from "framer-motion";
import Image from "next/image";

const slideInVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

export default function SlideInPanel({ onClose, product }: { onClose: () => void, product: GlassCardProps }) {
  return (
    <motion.div
      className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-white shadow-lg z-50"
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
      <div className="p-1">
            <div className="w-full h-[200px]  mx-auto flex items-center justify-between">
            <div className="w-[50%] h-full bg-gray-200 flex items-center justify-center">
                <Image src={product.image} alt="single-img" />
            </div>
            <div className="w-[50%] h-[200px] p-1">
                <div className="flex justify-between font-bold">
                    <label htmlFor="">Price</label>
                    <p>{product.price}</p>
                </div>
                <br />
                <hr />
               <div className="flex justify-between font-bold">
                    <label htmlFor="">Total:</label>
                    <p>{product.price}</p>
                </div>
            </div>
      </div>

      {/* Your lens selection content goes here */}
        <div className="">
            
        </div>
      </div>
    </motion.div>
  );
}
