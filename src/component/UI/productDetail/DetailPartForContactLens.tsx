/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Check, Facebook, Heart, Instagram, Star, StarHalf, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import SlideInPanelForContactLens from './SlideInPanelForContactLens';
import { TAccessory } from '@/ts-definition/types';


const DetailPartForContactLens = ({singleLens, allAccessory}: {singleLens:any, allAccessory:TAccessory[]}) => {
 
const [showLensPanel, setShowLensPanel] = useState(false);

    return (
    <div className="w-full mx-auto h-[100%] px-3 text-gray-800 space-y-4">
      <div>
        <h2 className="text-xl font-bold">{singleLens?.name}</h2>
        {/* <p className="text-sm text-gray-500">BT-{singleLens?.barcode}</p> */}
        <div className="flex items-center mt-1">
          <p className="font-semibold text-sm mr-2">No Review Given yet</p>
          <div className="flex text-blue-500">
            <Star />
            <Star />
            <Star />
            <Star />
            <StarHalf />
          </div>
        </div>
        <div className="flex space-x-2 mt-2">
          <button className="bg-gray-200 text-sm px-3 py-1 rounded">{singleLens.lensType}</button>
          
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-2xl font-bold">{singleLens.salesPrice}TK</p>
          
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
         {singleLens.stock && singleLens?.stock ? <p className='text-green-500'>Available {singleLens?.quantity}</p> : <p className='text-red-400 font-bold'>Stock Out</p> }
      </div>

      <div className="flex flex-col space-y-3">
        <button onClick={() => setShowLensPanel(true)} className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-full font-semibold cursor-pointer">
          Procced to Cart
        </button>
        <button className="border border-blue-500 text-blue-500 py-2 rounded-full flex items-center justify-center gap-2 font-semibold">
          <Heart /> Add to wishlist
        </button>
      </div>

      
        <AnimatePresence>
          {showLensPanel && (
            <SlideInPanelForContactLens onClose={() => setShowLensPanel(false)} singleLens={singleLens} allAccessory={allAccessory}/>
          )}
        </AnimatePresence>
      <div className="flex justify-center gap-4 text-blue-600 mt-2">
        <a href="#"><Facebook size={18} /></a>
        <a href="#"><Instagram size={18} /></a>
        <a href="#"><Twitter size={18} /></a>
      </div>
      
    </div>
  );
};

export default DetailPartForContactLens;