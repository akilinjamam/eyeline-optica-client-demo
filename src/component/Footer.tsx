import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import paymentBanner from "../../public/paymentBanner/Payment Banner 3.png";

const Footer: FC = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/images/footer-banner.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="bg-black mt-8"
    >
      <br />
      <div className="flex flex-col lg:flex-row flex-wrap items-start w-[90%] mx-auto gap-6">
        {/* Who We Are */}
        <div className="p-5 w-full lg:w-[60%]">
          <p className="font-semibold text-2xl text-blue-500">Who we are</p>
          <br />
          <p className="text-white text-sm leading-relaxed">
            Eyeline Optica – Redefining Eyewear in Bangladesh! Born in 2024,
            Eyeline Optica is one of the most talked-about eyewear start-ups,
            dedicated to delivering a Top-notch experience to our customers.
            We believe that you deserve premium eyeglasses paired with
            top-branded lenses—all at the right price. As your one-stop
            online destination for eyewear and accessories, we bring style,
            comfort, and convenience straight to your doorstep, with flexible
            payment options. From trendy eyeglasses and statement sunglasses
            to a stunning selection of colorful contact lenses, we’ve got
            something for everyone—whether you are looking for everyday
            elegance or a bold new look. Shop now and see the world with
            clarity, confidence, and style!
          </p>
        </div>

        {/* Pages */}
        <div className="p-5 w-full sm:w-[48%] lg:w-[15%]">
          <p className="font-semibold text-2xl text-blue-500">Pages</p>
          <br />
          <ul className="space-y-2 text-white text-sm">
            <li><Link href="/allglasses" >Eyeglasses</Link></li>
            <li><Link href="/allglasses/sunglasses" >Sunglasses</Link></li>
            <li><Link href="/allContactLens" >Contact Lens</Link></li>
            <li><Link href="/allglasses/brand" >Brand</Link></li>
            <li><Link href="/allAccessories" >Accessory</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="p-5 w-full sm:w-[48%] lg:w-[15%]">
          <p className="font-semibold text-2xl text-blue-500">Services</p>
          <br />
          <ul className="space-y-2 text-white text-sm leading-6">
            <li><Link href="/telemedicine" >Telemedicine Service</Link></li>
            {/* <li><a href="#">Book an appointment</a></li> */}
            {/* <li><a href="#">OCT test at store</a></li>
            <li><a href="#">Childrens Eyecare</a></li>
            <li><a href="#">Corporate Eyecare</a></li> */}
          </ul>
        </div>

        {/* About */}
        <div className="p-5 w-full sm:w-[48%] lg:w-[15%]">
          <p className="font-semibold text-2xl text-blue-500">About</p>
          <br />
          <ul className="space-y-2 text-white text-sm leading-6">
            <Link href={"/about"}><li>About Eyeline Optica</li></Link>
            <li><a href="#">Help Center: +880 1854 090 991</a></li>
            <li><a href="#">Trade license No: TRAD/CHTG/001180/2025</a></li>
          </ul>
        </div>
        {/* Payment Banner */}
        <div className="p-5 w-full sm:w-[100%] lg:w-[100%]">
          <Image  src={paymentBanner} alt='payment-banner'/>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center lg:justify-end w-[90%] mx-auto mt-6">
        <div className="w-[250px] flex items-center justify-around text-blue-500">
          <Link href={"https://www.facebook.com/share/15h5Ueymyq"}><Facebook /></Link>
          <Link href={"https://www.instagram.com/eyelineoptica?igsh=MXZ6azBvcnF6bDYzZA=="}><Instagram /></Link>
          <Link href={"https://www.x.com/Eyeline_Optica?t=J46Qn7_g7ACv_HoEovxrXQ&s=09"}> <Twitter /></Link>
          <Link href={"https://www.youtube.com/@EYELINEOPTICA"}> <Youtube /></Link>
        </div>
      </div>

      <br />
      <hr className="border-gray-500 w-[90%] mx-auto" />
      <br />

      {/* Policy Links */}
      <div className="w-[90%] mx-auto">
        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <li className='text-blue-600'><Link href="/privacy-policy" >Pricacy Policy</Link></li>
          <li className='text-blue-600'><Link href="/terms-and-conditions" >Terms & Condition</Link></li>
          <li className='text-blue-600'><Link href="/privacy-policy" >Legal Policy</Link></li>
          <li className='text-blue-600'><Link href="/return-and-refund-policy" >Payment Policy</Link></li>
        
        </ul>
      </div>

      <br />
      <p className="text-white text-center text-xs mb-2">
        COPYRIGHT 2025 EYELINE OPTICA ®, INC. ALL RIGHTS RESERVED.
      </p>
      <p className="text-yellow-200 text-center text-xs">
        DEVELOPED BY BYTE DYNAMO.
      </p>
      <br />
    </div>
  );
};

export default Footer;
