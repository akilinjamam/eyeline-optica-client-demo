"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogCardProps {
    _id?:string;
    title: string;
    category: string;
    description: string;
    images: string;
}

export default function BlogCard({ title, category, description, images, _id }: BlogCardProps) {
    const router = useRouter();
    
  return (
    <motion.div
      onClick={() => router.push(`/blogDetail/${_id}`)}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div  className="overflow-hidden rounded-xl mb-4">
        <Image
          src={images[0]}
          width={500}
          height={500}
          alt={title}
          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <span className="text-sm uppercase tracking-wide text-blue-400 font-semibold bg-gray-200 px-2 py-1 rounded-xl ">
        {category}
      </span>
      <h3 className="text-xl font-bold mt-2 text-black">{title}</h3>
      <p className="text-gray-700 mt-2 line-clamp-3">{description}</p>
    </motion.div>
  );
}
