/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Check, Facebook, Heart, Instagram, Star, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import SlideInPanelForLens from './SlidePannelForLens';
import useFetchWeeklyDealsData from '@/custom-hooks/useFetchWeeklyDealsData';
import { handleDealsPrice } from '@/utilities/priceAfterDealsDiscount';
import WhatsAppIconDesktop from './WhatsAppIconDesktop';
import WhatsAppIconMobile from './WhatsAppIconMobile';
import { handleWishList } from '@/fetchData/fetchHandleWishlist';


const DetailPartForLens = ({singleLens}: {singleLens:any}) => {
 
const [showLensPanel, setShowLensPanel] = useState(false);

  const {dealsData} = useFetchWeeklyDealsData()

    return (
    <div className="w-full mx-auto h-[100%] text-gray-800 space-y-4">
      <div className='mx-3'>
        <h2 className="text-xl font-bold">{singleLens?.name}</h2>
        {/* <p className="text-sm text-gray-500">BT-{singleLens?.barcode}</p> */}
        <div className="flex items-center mt-1">
                  
                  <div className="flex ">
                    { singleLens?.rating > 0
                      ?
                      Array.from({length:singleLens?.rating ? singleLens?.rating : 0}).map((_:any, index:number) => <p key={index+1} className='text-[#0a63f2]'><Star fill='#0a63f2' /></p> )
                      :
                    <p className="font-semibold text-sm mr-2">No Ratings Given yet</p>
                    }
                    
                  </div>
                </div>
        <div className="flex space-x-2 mt-2">
          <button className="bg-gray-200 text-sm px-3 py-1 rounded">{singleLens.lensType}</button>
        
        </div>
      </div>

      <div className="bg-white p-4 mx-3 rounded-lg grid grid-cols-2 gap-4 text-sm">
        <div>
                  <p className="text-2xl font-bold"><span className='line-through text-red-600'>{(singleLens?.weeklyDeals && dealsData.active) && `${singleLens?.salesPrice}TK`}</span> <span>{(singleLens?.weeklyDeals && dealsData.active) && singleLens?.salesPrice && `${dealsData.discountPercent}%`}</span></p>
                  <p className="text-2xl font-bold">{handleDealsPrice(dealsData.active, singleLens?.weeklyDeals ?? false , singleLens?.salesPrice ?? 0, dealsData.discountPercent)}TK</p>
                  
                </div>
        <div>
          <p className="font-semibold mb-2">THIS PRICE INCLUDES:</p>
          {
            singleLens?.features && singleLens?.features?.length > 0 ? singleLens?.features?.map((item:any, index:number) => (
              <ul key={index+1} className="space-y-1">
            
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" /> {item}*
                </li>
           
              </ul>
            ))
            :
            <p>No Features Added here yet...</p>
          }
          <p className="text-xs mt-1 text-gray-500">
            *multifocal or readers lenses start at additional cost
          </p>
        </div>
         {singleLens.stock && singleLens?.stock ? <p className='text-green-500'>Available {singleLens?.quantity}</p> : <p className='text-red-400'>Stock Out</p> }
      </div>

      <div className="flex mx-3 flex-col space-y-3">
        <button disabled={singleLens?.stock ? false : true } onClick={() => setShowLensPanel(true)} className={`lg:inline md:inline  text-white py-2 rounded-full font-semibold  ${singleLens?.stock ? "hidden bg-gradient-to-r from-blue-500 to-blue-700 cursor-pointer" : "hidden bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed"} `}>
          Procced to Cart
        </button>
        {
          !singleLens?.stock
          &&
          <button onClick={async() => await handleWishList({lensId:singleLens?._id})} className="border mx-3 border-blue-500 text-blue-500 py-2 rounded-full flex items-center justify-center gap-2 font-semibold cursor-pointer">
            <Heart /> Add to wishlist
          </button>
        }
      </div>

      
        <AnimatePresence>
          {showLensPanel && (
            <SlideInPanelForLens onClose={() => setShowLensPanel(false)} singleLens={singleLens} />
          )}
        </AnimatePresence>
      <div className="flex justify-center gap-4 text-blue-600 mt-2 mb-2">
        <a href="#"><Facebook size={18} /></a>
        <a href="#"><Instagram size={18} /></a>
        <a href="#"><Twitter size={18} /></a>
      </div>
      {/* whats app desktop */}
      <WhatsAppIconDesktop name={singleLens?.name} />
      {/* SELECT LENS — MOBILE ONLY */}
      <button 
        disabled={!singleLens.stock} 
        onClick={() => setShowLensPanel(true)} 
        className={`text-white py-2 rounded-full font-semibold w-[98%] fixed bottom-4 z-30 inline lg:hidden md:hidden  
        ${singleLens?.stock ? 'bg-gradient-to-r from-blue-500 to-blue-700 cursor-pointer' : 'bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed'}`}
      >
        Select Lens
      </button>
      {/* whats app for mobile */}
      <WhatsAppIconMobile name={singleLens?.name} />
    </div>
  );
};

export default DetailPartForLens;