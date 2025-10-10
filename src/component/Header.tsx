/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, useEffect, useState } from 'react';
import { Search, Star, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import logo from '../../public/images/brand_logo.png';
import profile from '../../public/images/lense-4.png';
import logo_title from '../../public/icons/brand_title.png';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/app/cart/page';

const Header: FC = () => {
  const navigate = useRouter();

  const [cart, setCart] = useState<any>(null);

    const router = useRouter();
    useEffect(() => {
      const getCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
           router.push("/");
           return
        }
  
        // Decode JWT token
        const decoded: JwtPayload = jwtDecode(token as string);
        const userId = decoded.phoneNumber;
  
        // Fetch the cart
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/get-cart-by-id/${userId}`,);
  
          if (!res.ok) throw new Error("Failed to fetch cart");
  
          const data = await res.json();
          setCart(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      getCart();

      // Listen for "cartUpdated" event
  const handleCartUpdate = () => getCart();
  window.addEventListener("cartUpdated", handleCartUpdate);

  return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, [router]);
  return (
    <header className="w-full px-4 sm:px-6 py-2 border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
      
        <div className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate.push('/')}
        >
          <Image src={logo} alt="Eyeline Optica" width={32} height={32} />
          <div className="w-[140px] sm:w-[180px]">
            <Image src={logo_title} alt="Eyeline Optica" layout="responsive" />
          </div>
        </div>

     
        <div className="order-3 w-full sm:order-none sm:flex-1 sm:mx-6 sm:block hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full pl-10 pr-4 py-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
          </div>
        </div>

        
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="hidden sm:block bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition">
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
          <div className='relative'>
            <ShoppingBag onClick={() => navigate.push('/cart')} className="text-blue-500 w-5 h-5 cursor-pointer"  />
            {
              cart?.data?.length > 0
              &&
              <div  className='w-5 h-5 rounded-full bg-red-500 flex items-center justify-center absolute -top-5 -right-3'>
                <p className='text-white text-xs font-bold'>{cart?.data?.length}</p>
            </div>
            }
          </div>
        </div>
      </div>

    
      <div className="sm:hidden mt-3 px-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
        </div>
      </div>
    </header>
  );
};

export default Header;
