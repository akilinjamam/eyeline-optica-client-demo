// import {CameraIcon} from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import {  TContactLens } from '@/ts-definition/types';
import defaultImage from '../../../public/images/glass-1.png';



const ContactLensCardAuto:React.FC<TContactLens> = ({images, name, brand, salesPrice,  color, _id,badge, rating}) => {

    return (
    <div className="relative bg-white shadow-md p-4 rounded-md w-full">
       {/* 🔵 Badge (Top Middle) */}
      {badge && (
        <span className="absolute top-2 left-1/2 -translate-x-1/2 
          bg-blue-600 text-white text-xs px-3 py-[3px] rounded-md 
          font-semibold z-20 shadow">
          {badge}
        </span>
      )}

      <span className="absolute top-2 right-2 text-[10px] text-gray-500 text-center leading-3">
        {color} <br />
      </span>

      <div className=" my-6 w-full flex items-center justify-center">
        <Link href={`/contactLensDetail/${_id}`}>
          <Image
          src={images?.length && images?.length > 0 ? images?.[0] : defaultImage}
          alt={name as string}
          width={200}
          height={100}
          className="object-contain block"
        />
        </Link>
      </div>

      <p className="text-[10px] text-gray-500">{brand}</p>
      <p className="text-[11px] font-semibold text-black">{name}</p>
      <p className="text-md font-bold text-black mt-1">৳ {salesPrice}</p>

      <div className='absolute bottom-4 right-2'>
        <div className="text-xs text-gray-600 mt-2 ">
           <div className="text-xs text-gray-600 mt-2 ">
              {/* <CameraIcon className="w-8 h-8 mx-auto" /> */}
              <div className="flex items-center">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 fill-blue-500"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.168L12 18.896l-7.336 3.87 1.402-8.168L.132 9.21l8.2-1.192z" />
        </svg>
        <span className="ml-1">{rating ? rating : 4}</span>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLensCardAuto;