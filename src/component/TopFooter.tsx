import React, { FC } from 'react';
import image from '../../public/icons/brand-icon.png';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const TopFooter: FC = () => {
  return (
    <div className="px-4 py-8 text-black">
      {/* Brand + Title */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <Image src={image} alt="brand-icon" className="w-16" />
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold">Socialize with us</p>
      </div>

      {/* Social Icons */}
      <div className="mt-4 flex justify-center gap-6 text-blue-600 text-2xl">
        <Facebook />
        <Instagram />
        <Twitter />
        <Youtube />
      </div>

      {/* Footer Grid Sections */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-gray-300 rounded overflow-hidden">
        {/* Column 1 */}
        <div className="border border-gray-300 p-4">
          <p className="font-semibold text-lg sm:text-xl mb-3">Frequently Asked Questions</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/2">
              <ul className="space-y-1 text-blue-600 text-sm sm:text-base">
                <li><a href="#">Virtual Try-on</a></li>
                <li><a href="#">Eyeglasses</a></li>
                <li><a href="#">Lenses</a></li>
                <li><a href="#">Shipping</a></li>
              </ul>
            </div>
            <div className="sm:w-1/2">
              <ul className="space-y-1 text-blue-600 text-sm sm:text-base">
                <li><a href="#">Telemedicine</a></li>
                <li><a href="#">Prescriptions</a></li>
                <li><a href="#">Sunglasses</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="border border-gray-300 p-4">
          <p className="font-semibold text-lg sm:text-xl mb-3">Order & Returns</p>
          <div>
            <ul className="space-y-1 text-blue-600 text-sm sm:text-base">
              <li>📦 <a href="#">Track My Order</a></li>
              <li>↩️ <a href="#">Return Information</a></li>
              <li>🎁 <a href="#">Gift Card</a></li>
            </ul>
          </div>
        </div>

        {/* Column 3 */}
        <div className="border border-gray-300 p-4">
          <p className="font-semibold text-lg sm:text-xl mb-3">Customer Support</p>
          <ul className="space-y-1 text-blue-600 text-sm sm:text-base">
            <li>Connect with us over Chat and Email 24/7</li>
            <li>💬 <a href="#">Chat</a></li>
            <li>📧 <a href="#">Email</a></li>
            <li>Speak with a Live Support 8am - 9pm every day</li>
            <li>📞 Voice: <a href="tel:+8801854090991">+880 1854 090 991</a></li>
            <li>Visit Our <a href="#">Help Center</a> For More Information!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopFooter;
