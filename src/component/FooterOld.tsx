import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import React, { FC } from 'react';
const Footer:FC = () => {
    return (
        <div style={{ backgroundImage: "url('/images/footer-banner.png')", backgroundSize:'cover', backgroundPosition:'center', height:'100%' }} className='bg-black mt-8'>
          <br />
          <div className='flex items-start w-[90%] mx-auto  '>
                <div className=' p-5 w-[60%]'>
                    <p className='font-semibold text-2xl text-blue-500'>Who we are</p>
                    <br />
                    <div className='flex'>
                        <div className='w-full'>
                            <p className='text-white'>
                                Eyeline Optica – Redefining Eyewear in Bangladesh!
                                Born in 2024, Eyeline Optica is one of the most talked-about eyewear start-ups, dedicated to delivering a Top-notch experience to our customers. We believe that you deserve premium eyeglasses paired with top-branded lenses—all at the right price.
                                As your one-stop online destination for eyewear and accessories, we bring style, comfort, and convenience straight to your doorstep, with flexible payment options.
                                From trendy eyeglasses and statement sunglasses to a stunning selection of colorful contact lenses, we’ve got something for everyone—whether you are looking for everyday elegance or a bold new look.
                                Shop now and see the world with clarity, confidence, and style!
                            </p>
                        </div>
                        
                    </div>
                </div>
                <div className=' p-5 w-[20%]'>
                <br />
                <br />
                 <p className='font-semibold text-2xl  text-blue-500'>Pages</p>
                 <br />
                    <div className='flex'>
                        <div className='w-[30%]'>
                            <ul className="space-y-1 text-white">
                                <li> <a href="#">Eyeglasses</a></li>
                                <li> <a href="#">Sunglasses</a></li>
                                <li><a href="#">Contact Lense</a></li>
                                <li><a href="#">Brand</a></li>
                                <li><a href="#">Accessories</a></li>
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
                <div className=' p-5 w-[20%]'>
                <br />
                <br />
                 <p className='font-semibold text-2xl  text-blue-500'>Services</p>
                 <br />
                    <div className='flex'>
                        <div className='w-full'>
                            <ul className="space-y-1 text-white leading-8">
                                <li> <a href="#">Telemedicine Service</a></li>
                                <li> <a href="#">Book an appointment</a></li>
                                <li><a href="#">OCT test at store</a></li>
                                <li><a href="#">Childrens Eyecare</a></li>
                                <li><a href="#">Corporate Eyecare</a></li>
                                
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
                <div className=' p-5 w-[20%]'>
                <br />
                <br />
                 <p className='font-semibold text-2xl  text-blue-500'>About</p>
                 <br />
                    <div className='flex'>
                        <div className='w-full'>
                            <ul className="space-y-1 text-white leading-8">
                                <li> <a href="#">About Eyeline Optica</a></li>
                                <li> <a href="#">Contact Us</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Help Center</a></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
          </div>
          <div className='flex items-center justify-end w-[90%]  mx-auto'>
                <div className='w-[250px] flex items-center justify-around text-blue-500'>
                    <Facebook/>
                    <Instagram/>
                    <Twitter/>
                    <Youtube/>
                </div>
          </div>
          <br />
          <hr className='text-gray-400 w-[90%] mx-auto' />
          <br />
          <div className=' w-[90%] mx-auto ' >
                <ul className='flex items-center justify-around'>
                     <li><a href="#" className="text-blue-600">Privacy Policy</a></li>
                     <li><a href="#" className="text-blue-600">Terms & Conditions</a></li>
                     <li><a href="#" className="text-blue-600">Legal Policy</a></li>
                     <li><a href="#" className="text-blue-600">Payment Policy</a></li>
                </ul>
          </div>
          <br />
          <p className='text-white text-center text-xs'>COPYRIGHT 2025 EYELINE OPTICA ®, INC. ALL RIGHTS RESERVED.</p>
          <br />
        </div>
    );
};

export default Footer;