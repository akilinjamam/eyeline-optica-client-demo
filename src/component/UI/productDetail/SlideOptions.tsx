import React, { useState } from 'react';
import { lenses, powerOptions, powerTypes } from './productCategoryData';
import { ArrowLeft, Camera, ChevronRight, X } from 'lucide-react';
import { ILense, ILenseFeatures, IPowerOptions, IPowerTypes } from '@/ts-definition/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

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

   const [image, setImage] = useState<string | null>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
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
                    <br />
                    <div className='flex items-center justify-center w-full h-[20px]'>
                        <button className='bg-blue-900 rounded-3xl px-2 py-1 text-white font-bold cursor-pointer'>Save & Add to Cart</button>
                    </div>
                    <div className='w-full text-center mt-5 text-green-800 text-sm'>
                        <p>Can’t find your power, Call +8801 99088765675</p>
                    </div>
                </div>
              </>
            )}
            {current.type === "Upload Prescription" && (
              <>
                <div className="flex flex-col items-center justify-center h-auto bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                  <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4">
                      Upload Prescription
                    </h1>
                    <p className="text-gray-500 mb-6">
                      Take a clear photo of your doctor’s prescription
                    </p>

                    {/* Fancy Button */}
                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-xl shadow-md cursor-pointer transition transform hover:scale-105">
                      <Camera className="w-5 h-5" />
                      Take Photo
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleCapture}
                      />
                    </label>

                    {/* Preview */}
                    {image && (
                      <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">
                          Preview
                        </h2>
                        <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-200">
                          <Image
                            src={image}
                            alt="Prescription"
                            className="w-full h-auto object-contain"
                            width={200}
                            height={200}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='flex items-center justify-center w-full h-[100px] '>
                     <button className='rounded-3xl bg-blue-800 text-white font-bold px-3 py-2 cursor-pointer'>Save & Add to Cart</button>
                  </div>
                </div>
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