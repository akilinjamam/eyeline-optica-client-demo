/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { GlassCardProps } from '@/ts-definition/interfaces';
import Image from 'next/image';
import Accordion from '../Accordion';
import { eyeglass } from './accordionData';
import { calculatingTotal } from '@/utilities/calculatingTotal';
import useManageAccordionData from '@/custom-hooks/useManageAccordionData';

const SlideImageAndPriceDetailOldData = ({product}: {product:GlassCardProps}) => {
    const accordionItem = eyeglass
    const {setSelectData, setSelectPrice, setSelectedData, setSelectedPrice, totalPrice, combineValue, setCombineValue} = useManageAccordionData({accordionItem, product})

    console.log(eyeglass.length) // fixed length
    console.log(combineValue.length) // dynamic length

    const handleDelete = (indexToDelete:number) => {
       
        const updatedCombineValue = combineValue.filter((_, index) => index !== indexToDelete);
        setCombineValue(updatedCombineValue);

        const deletedItemString = combineValue[indexToDelete];
        if (deletedItemString) {
            const [deletedKey] = deletedItemString.split(': ');
            if (deletedKey) {
                // Update selectedData
                setSelectedData(prevSelectedData => {
                    const newSelectedData = { ...prevSelectedData };
                    delete newSelectedData[deletedKey];
                    return newSelectedData;
                });

                // Update selectedPrice
                setSelectedPrice(prevSelectedPrice => {
                    const newSelectedPrice = { ...prevSelectedPrice };
                    delete newSelectedPrice[deletedKey];
                    return newSelectedPrice;
                });
            }
        }
        console.log("combineValue after deletion:", updatedCombineValue); 
    };

    // fixed & dynamic length
  const fixedLength = eyeglass.length;
  const dynamicLength = combineValue.length;

  // calculate percentage
  const percentage = Math.min((dynamicLength / fixedLength) * 100, 100);

    return (
        <div className="p-2 ">
            <div className="w-full h-[200px]  mx-auto flex items-center">
                <div className="w-[40%] h-full bg-gray-200 flex items-center justify-center">
                    <Image src={product.image} alt="single-img" />
                </div>
                <div className="w-[60%] h-[200px] p-1">
                    <div className="flex justify-between font-bold text-sm">
                        <label htmlFor="">Price</label>
                        <p>{product.price}</p>
                    </div>
                    {
                            combineValue.map((item:any, index:number) => {
                                
                                return (
                                    <div key={index} className='text-sm flex items-start justify-between font-bold'>
                                        <p >{item.split('/')?.[0]?.toLowerCase()} <span onClick={() => handleDelete(index)} className='cursor-pointer'>❌</span></p>
                                        <p >{item.split('/')?.[1]} </p>
                                    </div>
                                )
                            } )
                        }
                    <br />
                    <hr />
                    <div className="flex justify-between font-bold text-sm">
                        <label htmlFor="">Total:</label>
                        <p>{calculatingTotal(totalPrice)}</p>
                    </div>
                    <div className="mt-3">
                    <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Selection Progress</span>
                    <span>{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-4 rounded-full bg-gray-200/30 backdrop-blur-md border border-white/20 shadow-inner overflow-hidden">
                    <div
                        className="h-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg transition-all duration-500 ease-in-out"
                        style={{ width: `${percentage}%` }}
                    />
                    </div>
          </div>
                </div>
            </div>

            <br />
            {/* Your lens selection content goes here */}
            <div className="max-h-[60vh] overflow-y-scroll border-1 border-gray-200 py-2">
                <Accordion item={eyeglass} selectData={setSelectData} selectPrice={setSelectPrice}/>
            </div>
        </div>
    );
};

export default SlideImageAndPriceDetailOldData;