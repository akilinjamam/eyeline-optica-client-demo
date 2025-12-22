/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Check, Facebook, Heart, Instagram, Ruler, Star, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import SlideInPanel from './SlidePannel';
import { TFrame, TWeeklyDeals } from '@/ts-definition/types';
import { ILense } from '@/ts-definition/interfaces';
import { handleDealsPrice } from '@/utilities/priceAfterDealsDiscount';
import Link from 'next/link';
import WhatsAppIconMobile from './WhatsAppIconMobile';
import WhatsAppIconDesktop from './WhatsAppIconDesktop';
import { handleWishList } from '@/fetchData/fetchHandleWishlist';

const DetailPart = ({product, lens, weeklyDeals}: {product:TFrame, lens:ILense[], weeklyDeals:TWeeklyDeals}) => {

  const [showLensPanel, setShowLensPanel] = useState(false);
  console.log(showLensPanel)
  return (
    <div className="w-full mx-auto h-[100%] px-3 text-gray-800 space-y-4">
      <div>
        <h2 className="text-xl font-bold">{product?.name}</h2>
        <p className="text-sm text-gray-500">BT-{product?.barcode}</p>

        <div className="flex items-center mt-1">
          <div className="flex ">
            { product?.rating > 0
              ?
              Array.from({length:product?.rating ? product?.rating : 0}).map((_:any, index:number) =>
                <p key={index+1} className='text-[#0a63f2]'>
                  <Star fill='#0a63f2' />
                </p>
              )
              :
            <p className="font-semibold text-sm mr-2">No Ratings Given yet</p>
            }
          </div>
        </div>

        <div className='my-2'>Size: 
          <span className='bg-blue-500 px-2 rounded text-white font-semibold py-1 mx-2'>
              {product?.sizeCategory}
          </span> 
         
          <Link href="#middleSection">
              <span className='text-blue-500 underline'>
                <Ruler className='inline mr-1'/> 
                  Size Chart
              </span>
          </Link>
        </div>

        <div className="flex space-x-2 mt-2">
          <button className="bg-gray-200 text-sm px-3 py-1 rounded">{product.type}</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-2xl font-bold">
            <span className='line-through text-red-600'>
              {(product?.weeklyDeals && weeklyDeals.active) && `${product?.salesPrice}TK`}
            </span>
            <span>
              {(product?.weeklyDeals && weeklyDeals.active) && product?.salesPrice && `${weeklyDeals.discountPercent}%`}
            </span>
          </p>
          
          <p className="text-2xl font-bold">
            {handleDealsPrice(
              weeklyDeals.active,
              product?.weeklyDeals ?? false,
              product?.salesPrice ?? 0,
              weeklyDeals.discountPercent
            )}TK
          </p>
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
          
        </div>

        {product.stock && product?.stock ? 
          <p className='text-green-500'>Available {product?.quantity}</p> 
          : 
          <p className='text-red-400'>Stock Out</p> 
        }
      </div>

      <div className="flex flex-col space-y-3">
        <button 
          disabled={!product.stock} 
          onClick={() => setShowLensPanel(true)} 
          className={`text-white py-2 rounded-full font-semibold lg:inline md:inline hidden   
          ${product?.stock ? 'bg-gradient-to-r from-blue-500 to-blue-700 cursor-pointer' : 'bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed'}`}
        >
          Procced to Cart
        </button>
        {
          !product?.stock
          &&
          <button onClick={async() => await handleWishList({frameId:product?._id})} className="border border-blue-500 text-blue-500 py-2 rounded-full flex items-center justify-center gap-2 font-semibold cursor-pointer">
          <Heart /> Add to wishlist
        </button>
        }
      </div>

      <AnimatePresence>
        {showLensPanel && (
          <SlideInPanel onClose={() => setShowLensPanel(false)} product={product} lens={lens} weeklyDeals={weeklyDeals}/>
        )}
      </AnimatePresence>

      {/* SOCIAL ICONS */}
      <div className="flex justify-center gap-4 text-blue-600 mt-2">
         <Link href={"https://www.facebook.com/share/15h5Ueymyq"}><Facebook /></Link>
         <Link href={"https://www.instagram.com/eyelineoptica?igsh=MXZ6azBvcnF6bDYzZA=="}><Instagram /></Link>
         <Link href={"https://www.x.com/Eyeline_Optica?t=J46Qn7_g7ACv_HoEovxrXQ&s=09"}><Twitter /></Link>
      </div>

      {/* WHATSAPP BUTTON — DESKTOP + TABLET */}
      <WhatsAppIconDesktop name={product?.name as string} />

      {/* SELECT LENS — MOBILE ONLY */}
      <button
        disabled={!product.stock}
        onClick={() => setShowLensPanel(true)}
        className={`
          text-white py-2 rounded-full font-semibold
          fixed bottom-4 z-30 lg:hidden md:hidden
          w-[85%] left-1/2 transform -translate-x-1/2 
          ${product?.stock 
            ? 'bg-gradient-to-r from-blue-500 to-blue-700 cursor-pointer' 
            : 'bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed'
          }
  `}
>
  Select Lens
      </button>

      {/* WHATSAPP FLOATING ICON — MOBILE ONLY */}
      <WhatsAppIconMobile name={product?.name as string} />
      

    </div>
  );
};

export default DetailPart;
