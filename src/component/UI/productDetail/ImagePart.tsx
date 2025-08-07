'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image, { StaticImageData } from 'next/image';
import React, {  useState } from 'react';

const ImagePart:React.FC<any> = ({product}) => {
    const [selectImg, setSelectImg] = useState<number>(product.id - 1); 
  
    return (
        <div className=''>
            <div className='w-full bg-white  flex items-center justify-between  p-1'>
                <div className='w-[15%] h-[100%] flex-wrap items-center'>
                    {
                        product.images.slice(7, 12).map((img:StaticImageData, index:number) => <Image key={index} height={50} width={50} src={img}  alt='glass-images' className={`my-2 border border-gray-200`}/>)
                    }
                </div>
                <div className='w-[85%] flex items-center justify-center '>
                    <Image src={product.images[selectImg]} height={600} width={600} alt='glass-image'/>
                </div>
            </div>
            <div className='w-full bg-white'>
                <div className='lg:w-[80%] mx-auto flex items-center justify-between'>
                    {
                        product.images.slice(0,6).map((img:StaticImageData, index:number) => <Image onClick={() => setSelectImg(index)} src={img} key={index} width={50} height={50} alt='horizontal-img' className={`cursor-pointer ${index === selectImg ? 'border-t-2 border-gray-400' : ''}`}/> )
                    }
                </div>
            </div>
        </div>
    );
};

export default ImagePart;