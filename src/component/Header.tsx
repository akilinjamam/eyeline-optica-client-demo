/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, useEffect, useState, useRef } from 'react';
import { Search, ShoppingBag, X, User, Video, LogIn } from 'lucide-react';
import Image from 'next/image';
import logo_title from '../../public/icons/brand_title.png';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/app/cart/page';
import Link from 'next/link';
import { elements } from './Tab';

const Header: FC = () => {
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [animateDrawer, setAnimateDrawer] = useState<'in' | 'out'>('in');

  // 🛒 Fetch cart
  useEffect(() => {
    const getCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decoded: JwtPayload = jwtDecode(token as string);
      const userId = decoded.phoneNumber;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/get-cart-by-id/${userId}`
        );
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        setCart(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCart();
    const handleCartUpdate = () => getCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [router]);

  // 🔍 Fetch search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}search/get-items?query=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error('Failed to fetch suggestions');
        const data = await res.json();
        setSuggestions(data?.data?.slice(0, 100));
        setShowSuggestions(true);
      } catch (error) {
        console.error(error);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [query]);

  // 👆 Hide search on outside click (both mobile + desktop)
  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    // If click happened outside the searchRef
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setShowSuggestions(false);
      setShowMobileSearch(false);
    }
  };

  // Use capturing phase (3rd param = true)
  document.addEventListener('click', handleClickOutside, true);

  return () => document.removeEventListener('click', handleClickOutside, true);
}, []);

  useEffect(() => {
      const getSlotIdAndPatient = async () => {
         const appointmentData = localStorage.getItem('appointmentData');
          if (!appointmentData) return;

          const parsedData = JSON.parse(appointmentData);
          const slotId = parsedData?.slotId;

          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/get-single-slot/${slotId}`);
            const slotData = await res.json();
            console.log(slotData?.data)
            if(slotData?.data?.patient !== null){
              const newData = {...parsedData, patientId:slotData?.data?.patient?._id};
              localStorage.setItem('appointmentData', JSON.stringify(newData))
            }

          } catch (error) {
            console.log(error)
          }

      }
      getSlotIdAndPatient()
  })


  // Open Drawer
const openDrawer = () => {
  setShowMobileMenu(true);
  setAnimateDrawer('in');
};

// Close Drawer With Animation
const closeDrawer = () => {
  setAnimateDrawer('out');
  setTimeout(() => {
    setShowMobileMenu(false);
  }, 300); // match slide-out animation duration
};

  return (
    <header className="w-full px-4 sm:px-6 py-5 border-b border-gray-200 bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="flex items-center">
            {/* 🍔 Mobile Hamburger Menu */}
            <div className="sm:hidden flex items-center mr-2">
              <button
               onClick={openDrawer}
                className="text-blue-500 w-7 h-7 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu-2"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 6l16 0" />
                  <path d="M4 12l16 0" />
                  <path d="M4 18l16 0" />
                </svg>
              </button>
            </div>
           <div className='lg:w-[140px] md:w-[140px] w-[110px]'> <Image onClick={() => router.push('/')} src={logo_title} alt="Eyeline Optica" layout="responsive" /></div>
          </div>
        </div>
        


        {/* 🔍 Search Field (Desktop Only) */}
        <div
          ref={searchRef}
          className="order-3 w-full sm:order-none sm:flex-1 sm:mx-6 sm:block hidden relative"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="search by name, brand, gender, frame shape size category"
              className="w-full pl-10 pr-4 py-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowSuggestions(true)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 overflow-hidden animate-fadeIn">
              {suggestions.length > 0 ? (
                <ul className="max-h-72 overflow-y-auto">
                  {suggestions.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => {
                        setQuery('');
                        setShowSuggestions(false);
                        if (item?.category === 'Frame') router.push(`/productDetail/${item._id}`);
                        if (item?.category === 'Lens') router.push(`/lensDetail/${item._id}`);
                        if (item?.category === 'Contact Lens') router.push(`/contactLensDetail/${item._id}`);
                      }}
                      className="flex items-start justify-between px-4 py-3 cursor-pointer hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 last:border-none"
                    >
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                        {item.description && (
                          <p className="text-gray-500 text-xs line-clamp-1">{item.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-blue-600 text-sm font-semibold">৳ {item.salesPrice}</span>
                          {item.category && (
                            <span className="bg-blue-100 text-blue-600 text-[10px] font-medium px-2 py-[2px] rounded-full uppercase tracking-wide">
                              {item.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : query.trim() ? (
                <div className="px-4 py-3 text-gray-500 text-sm italic text-center">
                  No results found for “{query}”
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Search Icon */}
          <div className="sm:hidden">
            {showMobileSearch ? (
              <X
                onClick={() => setShowMobileSearch(false)}
                className="text-blue-500 w-6 h-6 cursor-pointer"
              />
            ) : (
              <Search
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMobileSearch(true);
                }}
                className="text-blue-500 w-6 h-6 cursor-pointer"
              />
            )}
          </div>

          <Link href={"/telemedicine"}>
            <button className="hidden sm:block bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition">
            BOOK APPOINTMENT
          </button>
          </Link>

          <Link href={"/profile"}><User className='text-blue-500'/></Link>
          <Link href={"/patientProfile"}><Video className='text-blue-500'/></Link>

          <div className="relative">
            <ShoppingBag
              onClick={() => router.push('/cart')}
              className="text-blue-500 w-5 h-5 cursor-pointer"
            />
            {cart?.data?.length > 0 && (
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center absolute -top-5 -right-3">
                <p className="text-white text-xs font-bold">{cart?.data?.length}</p>
              </div>
            )}
          </div>
          <LogIn
            onClick={() => router.push('/login')}
            className="text-blue-500 cursor-pointer hidden md:block lg:block"
          />
        </div>
      </div>

      {/* 🔍 Mobile Search Bar (Hidden by default) */}
      {showMobileSearch && (
        <div
          ref={searchRef}
          className="sm:hidden mt-3 px-1 transition-all duration-300 ease-in-out"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowSuggestions(true)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-64 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item._id}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-100 transition text-sm"
                    onClick={() => {
                      setQuery('');
                      setShowSuggestions(false);
                      if (item?.category === 'Frame') router.push(`/productDetail/${item._id}`);
                      if (item?.category === 'Lens') router.push(`/lensDetail/${item._id}`);
                      if (item?.category === 'Contact Lens') router.push(`/contactLensDetail/${item._id}`);
                    }}
                  >
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.description?.slice(0, 60)}...</p>
                    <p className="text-blue-600 text-xs font-semibold">৳ {item.salesPrice}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {showMobileMenu && (
      <div
        className="fixed inset-0 bg-transparent z-[999] sm:hidden"
        onClick={closeDrawer}  // clicking outside closes drawer
      >
        <div
          className={` absolute left-0 top-0 w-64 h-full bg-white shadow-lg p-5 
            ${animateDrawer === 'in' ? 'animate-slideIn' : 'animate-slideOut'}
          `}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {/* Close Button */}
          <div className="flex justify-end">
            <X onClick={closeDrawer} className="text-blue-500 w-6 h-6 cursor-pointer" />
          </div>

          {/* Menu Items */}
          <div className="mt-5 flex flex-col gap-4 h-[90%] overflow-y-scroll hide-scrollbar text-black">

            <Link
              href="/profile"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-50"
              onClick={closeDrawer}
            >
              <User className="text-blue-600" />
              <span className="font-medium">User</span>
            </Link>

            <Link
              href="/patientProfile"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-50"
              onClick={closeDrawer}
            >
              <Video className="text-blue-600" />
              <span className="font-medium">Video Consultation</span>
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-50"
              onClick={closeDrawer}
            >
              <ShoppingBag className="text-blue-600" />
              <span className="font-medium">Cart</span>
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-50"
              onClick={closeDrawer}
            >
              <User className="text-blue-600" />
              <span className="font-medium">Login</span>
            </Link>
            <hr />
             {/* 🔹 ELEMENT LIST SECTION */}
            <div className="mt-4 flex flex-col gap-3">
              {elements.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="text-gray-800 font-medium p-2 rounded hover:bg-blue-50"
                  onClick={closeDrawer}
                >
                  {item.name}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
      )}

    </header>
  );
};

export default Header;
