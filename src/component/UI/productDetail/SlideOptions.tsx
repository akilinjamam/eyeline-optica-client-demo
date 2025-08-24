import React, { useState } from 'react';
import { lenses, powerOptions, powerTypes } from './productCategoryData';
import { ArrowLeft, ChevronRight, X } from 'lucide-react';
import { ILense, ILenseFeatures, IPowerOptions, IPowerTypes } from '@/ts-definition/interfaces';
import { AnimatePresence, motion } from 'framer-motion';

const SlideOptions = () => {
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
                    className="flex items-start justify-between p-1 bg-gray-100 hover:bg-gray-200 m-2 rounded-md cursor-pointer"
                  >
                    <div>
                        <p className="px-1 font-bold mb-4">{item.title}</p>
                        <p className='px-1 text-sm'>{item.description}</p>
                    </div>

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
                      onClick={() => {
                        if(item.subType === 'Zero Power') return
                        goForward({ type: 'details', title: item.title })
                      }}
                      className="flex items-start justify-between p-1 bg-gray-100 hover:bg-gray-200 m-2 rounded-md cursor-pointer"
                    >
                     <div className='w-[95%]'>
                         <p  className="px-1 font-bold mb-2">{item.title}</p>
                        {
                            item.features.map((feature: ILenseFeatures, index:number) => <p className='ml-3 text-sm' key={index}>{feature.feature}</p> )
                        }
                        <br />
                        <div className='flex items-center justify-between'>
                            <div onClick={(event) => {
                                 event.stopPropagation();
                                setSelectedLense(item)
                            }}  className='text-sm text-green-400 ml-3 flex items-center hover:bg-gray-300 rounded-md p-1'> 
                                <p>Details</p> 
                                <ChevronRight size={13}/>
                            </div>
                            <p className='text-sm font-bold text-orange-600'> ৳{item.price}</p>
                        </div>
                     </div>
                      <ChevronRight />
                    </div>
                  ))}
              </>
            )}
            {/* Detail part */}
            {current.type === 'details' && (
              <div className="p-4">
                {
                    powerOptions.map((power:IPowerOptions, index:number) => {
                        return (
                            <div onClick={() => goForward({type: power.subTitle, title: power.title})} key={index} className='bg-gray-100 hover:bg-gray-200 my-2 rounded-md cursor-pointer flex items-center justify-between'>
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
            {current.type === "Enter Power Manually" && (
              <>
                <div className='w-[98%] mx-2 rounded-md px-2 '>
                    <p className='font-semibold text-xl'>Enter Power Manually</p>
                    <br />
                    <div className='w-full bg-gray-100 rounded-md p-2'>
                        <p><span><input type="checkbox" name="" id="" /></span> I have same power for both eyes</p>
                        <br />
                        <p><span><input type="checkbox" name="" id="" /></span> I have cylindrical power</p>

                        <div className='grid grid-cols-3'>
                            <div>
                                <br />
                                <p className='font-semibold'>Power</p>
                                <br />
                                SPH
                            </div>
                            <div>
                                <br />
                                <p className='font-semibold'>LEFT (OS)</p>
                                <br />
                                <select style={{width:'90px'}} name="" id="" className='w-[100px] border border-gray-400 rounded-md p-1'>
                                    <option value="">Select</option>
                                </select>
                            </div>
                            <div>
                                <br />
                                <p className='font-semibold'>RIGHT (OD)</p>
                                 <br />
                                  <select style={{width:'90px'}} name="" id="" className='w-[100px] border border-gray-400 rounded-md p-1'>
                                      <option value="">Select</option>
                                  </select>
                            </div>
                        </div>
                    </div>
                    <br />
                    <p className='font-semibold text-xl'>Whose Prescription is this</p>
                    <div>
                        <br />
                        <input className='w-full rounded-md p-4 border border-gray-400' type="text" name="" id="" placeholder='Name *' />
                        <br /><br />
                        <input className='w-full rounded-md p-4 border border-gray-400' type="text" name="" id="" placeholder='Phone Number *' />
                    </div>
                    <div className='w-full text-center mt-6 text-green-800'>
                        <p>Can’t find your power, Call +8801 99088765675</p>
                    </div>
                </div>
              </>
            )}
            {current.type === "Upload Prescription" && (
              <>
                Upload Prescription
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">{selectedLense.title}</h2>
              <button className='cursor-pointer' onClick={() => {
                setSelectedLense(null)
              }}>
                <X/>
              </button>
            </div>
            {selectedLense.features.map((feature: ILenseFeatures, idx: number) => (
              <p key={idx} className="text-sm mb-2">
                - {feature.feature}
              </p>
            ))}
            <p className="font-bold text-orange-600 mt-4">৳{selectedLense.price}</p>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    );
};

export default SlideOptions;