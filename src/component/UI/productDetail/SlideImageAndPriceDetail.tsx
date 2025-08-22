'use client'
import { GlassCardProps, ILense, IPowerTypes } from '@/ts-definition/interfaces';
import Image from 'next/image';
import { lenses, powerTypes } from './productCategoryData';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SlideImageAndPriceDetail = ({ product }: { product: GlassCardProps }) => {
  const [subCategory, setSubCategory] = useState<string>('');
  const [showSecond, setShowSecond] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const filterLense = lenses.filter((item: ILense) => item.subType === subCategory);

  // Variants depending on direction
  const variants = {
    enter: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div className="p-2">
      {/* top section */}
      <div className="w-full h-[200px] mx-auto flex items-center">
        <div className="w-[40%] h-full bg-gray-200 flex items-center justify-center">
          <Image src={product.image} alt="single-img" width={150} height={150} />
        </div>
        <div className="w-[60%] h-[200px] p-1">
          <div className="flex justify-between font-bold text-sm">
            <label>Price</label>
            <p>{product.price}</p>
          </div>
          <div className="flex justify-between font-bold text-sm">
            <label>Total:</label>
          </div>
        </div>
      </div>

      <br />

      {/* Sliding container */}
      <div className="relative w-full overflow-hidden h-[60vh]  rounded-md">
        <AnimatePresence custom={direction} mode="popLayout">
          {!showSecond ? (
            // ------- DIV-1 -------
            <motion.div
              key="div1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="absolute top-0 left-0 w-full h-full overflow-y-scroll py-2 bg-white"
            >
              {powerTypes.map((item: IPowerTypes, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setSubCategory(item.title);
                    setDirection('forward');
                    setShowSecond(true);
                  }}
                  className="flex items-center justify-between p-1 bg-gray-100 m-2 hover:bg-gray-200 rounded-md cursor-pointer"
                >
                  <p className="px-1 text-sm">{item.title}</p>
                  <ChevronRight />
                </div>
              ))}
            </motion.div>
          ) : (
            // ------- DIV-2 -------
            <motion.div
              key="div2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="absolute top-0 left-0 w-full h-full overflow-y-scroll py-2 bg-white"
            >
              <button
                onClick={() => {
                  setDirection('backward');
                  setShowSecond(false);
                }}
                className="text-xs text-blue-600 underline m-2"
              >
                <ArrowLeft className='cursor-pointer'/>
              </button>
              {filterLense.map((item: ILense, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-1 bg-gray-100 hover:bg-gray-200 m-2 rounded-md cursor-pointer"
                >
                  <p className="px-1 text-sm">{item.title}</p>
                  <ChevronRight />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SlideImageAndPriceDetail;
