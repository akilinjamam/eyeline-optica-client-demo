import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const WhatsAppIconMobile = ({name}: {name:string}) => {
    // WHATSAPP SETTINGS
  const whatsappNumber = "8801854090911"; 
  const whatsappMessage = `Hello, I want to know more about ${name} `;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    return (
        <div>
             <Link
        href={whatsappUrl}
        target="_blank"
        className="lg:hidden md:hidden fixed bottom-20 right-4 z-30 bg-green-500 text-white p-3 rounded-full shadow-lg"
      >
        <MessageCircle size={28} />
      </Link>
        </div>
    );
};

export default WhatsAppIconMobile;