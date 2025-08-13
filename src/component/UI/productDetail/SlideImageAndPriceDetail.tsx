/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { GlassCardProps } from '@/ts-definition/interfaces';
import Image from 'next/image';
import Accordion from '../Accordion';
import { eyeglass } from './accordionData';
import { useEffect, useState } from 'react';
import { calculatingTotal } from '@/utilities/calculatingTotal';

const SlideImageAndPriceDetail = ({product}: {product:GlassCardProps}) => {

    const [selectData, setSelectData] = useState<{ price?: number; [key: string]: any }>({});
    const [selectPrice, setSelectPrice] = useState<{ price?: number; [key: string]: any }>({});
    const [selectedData, setSelectedData] = useState<{ [key: string]: any }>({});
    const [selectedPrice, setSelectedPrice] = useState<{ [key: string]: any }>({});
    const [combineValue, setCombineValue] = useState<string[]>([])
    
    useEffect(() => {
        const allTypes = eyeglass.map((item) => item.title);
        if (allTypes.includes(Object.keys(selectData)[0])){
            setSelectedData((prev) => ({...prev, ...selectData}))
        };

        
    },[selectData])

    useEffect(() => {
       
        if (selectData.price && selectData.price){
            setSelectedPrice((prev) => ({...prev, ...selectPrice}))
        }
    }, [selectData, selectPrice])

   useEffect(() => {
        const titleArray:string[] = [];
        const priceArray:string[] = [];
        const combineArray:string[] = []; 

        
        const { price, ...propertiesWithoutPrice} = selectedData;

       
        for(const key in propertiesWithoutPrice){
            titleArray.push(`${key}: ${propertiesWithoutPrice[key]}`);
        }

      
        for(const key in selectedPrice){
          
            if (key !== 'price') { 
                 priceArray.push(`${key}: ${selectedPrice[key]}`);
            }
        }

       
        if(titleArray.length === 0 || priceArray.length === 0) return;

        
        for(let i = 0; i < titleArray.length; i++){
            const [key1, value1] = titleArray[i]?.split(': ');
            const [key2, value2] = priceArray[i]?.split(': ');

           
            if (key1 && value1 && key2 && value2 && key1 === key2) {
                combineArray.push(`${key1}: ${value1}/${value2}`);
            } else {
              
                console.warn(`Mismatch or missing data at index ${i}. titleArray: "${titleArray[i]}", priceArray: "${priceArray[i]}"`);
            }
        }       
        console.log("Combined Array:", combineArray); 
        setCombineValue(combineArray);
    },[selectedData, selectedPrice]);


    const totalPrice = [product.price, ...combineValue?.map((item:any) => Number(item?.split('/')?.[1]))];

    const handleDelete = (value:number) => {
        const unDeletedItem = combineValue.filter((_, index:number) => index !== value);
        setCombineValue(unDeletedItem)
        console.log(combineValue)
    };


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

export default SlideImageAndPriceDetail;