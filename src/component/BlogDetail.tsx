"use client"
import React from 'react';
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TBlog } from '@/ts-definition/types';
const BlogDetail = ({blog}: {blog:TBlog}) => {
    const router = useRouter();
    console.log(blog?.images[0])
    return (
         <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b] text-white px-6 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => router.back()}
          className="mb-6 px-5 py-2 rounded-lg bg-white/10 border border-white/20 text-cyan-300 hover:bg-white/20 transition-all"
        >
          ← Back
        </button>

        <div className="overflow-hidden rounded-2xl shadow-2xl mb-8">
          <Image
            src={blog?.images[0]}
            width={300}
            height={300}
            alt={blog?.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-300">
            {blog?.title}
          </h1>
          <div className="text-sm text-gray-400">
            <span className="uppercase">{blog.category}</span> •{" "}
            {new Date(blog?.createdAt).toLocaleDateString()}
          </div>
          <p dangerouslySetInnerHTML={{__html:blog?.description}} className="text-gray-200 leading-relaxed mt-6 whitespace-pre-line">
          </p>
        </div>
      </motion.div>
    </div>
    );
};

export default BlogDetail;