
'use client'
import {  Facebook, Heart, Instagram, Star, StarHalf, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence } from "framer-motion";

import { TAccessory, TAccessoryItem } from '@/ts-definition/types';
import SlideInPanelForAccessory from './SlideInPanelforAccessory';
import useFetchWeeklyDealsData from '@/custom-hooks/useFetchWeeklyDealsData';
import { handleDealsPrice } from '@/utilities/priceAfterDealsDiscount';


const DetailPartForAccessory = ({singAccessory}: {singAccessory:TAccessory}) => {
const name = singAccessory?.items?.map((item:TAccessoryItem) => item.name)?.join('+');
const price = singAccessory?.items?.map((item:TAccessoryItem) => item.salesPrice)?.join('+');
const singlePrice = singAccessory?.items?.map((item:TAccessoryItem) => item.salesPrice)?.reduce((acc:number, sum:number) => acc + sum, 0);
const [showAccessoryPanel, setShowAccessoryPanel] = useState(false);

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

  const {dealsData} = useFetchWeeklyDealsData()

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
          <p className="text-2xl font-bold"><span className='line-through text-red-600'>{(singAccessory?.weeklyDeals && dealsData.active) && `${price}TK`}</span> <span>{(singAccessory?.weeklyDeals && dealsData.active) && price && `${dealsData.discountPercent}%`}</span></p>
          <p className="text-2xl font-bold">{handleDealsPrice(dealsData.active, singAccessory?.weeklyDeals ?? false , singlePrice ?? 0, dealsData.discountPercent)}TK</p>
          
          <br />
         <div>
              {handleStock() ? <p className="text-green-500 font-bold">Available</p> : <p className="text-red-500 font-bold">Stockout</p>}
          </div>
        </div>
        <div>
          
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