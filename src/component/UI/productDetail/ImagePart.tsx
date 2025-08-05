'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image, { StaticImageData } from 'next/image';
import React, {  useState } from 'react';

const ImagePart:React.FC<any> = ({product}) => {
    const [selectImg, setSelectImg] = useState<number>(product.id - 1); 
  
    return (
        <div className='border border-gray-300 p-1'>
            <div className='w-full bg-white  flex items-center justify-between  p-1'>
                <div className='w-[15%] h-[100%] flex-wrap items-center'>
                    {
                        product.images.slice(7, 12).map((img:StaticImageData, index:number) => <Image key={index} height={60} width={60} src={img}  alt='glass-images' className={`my-2 border border-gray-200`}/>)
                    }
                </div>
                <div className='w-[85%] flex items-center justify-center '>
                    <Image src={product.images[selectImg]} height={600} width={600} alt='glass-image'/>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-[80%] mx-auto flex items-center justify-between'>
                    {
                        product.images.slice(0,6).map((img:StaticImageData, index:number) => <Image onClick={() => setSelectImg(index)} src={img} key={index} width={60} height={60} alt='horizontal-img' className={`cursor-pointer ${index === selectImg ? 'border-2 border-t-gray-400' : ''}`}/> )
                    }
                </div>
            </div>
        </div>
    );
};

export default ImagePart;