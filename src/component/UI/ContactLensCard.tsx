// import {CameraIcon} from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import {  TContactLens } from '@/ts-definition/types';
import defaultImage from '../../../public/images/glass-1.png';



const ContactLensCard:React.FC<TContactLens> = ({images, name, brand, salesPrice,  color, _id}) => {

    return (
    <div className="relative bg-white shadow-md p-4 rounded-md w-[180px]">
      {/* {badge && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-[2px] rounded-sm font-semibold">
          {badge}
        </span>
      )} */}

      <span className="absolute top-2 right-2 text-[10px] text-gray-500 text-center leading-3">
        {color} <br />
      </span>

      <div className=" mb-3 w-full flex items-center justify-center">
        <Link href={`/contactLensDetail/${_id}`}>
          <Image
          src={images?.length && images?.length > 0 ? images?.[0] : defaultImage}
          alt={name as string}
          width={120}
          height={60}
          className="object-contain block"
        />
        </Link>
      </div>

      <p className="text-[10px] text-gray-500">{brand}</p>
      <p className="text-[11px] font-semibold">{name}</p>
      <p className="text-md font-bold text-red-600 mt-1">৳ {salesPrice}</p>

    </div>
  );
};

export default ContactLensCard;