"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import featured1 from '../../public/images/featuredImages/featured-img-1.png'
// import featured2 from '../../public/images/featuredImages/featured-img-2.png'
// import featured3 from '../../public/images/featuredImages/featured-img-3.png'
// import featured4 from '../../public/images/featuredImages/featured-img-4.png'
import Title from './Title';
import Image from 'next/image';
import { IBanner } from '@/ts-definition/interfaces';
import { bannerAccordingToCategory } from '@/fetchData/bannerAccordingToCategory';
import { useRouter } from 'next/navigation';



const FeaturedCategory = ({bannerData}: {bannerData:IBanner[]}) => {

    const router = useRouter()

    const featuredImg = [
    {
        img:bannerAccordingToCategory("Mobile Featured Category One", bannerData),
        title: "EYEGLASSES",
        btn1: "WOMEN",
        btn2: "MEN",
        color: "text-white",
        font: "",
        linkOne: "/allglasses/womensGlasses",
        linkTwo: "/allglasses/mensGlasses"
    },
    {
        img:bannerAccordingToCategory("Mobile Featured Category Two", bannerData),
        title: "SUNGLASSES",
        btn1: "WOMEN",
        btn2: "MEN",
        color: "text-black",
        font: "",
        linkOne: "/allglasses/brand?biologyCategory=women&type=sunglasses",
        linkTwo: "/allglasses/brand?biologyCategory=men&type=sunglasses",
       
    },
    {
        img:bannerAccordingToCategory("Mobile Featured Category Three", bannerData),
        title: "CONTACT LENS",
        btn1: "COLOR",
        btn2: "CLEAR",
        color: "text-red-800",
        font: "",
        linkOne: "/allContactLens",
        linkTwo: "/allContactLens",
    },
    {
        img:bannerAccordingToCategory("Mobile Featured Category Four", bannerData),
        title: "KIDS FRAME",
        btn1: "EYEGLASSES",
        btn2: "SUNGLASSES",
        color: "text-black",
        font: "text-sm",
        linkOne: "/allglasses/brand?biologyCategory=kids&type=eye glasses",
        linkTwo: "/allglasses/brand?biologyCategory=kids&type=sunglasses",
    },
]

    return (
        <div className='my-5 md:hidden lg:hidden block '>
            <Title value='FEATURED CATEGORIES'/>
            <div className='flex flex-wrap'>
                {
                    featuredImg?.map((item:any, index:number) => {
                        return <div key={index} className='w-[50%] relative'>
                            <Image width={600} height={600}  className='w-full'  src={item.img} alt='featured-img'/>
                            <p className={`${item.color} absolute top-4 left-4 font-bold`}>{item.title}</p>
                            <div className='absolute bottom-3 flex items-center w-full justify-center border-t border-white'>
                                <div className='flex items-center justify-between w-[80%]   '>
                                    <p
                                    onClick={() => router.push(item?.linkOne)}
                                    className={`w-[50%] border-r border-white px-2 py-3 cursor-pointer ${item.color} font-bold text-[11px] flex items-center justify-center`}
                                    >
                                    {item.btn1}
                                    </p>

                                    <p
                                    onClick={() => router.push(item?.linkTwo)}
                                    className={`w-[50%] px-2 py-3 cursor-pointer ${item.color} text-[11px] font-bold flex items-center justify-center`}
                                    >
                                    {item.btn2}
                                    </p>
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