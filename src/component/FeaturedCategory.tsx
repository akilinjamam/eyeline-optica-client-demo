/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import featured1 from '../../public/images/featuredImages/featured-img-1.png'
import featured2 from '../../public/images/featuredImages/featured-img-2.png'
import featured3 from '../../public/images/featuredImages/featured-img-3.png'
import featured4 from '../../public/images/featuredImages/featured-img-4.png'
import Title from './Title';
import Image from 'next/image';

const featuredImg = [
    {
        img:featured1,
        title: "EYEGLASSES",
        btn1: "WOMEN",
        btn2: "MEN",
        color: "text-white",
        font: ""
    },
    {
        img:featured2,
        title: "SUNGLASSES",
        btn1: "WOMEN",
        btn2: "MEN",
        color: "text-black",
        font: ""
    },
    {
        img:featured3,
        title: "CONTACT LENS",
        btn1: "COLOR",
        btn2: "CLEAR",
        color: "text-red-800",
        font: ""
    },
    {
        img:featured4,
        title: "KIDS FRAME",
        btn1: "EYEGLASSES",
        btn2: "SUNGLASSES",
        color: "text-black",
        font: "text-sm"
    },
]

const FeaturedCategory = () => {
    return (
        <div className='my-5 md:hidden lg:hidden block '>
            <Title value='FEATURED CATEGORIES'/>
            <div className='flex flex-wrap'>
                {
                    featuredImg?.map((item:any, index:number) => {
                        return <div key={index} className='w-[50%] relative'>
                            <Image className='w-full'  src={item.img} alt='featured-img'/>
                            <p className={`${item.color} absolute top-4 left-4 font-bold`}>{item.title}</p>
                            <div className='absolute bottom-3 flex items-center w-full justify-center border-t border-white'>
                                <div className='flex items-center justify-between w-[80%]   '>
                                    <p className={`w-[50%] border-r border-white px-2 py-3 ${item.color} font-bold text-xs`}>{item.btn1}</p>
                                    <p className={`w-[50%] text-center px-2 py-3 ${item.color} text-xs font-bold`}>{item.btn2}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
                
            </div>
        </div>
        
    );
};

export default FeaturedCategory;