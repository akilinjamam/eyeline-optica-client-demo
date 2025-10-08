import React, { useState } from 'react';
import { powerTypes } from './productCategoryData';
import { ArrowLeft } from 'lucide-react';
import { ILense } from '@/ts-definition/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import PowerTypeSection from './PowerTypeSection';
import LenseTypeSection from './LenseTypeSection';
import LenseDetailSection from './LenseDetailSection';
import EnterPowerSection from './EnterPowerSection';
import UploadPrescription from './UploadPrescription';
import LneseFeatureSection from './LneseFeatureSection';

const SlideOptions = ({lens, setLensInfo}: {lens:ILense[], setLensInfo:() => void}) => {
   
    const [history, setHistory] = useState<Array<{ type: string; title?: string }>>([
    { type: 'powerTypes' }, 
  ]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [selectedLense, setSelectedLense] = useState<ILense | null>(null);

  const current = history[history.length - 1];
 
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
    if(next.title === "I don't know my power") return
    // if(next.title === 'Zero Power') return
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
        <div className="relative w-full overflow-hidden h-[60vh] border border-gray-200 rounded-md ">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current.type + (current.title ?? '')} // unique key per screen
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full h-full overflow-y-scroll hide-scrollbar py-2 bg-blue-200"
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
               <PowerTypeSection powerTypes={powerTypes} goForward={goForward}/>
              </>
            )}

            {current.type === 'lenses' && (
              <>
                <LenseTypeSection current={current} goForward={goForward} setSelectedLense={setSelectedLense} lens={lens} setLensInfo={setLensInfo}/>
              </>
            )}
            {/* Detail part */}
            {current.type === 'details' && (
              <div className="p-4">
                <LenseDetailSection goForward={goForward} />
              </div>
            )}
            {current.type === "Enter Power Manually" && (
              <>
                <EnterPowerSection/>
              </>
            )}
            {current.type === "Upload Prescription" && (
              <>
                <UploadPrescription/>
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

export default SlideOptions;