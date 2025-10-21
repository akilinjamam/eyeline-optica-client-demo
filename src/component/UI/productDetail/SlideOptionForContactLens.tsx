/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ILense } from '@/ts-definition/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import LenseDetailSection from './LenseDetailSection';
import UploadPrescription from './UploadPrescription';
import SubmitPowerLater from '@/component/SubmitPowerLater';
import ContactLensPowerOption from './ContactLensPowerOptions';
// import WithoutPowerContactLens from './WithoutPowerContactLens';
import ContactLensAccessories from './ContactLensAccessories';
import ZeroPowerContactLens from './ZeroPowerContactLens';
import EnterPowerSectionForContactLens from './EnterPowerSectionForContactLens';
import FilteredAccessories from './FilteredAccessories';
import { TAccessory } from '@/ts-definition/types';
import { TAccessoryInfo } from './SlideImageAndPriceDetailForContactLens';
import AccessoryFeatureSection from './AccessoryFeatureSection';
import LenseDetailSectionWithAccessory from './LensDetailSectionWithAccessory';
import EnterPowerSectionForContactLensAndAccessories from './EnterPowerSectionForContactLensAndAccessories';

const SlideOptionsForContactLens = ({singleLens, allAccessory, selectAccessory, setSelectAccessory}: {singleLens:ILense, allAccessory:TAccessory[], selectAccessory:TAccessoryInfo, setSelectAccessory: any}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [history, setHistory] = useState<Array<{ type: string; title?: string }>>([
    { type: 'powerType' }, 
  ]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');


  const current = history[history.length - 1];
  console.log(current);

   const contactLensItems = {
      contactLensId:singleLens._id,
      type: "contact_lens",
      quantity: 1,
      unitPrice: singleLens.salesPrice,
      subtotal: singleLens.salesPrice,
  }

  const contactLensWithAccessory = {
      contactLensId:singleLens._id,
      accessoryId: selectAccessory?.id,
      type: "contact_lens_with_accessory",
      quantity: 1,
      unitPrice: Number(singleLens.salesPrice ?? 0) + Number(selectAccessory?.total ?? 0),
      subtotal: Number(singleLens.salesPrice ?? 0) + Number(selectAccessory?.total ?? 0)
  }

  console.log(contactLensWithAccessory)
 
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

            
            {/* Detail part */}
            {current.type === 'powerType' && (
              <div className="p-4">
                <ContactLensPowerOption goForward={goForward} />
              </div>
            )}
            {current.type === 'with power' && (
              <div className="p-4">
                <ContactLensAccessories goForward={goForward} current={current as any}/>
              </div>
            )}
            {current.type === 'without power' && (
              <div className="p-4">
                    <ContactLensAccessories goForward={goForward} current={current as any}/>
              </div>
            )}
            {current.type === "Enter Power Manually" && (
              <>
                <EnterPowerSectionForContactLens singleLens={singleLens}/>
              </>
            )}
            {(current.type === "details" && current.title === "Enter Power Manually") && (
              <>
                <EnterPowerSectionForContactLensAndAccessories singleLens={singleLens} singleAccessory={selectAccessory}/>
              </>
            )}
            {current.type === "Upload Prescription" && (
              <>
                <UploadPrescription cartInfo={contactLensItems}/>
              </>
            )}
            
            {(current.type === "details" && current.title === "Upload Prescription") && (
              <>
                <UploadPrescription cartInfo={contactLensWithAccessory}/>
              </>
            )}
            
            
            {current.type === "Submit Power later in 15 days" && (
              <>
                <SubmitPowerLater cartInfo={contactLensItems}/>
              </>
            )}
            {(current.type === "details" && current.title === "Submit Power later in 15 days") && (
              <>
                <SubmitPowerLater cartInfo={contactLensWithAccessory}/>
              </>
            )}
            {(current.title === "with power and accessories" && current.type === "Only Contact Lens" ) && (
              <>
                <LenseDetailSection goForward={goForward}/>
              </>
            )}
            {(current.type === "details" && current.title === "with power and accessories" ) && (
              <>
                <LenseDetailSectionWithAccessory goForward={goForward}/>
              </>
            )}
            {(current.type === "details" && current.title === "without power and accessories" ) && (
             <>
                <ZeroPowerContactLens cartInfo={contactLensWithAccessory}/>
              </>
            )}
            {(current.title === "without power and accessories" && current.type === "Only Contact Lens" ) && (
              <>
                <ZeroPowerContactLens cartInfo={contactLensItems}/>
              </>
            )}
            {(current.title === "with power and accessories" && current.type !== "Only Contact Lens" ) && (
              <>
                <FilteredAccessories current={current as any}  goForward={goForward} allAccessory={allAccessory} setSelectAccessory={setSelectAccessory} setOpen={setOpen}/>
              </>
            )}
            {(current.title === "without power and accessories" && current.type !== "Only Contact Lens" ) && (
              <>
                <FilteredAccessories current={current as any}  goForward={goForward} allAccessory={allAccessory} setSelectAccessory={setSelectAccessory} setOpen={setOpen}/>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      {/* Bottom Sheet Details */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 w-full h-[100%] bg-black/20 backdrop-blur-sm rounded-md-2xl shadow-lg z-50 p-4 overflow-y-scroll hide-scrollbar"
          >
            <AccessoryFeatureSection selectedAccessory={selectAccessory} setSelectedAccessory={setSelectAccessory} setOpen={setOpen}/>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    );
};

export default SlideOptionsForContactLens;