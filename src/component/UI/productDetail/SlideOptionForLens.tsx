import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ILense } from '@/ts-definition/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import LenseDetailSection from './LenseDetailSection';
import UploadPrescription from './UploadPrescription';
import LneseFeatureSection from './LneseFeatureSection';
import SubmitPowerLater from '@/component/SubmitPowerLater';
import EnterPowerSectionForLens from './EnterPowerSectionForLens';

const SlideOptionsForLens = ({singleLens}: {singleLens:ILense}) => {
   console.log(singleLens)
    const [history, setHistory] = useState<Array<{ type: string; title?: string }>>([
    { type: 'details' }, 
  ]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [selectedLense, setSelectedLense] = useState<ILense | null>(null);

  const current = history[history.length - 1];
  console.log(current);

   const LensWithPowerItems = {
      lensId:singleLens._id,
      type: "lens",
      quantity: 1,
      unitPrice: singleLens.salesPrice,
      subtotal: singleLens.salesPrice,
  }
 
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
        <div className="relative w-full overflow-hidden h-[100vh] border border-gray-200 rounded-md ">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current.type + (current.title ?? '')} // unique key per screen
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full h-full overflow-y-scroll hide-scrollbar py-2 bg-blue-100"
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

            
            {/* Detail part */}
            {current.type === 'details' && (
              <div className="p-2">
                <LenseDetailSection goForward={goForward} />
              </div>
            )}
            {current.type === "Enter Power Manually" && (
              <>
                <EnterPowerSectionForLens singleLens={singleLens}/>
              </>
            )}
            {current.type === "Upload Prescription" && (
              <>
                <UploadPrescription cartInfo={LensWithPowerItems}/>
              </>
            )}
            
            
            {current.type === "Submit Power later in 15 days" && (
              <>
                <SubmitPowerLater cartInfo={LensWithPowerItems}/>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      {/* Bottom Sheet Details */}
      <AnimatePresence>
        {selectedLense && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 w-full h-[100%] bg-black/20 backdrop-blur-sm rounded-md-2xl shadow-lg z-50 p-4 overflow-y-scroll hide-scrollbar"
          >
            <LneseFeatureSection selectedLense={selectedLense} setSelectedLense={setSelectedLense}/>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    );
};

export default SlideOptionsForLens;