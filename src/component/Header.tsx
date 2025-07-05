'use client';

import { FC } from 'react';
import { Search, Star, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import logo from '../../public/images/brand_logo.png';
import profile from '../../public/images/demo-profile-img.png';
import logo_title from '../../public/icons/brand_title.png';

const Header: FC = () => {
  return (
    <header className="w-full px-6 py-1 border-b-3 border-gray-200  ">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Eyeline Optica" width={32} height={32} />
          <h1 className="text-xl font-semibold">
            <Image src={logo_title} alt="Eyeline Optica" width={200} height={200} />
          </h1>
        </div>

        {/* Search */}
        <div className="flex-1 mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full pl-10 pr-4 py-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
          </div>
        </div>

        {/* CTA and Icons */}
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition">
            BOOK APPOINTMENT
          </button>

          <Image
            src={profile}
            alt="User"
            width={32}
            height={32}
            className="rounded-full border border-blue-500"
          />

          <Star className="text-blue-500 w-5 h-5" />
          <ShoppingBag className="text-blue-500 w-5 h-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
