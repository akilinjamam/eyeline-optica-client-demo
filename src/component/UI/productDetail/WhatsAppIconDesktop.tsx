import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const WhatsAppIconDesktop = ({name}: {name:string}) => {
      // WHATSAPP SETTINGS
  const whatsappNumber = "8801854090911"; 
  const whatsappMessage = `Hello, I want to know more about ${name} `;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    return (
        <div>
            {/* WHATSAPP BUTTON — DESKTOP + TABLET */}
      <div className="hidden lg:flex md:flex justify-center mt-3">
        <Link
          href={whatsappUrl}
          target="_blank"
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow"
        >
          <MessageCircle /> Chat on WhatsApp
        </Link>
      </div>
        </div>
    );
};

export default WhatsAppIconDesktop;