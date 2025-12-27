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
         <div className="min-h-screen bg-slate-50 text-white px-6 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => router.back()}
          className="mb-6 px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 transition-all"
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-500">
            {blog?.title}
          </h1>
          <div className="text-sm text-gray-400">
            <span className="uppercase">{blog.category}</span> •{" "}
            {new Date(blog?.createdAt).toLocaleDateString()}
          </div>
          <p dangerouslySetInnerHTML={{__html:blog?.description}} className="text-black leading-relaxed mt-6 whitespace-pre-line">
          </p>
        </div>
      </motion.div>
    </div>
    );
};

export default BlogDetail;