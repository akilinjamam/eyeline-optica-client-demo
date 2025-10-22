/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, useEffect, useState, useRef } from 'react';
import { Search, Star, ShoppingBag, LogIn } from 'lucide-react';
import Image from 'next/image';
import logo from '../../public/images/brand_logo.png';
import profile from '../../public/images/lense-4.png';
import logo_title from '../../public/icons/brand_title.png';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/app/cart/page';

const Header: FC = () => {
  const router = useRouter();

  const [cart, setCart] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      const decoded: JwtPayload = jwtDecode(token as string);
      const userId = decoded.phoneNumber;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/get-cart-by-id/${userId}`
        );

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        setCart(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCart();

    const handleCartUpdate = () => getCart();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [router]);

  // 🔍 Fetch suggestions as user types
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

        if (!res.ok) throw new Error("Failed to fetch suggestions");

        const data = await res.json();
        setSuggestions(data?.data?.slice(0, 100)); // limit to 6 suggestions
        setShowSuggestions(true);
      } catch (error) {
        console.error(error);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300); // debounce for 300ms
    return () => clearTimeout(delay);
  }, [query]);

  // Hide suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="w-full px-4 sm:px-6 py-2 border-b border-gray-200 bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push('/')}>
          <Image src={logo} alt="Eyeline Optica" width={32} height={32} />
          <div className="w-[140px] sm:w-[180px]">
            <Image src={logo_title} alt="Eyeline Optica" layout="responsive" />
          </div>
        </div>

        {/* Search Field (Desktop) */}
        <div ref={searchRef} className="order-3 w-full sm:order-none sm:flex-1 sm:mx-6 sm:block hidden relative">
          <div className="relative">
            <input
              type="text"
              placeholder="search by name, brand, gender, frame shape size category"
              className="w-full pl-10 pr-4 py-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        if(item?.category === 'Frame'){
                          router.push(`/productDetail/${item._id}`);
                        }
                        if(item?.category === 'Lens'){
                          router.push(`/lensDetail/${item._id}`);
                        }
                        if(item?.category === 'Contact Lens'){
                          router.push(`/contactLensDetail/${item._id}`);
                        }

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
            className="text-blue-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Search Field */}
      <div className="sm:hidden mt-3 px-1" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    router.push(`/product/${item._id}`);
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
    </header>
  );
};

export default Header;
