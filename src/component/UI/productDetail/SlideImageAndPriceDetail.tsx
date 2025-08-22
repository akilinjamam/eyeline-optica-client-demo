
'use client'
import { GlassCardProps, IPowerTypes } from '@/ts-definition/interfaces';
import Image from 'next/image';
import { powerTypes } from './productCategoryData';
import { ChevronRight } from 'lucide-react';


const SlideImageAndPriceDetail = ({product}: {product:GlassCardProps}) => {
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
                    
                    <div className="flex justify-between font-bold text-sm">
                        <label htmlFor="">Total:</label>
                      
                    </div>
                    
                </div>
            </div>

            <br />
            {/* Your lens selection content goes here */}
            <div className="max-h-[60vh] overflow-y-scroll border-1 border-gray-200 py-2">
                {
                    powerTypes.map((item:IPowerTypes, index:number) => {
                        return (
                            <div key={index} className='flex items-center justify-between p-1 bg-gray-100 m-2 rounded-md cursor-pointer'>
                                <p className='px-1 text-sm'>{item.title}</p>
                                <ChevronRight className='' />
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    );
};

export default SlideImageAndPriceDetail;