import React, { FC } from 'react';
import appointment from '../../public/images/appointment-img.png';
import Image from 'next/image';
import arrow from '../../public/images/33-right.png';
import { TAppointmentService } from '@/ts-definition/types';
import Title from './Title';
import Link from 'next/link';
const BookAppointment:FC = () => {

    const serviceData:TAppointmentService[] = [
        {
            img: arrow,
            text: 'Accurate Diagnosis Suggestions'
        },
         {
            img: arrow,
            text: 'Specialist Consultations'
        },
         {
            img: arrow,
            text: 'Internation Treatment Guidence'
        },
         {
            img: arrow,
            text: 'Documentation Assistance'
        },
         {
            img: arrow,
            text: 'Personalized Health Advice'
        },
    ]


    return (
        <div className='hidden lg:block w-full mt-5 text-black'>
            <Title value='BOOK APPOINTMENT'/>
            <br />
            <div  style={{ backgroundImage: "url('/images/appointment-background.png')", backgroundSize:'cover', backgroundPosition:'center', height:'100%' }} className='w-[100%]' >
                <br />
                <div className='w-[85%] max-w-[1200px] mx-auto flex items-start justify-between '>
                    <div className='w-[50%] '>
                        <p><span className='text-[35px] font-semibold leading-10'>Book Your Own Appointment <br /> with</span> <span className='leading-24 text-transparent bg-clip-text bg-gradient-to-r from-[#266FFD] to-[#18449B] font-bold text-[76px]'>Consultant</span> <br /> <br /> <span className='text-[25px] font-semibold'>We Provide comprehensive Telemedicine <br /> service nationwide with top Eye Specialist & <br /> Surgeons.</span></p>
                        <br />
                        <Link href={"/telemedicine"}>
                            <button className=' mt-2 px-9 py-4 text-white text-xl font-semibold rounded bg-gradient-to-r from-[#259AFF] to-[#1D4DFF] hover:opacity-90 transition cursor-pointer'>Book Now</button>
                        </Link>
                        <br /><br />
                        <p className='text-3xl font-bold text-blue-700'>Our <span className='text-blue-400'>Services</span></p>
                        <br />
                        {
                            serviceData?.map((service: TAppointmentService, index:number) => <p className='flex items-center' key={index}><span><Image src={service.img} alt='appointment-service-list'/></span> <span className='ml-2 font-semibold'>{service.text}</span> </p> )
                        }
                    </div>
                    <div className='w-[50%] relative'>
                        <Image className='w-full' src={appointment} alt='appointment-image'/>
                        <br />
                        <p className='text-center text-4xl font-semibold'>Have Questions About Your</p>
                        <br />
                        <p  className='text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#18449B] to-[#266FFD]  font-bold text-center absolute bottom-12 left-30 z-40'>EYE HEALTH?</p>
                        <br />
                        <div style={{opacity:'1'}} className='w-[385px] mx-auto h-[20px] absolute bottom-16  left-28 bg-blue-100 blur-xs'></div>
                        <div style={{border: '3px dashed #D87920'}}  className='w-full h-[50px]  rounded-2xl'></div>
                        <br />
                    </div>
                </div>
                
                <br /><br />
            </div>
        </div>
    );
};

export default BookAppointment;