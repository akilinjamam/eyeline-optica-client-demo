/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Check, Facebook, Heart, Instagram, Star, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import SlideInPanelForContactLens from './SlideInPanelForContactLens';
import { TAccessory } from '@/ts-definition/types';
import { handleDealsPrice } from '@/utilities/priceAfterDealsDiscount';
import useFetchWeeklyDealsData from '@/custom-hooks/useFetchWeeklyDealsData';
import WhatsAppIconMobile from './WhatsAppIconMobile';
import WhatsAppIconDesktop from './WhatsAppIconDesktop';
import { handleWishList } from '@/fetchData/fetchHandleWishlist';


const DetailPartForContactLens = ({singleLens, allAccessory}: {singleLens:any, allAccessory:TAccessory[]}) => {
 
const [showLensPanel, setShowLensPanel] = useState(false);

const {dealsData} = useFetchWeeklyDealsData()

    return (
    <div className="w-full mx-auto h-[100%] text-gray-800 space-y-4 px-3">
      <div className='px-3'>
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
          <button className="bg-gray-200 text-sm px-3 py-1 rounded">{singleLens.type}</button>
          
        </div>
      </div>

      <div className=" bg-white p-4 rounded-lg grid grid-cols-2 gap-4 text-sm mx-3">
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
          
        </div>
         {singleLens.stock && singleLens?.stock ? <p className='text-green-500'>Available {singleLens?.quantity}</p> : <p className=' text-red-500 '>Stock Out</p> }
      </div>

      <div className="flex flex-col space-y-3 px-3">
        <button disabled={singleLens?.stock ? false : true} onClick={() => setShowLensPanel(true)} className={`lg:inline md:inline hidden  text-white py-2 rounded-full font-semibold ${singleLens?.stock ? 'bg-gradient-to-r from-blue-500 to-blue-700 cursor-pointer' : 'bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed'}`}>
          Procced to Cart
        </button>
        {
          !singleLens?.stock
          &&
          <button onClick={async() => await handleWishList({contactLensId:singleLens?._id})} className="border border-blue-500 text-blue-500 py-2 rounded-full flex items-center justify-center gap-2 font-semibold">
          <Heart /> Add to wishlist
        </button>
        }
      </div>

      
        <AnimatePresence>
          {showLensPanel && (
            <SlideInPanelForContactLens onClose={() => setShowLensPanel(false)} singleLens={singleLens} allAccessory={allAccessory}/>
          )}
        </AnimatePresence>
      <div className="flex justify-center gap-4 text-blue-600 mt-2 mb-2">
        <a href="#"><Facebook size={18} /></a>
        <a href="#"><Instagram size={18} /></a>
        <a href="#"><Twitter size={18} /></a>
      </div>
       <WhatsAppIconDesktop name={singleLens?.name} />
      {/* SELECT LENS — MOBILE ONLY */}
      <button 
        disabled={!singleLens.stock} 
        onClick={() => setShowLensPanel(true)} 
        className={` text-white py-2 rounded-full font-semibold
          fixed bottom-4 z-30 lg:hidden md:hidden
          w-[85%] left-1/2 transform -translate-x-1/2   
        ${singleLens?.stock ? 'bg-gradient-to-r from-blue-500 to-blue-700 cursor-pointer' : 'bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed'}`}
      >
        Select Contact Lens
      </button>
      <WhatsAppIconMobile name={singleLens?.name} />
      
    </div>
  );
};

export default DetailPartForContactLens;