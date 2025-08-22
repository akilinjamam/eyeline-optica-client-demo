'use client'
import { GlassCardProps, ILense, IPowerOptions, IPowerTypes } from '@/ts-definition/interfaces';
import Image from 'next/image';
import { lenses, powerOptions, powerTypes } from './productCategoryData';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SlideImageAndPriceDetail = ({ product }: { product: GlassCardProps }) => {
  const [history, setHistory] = useState<Array<{ type: string; title?: string }>>([
    { type: 'powerTypes' }, 
  ]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const current = history[history.length - 1];
  console.log(history) 
  console.log(current)

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

  const goForward = (next: { type: string; title?: string }) => {
    if(next.title === 'Frame Only') return
    setDirection('forward');
    setHistory((prev) => [...prev, next]);
  };

  const goBack = () => {
    if (history.length > 1) {
      setDirection('backward');
      setHistory((prev) => prev.slice(0, -1));
    }
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
      <div className="relative w-full overflow-hidden h-[60vh] border border-gray-200 rounded-md">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current.type + (current.title ?? '')} // unique key per screen
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full h-full overflow-y-scroll hide-scrollbar py-2 bg-white"
          >
            {/* Back Button (not on root) */}
            {history.length > 1 && (
              <button
                onClick={goBack}
                className="text-xs text-blue-600 underline m-2 cursor-pointer"
              >
                <ArrowLeft/>
              </button>
            )}

            {/* Render screens dynamically */}
            {current.type === 'powerTypes' && (
              <>
                {powerTypes.map((item: IPowerTypes, index: number) => (
                  <div
                    key={index}
                    onClick={() => goForward({ type: 'lenses', title: item.title })}
                    className="flex items-center justify-between p-1 bg-gray-100 hover:bg-gray-200 m-2 rounded-md cursor-pointer"
                  >
                    <p className="px-1 text-sm">{item.title}</p>
                    <ChevronRight />
                  </div>
                ))}
              </>
            )}

            {current.type === 'lenses' && (
              <>
                {lenses
                  .filter((l: ILense) => l.subType === current.title)
                  .map((item: ILense, index: number) => (
                    <div
                      key={index}
                      onClick={() => goForward({ type: 'details', title: item.title })}
                      className="flex items-center justify-between p-1 bg-gray-100 hover:bg-gray-200 m-2 rounded-md cursor-pointer"
                    >
                      <p className="px-1 text-sm">{item.title}</p>
                      <ChevronRight />
                    </div>
                  ))}
              </>
            )}

            {current.type === 'details' && (
              <div className="p-4">
                {
                    powerOptions.map((power:IPowerOptions, index:number) => {
                        return (
                            <div key={index} className='bg-gray-100 hover:bg-gray-200 my-2 rounded-md cursor-pointer flex items-center justify-between'>
                                <div>
                                    <p className='px-2 pb-3 font-bold'>{power.subTitle}</p>
                                
                                    <p className='px-2 pb-2 text-sm'>{power.description}</p>
                                </div>
                                <ChevronRight/>
                            </div>
                        )
                    })
                }
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SlideImageAndPriceDetail;
