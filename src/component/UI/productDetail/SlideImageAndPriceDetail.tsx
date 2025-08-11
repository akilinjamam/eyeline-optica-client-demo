'use client'
import { GlassCardProps } from '@/ts-definition/interfaces';
import Image from 'next/image';
import Accordion from '../Accordion';
import { eyeglass } from './accordionData';
import { useEffect, useState } from 'react';

const SlideImageAndPriceDetail = ({product}: {product:GlassCardProps}) => {

    const [selectData, setSelectData] = useState({});
    const [selectedData, setSelectedData] = useState({});
    console.log(selectedData);
    useEffect(() => {
        const allTypes = eyeglass.map((item) => item.title);
        if (allTypes.includes(Object.keys(selectData)[0])){
            setSelectedData((prev) => ({...prev, ...selectData}))
        }
    },[selectData])

    return (
        <div className="p-2 ">
            <div className="w-full h-[200px]  mx-auto flex items-center justify-between">
                <div className="w-[40%] h-full bg-gray-200 flex items-center justify-center">
                    <Image src={product.image} alt="single-img" />
                </div>
                <div className="w-[60%] h-[200px] p-1">
                    <div className="flex justify-between font-bold">
                        <label htmlFor="">Price</label>
                        <p>{product.price}</p>
                    </div>
                    <br />
                    <hr />
                <div className="flex justify-between font-bold">
                        <label htmlFor="">Total:</label>
                        <p>{product.price}</p>
                    </div>
                </div>
            </div>

            <br />
            {/* Your lens selection content goes here */}
            <div className="max-h-[60vh] overflow-y-scroll border-1 border-gray-200 py-2">
                <Accordion item={eyeglass} selectData={setSelectData}/>
            </div>
        </div>
    );
};

export default SlideImageAndPriceDetail;