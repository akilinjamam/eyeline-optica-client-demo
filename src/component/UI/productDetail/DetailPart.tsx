/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Check, Facebook, Heart, Instagram, Star, StarHalf, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import SlideInPanel from './SlidePannel';
import { TFrame } from '@/ts-definition/types';
import { ILense } from '@/ts-definition/interfaces';


const DetailPart = ({product, lens}: {product:TFrame, lens:ILense[]}) => {
 
const [showLensPanel, setShowLensPanel] = useState(false);

console.log(product)
    return (
    <div className="w-full mx-auto h-[100%] px-3 text-gray-800 space-y-4">
      <div>
        <h2 className="text-xl font-bold">{product?.name}</h2>
        <p className="text-sm text-gray-500">BT-{product?.barcode}</p>
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
          <button className="bg-gray-200 text-sm px-3 py-1 rounded">{product.type}</button>
          <button className="underline text-sm text-blue-500">Size Chart</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-2xl font-bold">{product.salesPrice}TK</p>
          <label className="flex items-center space-x-2 mt-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>Get it as early as Wed, Apr 9</span>
          </label>
        </div>
        <div>
          <p className="font-semibold mb-2">THIS PRICE INCLUDES:</p>
          {
            product?.features && product?.features?.length > 0 ? product?.features?.map((item:any, index:number) => (
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
        {product.stock && product?.stock ? <p className='text-green-500 font-bold'>Available {product?.quantity}</p> : <p className='text-red-400 font-bold'>Stock Out</p> }
      </div>

      <div className="flex flex-col space-y-3">
        <button disabled={!product.stock} onClick={() => setShowLensPanel(true)} className={`text-white py-2 rounded-full font-semibold  ${product?.stock ? 'bg-gradient-to-r from-blue-500 to-blue-700 cursor-pointer' : 'bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed'}`}>
          Procced to Cart
        </button>
        <button className="border border-blue-500 text-blue-500 py-2 rounded-full flex items-center justify-center gap-2 font-semibold">
          <Heart /> Add to wishlist
        </button>
      </div>

      <p className="text-center text-sm">
        Pay with insurance.{" "}
        <span className="underline text-blue-500 cursor-pointer">Learn more</span>
      </p>
        <AnimatePresence>
          {showLensPanel && (
            <SlideInPanel onClose={() => setShowLensPanel(false)} product={product} lens={lens}/>
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

export default DetailPart;