import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import React, { FC } from 'react';

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
            <li><a href="#">Eyeglasses</a></li>
            <li><a href="#">Sunglasses</a></li>
            <li><a href="#">Contact Lens</a></li>
            <li><a href="#">Brand</a></li>
            <li><a href="#">Accessories</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="p-5 w-full sm:w-[48%] lg:w-[15%]">
          <p className="font-semibold text-2xl text-blue-500">Services</p>
          <br />
          <ul className="space-y-2 text-white text-sm leading-6">
            <li><a href="#">Telemedicine Service</a></li>
            <li><a href="#">Book an appointment</a></li>
            <li><a href="#">OCT test at store</a></li>
            <li><a href="#">Childrens Eyecare</a></li>
            <li><a href="#">Corporate Eyecare</a></li>
          </ul>
        </div>

        {/* About */}
        <div className="p-5 w-full sm:w-[48%] lg:w-[15%]">
          <p className="font-semibold text-2xl text-blue-500">About</p>
          <br />
          <ul className="space-y-2 text-white text-sm leading-6">
            <li><a href="#">About Eyeline Optica</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center lg:justify-end w-[90%] mx-auto mt-6">
        <div className="w-[250px] flex items-center justify-around text-blue-500">
          <Facebook />
          <Instagram />
          <Twitter />
          <Youtube />
        </div>
      </div>

      <br />
      <hr className="border-gray-500 w-[90%] mx-auto" />
      <br />

      {/* Policy Links */}
      <div className="w-[90%] mx-auto">
        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <li><a href="#" className="text-blue-600">Privacy Policy</a></li>
          <li><a href="#" className="text-blue-600">Terms & Conditions</a></li>
          <li><a href="#" className="text-blue-600">Legal Policy</a></li>
          <li><a href="#" className="text-blue-600">Payment Policy</a></li>
        </ul>
      </div>

      <br />
      <p className="text-white text-center text-xs">
        COPYRIGHT 2025 EYELINE OPTICA ®, INC. ALL RIGHTS RESERVED.
      </p>
      <br />
    </div>
  );
};

export default Footer;
