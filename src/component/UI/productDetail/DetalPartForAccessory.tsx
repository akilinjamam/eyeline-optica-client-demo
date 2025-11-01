
'use client'
import {  Facebook, Heart, Instagram, Star, StarHalf, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence } from "framer-motion";

import { TAccessory, TAccessoryItem } from '@/ts-definition/types';
import SlideInPanelForAccessory from './SlideInPanelforAccessory';


const DetailPartForAccessory = ({singAccessory}: {singAccessory:TAccessory}) => {
const name = singAccessory?.items?.map((item:TAccessoryItem) => item.name)?.join('+');
const price = singAccessory?.items?.map((item:TAccessoryItem) => item.salesPrice)?.join('+');
const [showAccessoryPanel, setShowAccessoryPanel] = useState(false);

/* 
(singAccessory?.items?.length === 1 && (
                singAccessory?.items[0]?.stock ? (
                  <p className="text-green-500 font-bold">Available</p>
                ) : (
                  <p className="text-red-500 font-bold">Stockout</p>
                )
              )) ||
              (singAccessory?.items?.length === 2 && (
                (singAccessory?.items[0]?.stock && singAccessory?.items[1]?.stock) ? (
                  <p className="text-green-500 font-bold">Available</p>
                ) : (
                  <p className="text-red-500 font-bold">Stockout</p>
                )
              )) ||
              (singAccessory?.items?.length === 3 && (
                (singAccessory?.items[0]?.stock && singAccessory?.items[1]?.stock && singAccessory?.items[2]?.stock) ? (
                  <p className="text-green-500 font-bold">Available</p>
                ) : (
                  <p className="text-red-500 font-bold">Stockout</p>
                )
              ))
*/

const handleStock = () => {
  if(singAccessory?.items?.length === 1 ){
    if(singAccessory?.items[0]?.stock){
      return true
    }else{
       return false
    }
  }

  if(singAccessory?.items?.length === 2 ){
    if(singAccessory?.items[0]?.stock && singAccessory?.items[1]?.stock){
      return true
    }else{
      return false
    }
  }

  if(singAccessory?.items?.length === 3 ){
    if(singAccessory?.items[0]?.stock && singAccessory?.items[1]?.stock && singAccessory?.items[2]?.stock){
      return true
    }else{
      return false
    }
  }
}

  console.log(handleStock())

    return (
    <div className="w-full mx-auto h-[100%] px-3 text-gray-800 space-y-4">
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
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
          <button className="bg-gray-200 text-sm px-3 py-1 rounded">{singAccessory?.type}</button>
          
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-2xl font-bold">{price}TK</p>
          <label className="flex items-center space-x-2 mt-2">
            <input type="checkbox" className="w-4 h-4" />
          
          </label>
          <br />
         <div>
              {handleStock() ? <p className="text-green-500 font-bold">Available</p> : <p className="text-red-500 font-bold">Stockout</p>}
          </div>
        </div>
        <div>
          {/* <p className="font-semibold mb-2">THIS PRICE INCLUDES:</p>
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
          } */}
          {/* <p className="text-xs mt-1 text-gray-500">
            *multifocal or readers lenses start at additional cost
          </p> */}
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button disabled={!handleStock() ? true : false}  onClick={() => setShowAccessoryPanel(true)} className={`bg-gradient-to-r from-blue-500 to-blue-700 ${handleStock() ? 'bg-gradient-to-r from-blue-500 to-blue-700 cursor-pointer': 'bg-gradient-to-r from-gray-500 to-gray-700 '} text-white py-2 rounded-full font-semibold cursor-not-allowed`}>
          Procced to Cart
        </button>
        <button className="border border-blue-500 text-blue-500 py-2 rounded-full flex items-center justify-center gap-2 font-semibold">
          <Heart /> Add to wishlist
        </button>
      </div>

      
        <AnimatePresence>
          {showAccessoryPanel && (
            <SlideInPanelForAccessory onClose={() => setShowAccessoryPanel(false)} singleAccessory={singAccessory} />
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

export default DetailPartForAccessory;