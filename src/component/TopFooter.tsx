import React, { FC } from 'react';
import image from '../../public/icons/brand-icon.png';
import Image from 'next/image';
import {Facebook, Instagram, Twitter, Youtube} from 'lucide-react'
const TopFooter:FC = () => {
    return (
        <div>
          <div className='flex items-center justify-around mx-auto w-[350px] mt-8'>
            <Image src={image} alt='brand-icon'/>
            <p className='text-3xl font-semibold'>Socialize with us</p>
          </div>
          <br />
          <div className='w-[250px] flex items-center justify-around mx-auto text-blue-600'>
                <Facebook/>
                <Instagram/>
                <Twitter/>
                <Youtube/>
          </div>
          <br />
          <div className='grid grid-cols-3 w-full mx-auto border border-gray-600 '>
                <div className='border border-gray-600 p-5'>
                    <p className='font-semibold text-2xl'>Frequently Asked Questions</p>
                    <br />
                    <div className='flex'>
                        <div className='w-[30%]'>
                            <ul className="space-y-1 text-blue-600">
                                <li><a href="#">Virtual Try-on</a></li>
                                <li><a href="#">Eyeglasses</a></li>
                                <li><a href="#">Lenses</a></li>
                                <li><a href="#">Shipping</a></li>
                            </ul>
                        </div>
                        <div className='w-[50%]'>
                            <ul  className="space-y-1 text-blue-600">
                                <li><a href="#">Telemedicine</a></li>
                                <li><a href="#">Prescriptions</a></li>
                                <li><a href="#">Sunglasses</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='border border-gray-600 p-5'>
                 <p className='font-semibold text-2xl'>Frequently Asked Questions</p>
                    <br />
                    <div className='flex'>
                        <div className='w-[30%]'>
                            <ul className="space-y-1 text-blue-600">
                                 <li>📦 <a href="#">Track My Order</a></li>
                                <li>↩️ <a href="#">Return Information</a></li>
                                <li>🎁 <a href="#">Gift Card</a></li>
                            </ul>
                        </div>
                        <div className='w-[50%]'>
                            <ul  className="space-y-1 text-blue-600">
                                {/* <li><a href="#">Telemedicine</a></li>
                                <li><a href="#">Prescriptions</a></li>
                                <li><a href="#">Sunglasses</a></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='border border-gray-600 p-5'>
                 <p className='font-semibold text-2xl'>Frequently Asked Questions</p>
                    <br />
                    <div className='flex'>
                        <div className='w-full'>
                            <ul className="space-y-1 text-blue-600">
                                 <li>Connect with us over Chat and Email 24/7</li>
                                <li>💬 <a href="#" className="text-blue-600">Chat</a></li>
                                <li>📧 <a href="#" className="text-blue-600">Email</a></li>
                                <li>Speak with a Live Support 8am - 9pm every day</li>
                                <li>📞 Voice: <a href="tel:+8801854090991" className="text-blue-600">+880 1854 090                      991</a></li>
                                <li>Visit Our <a href="#" className="text-blue-600">Help Center</a> For More Information!</li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
          </div>
        </div>
    );
};

export default TopFooter;