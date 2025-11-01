/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {  useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { TBlog } from "@/ts-definition/types";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";


export default function BlogPage({allBlog, page, totalPage}: {allBlog:TBlog[], page:number, totalPage:number}) {
  
  const [search, setSearch] = useState("");
  console.log(page, totalPage)
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if(search) params.set("searchTerm", search);
    router.push(`?${params.toString()}`);

  },[search, router])
  const searchParams = useSearchParams();
  const handleNextPage = (value:any) => {
    const params = new URLSearchParams(searchParams);
    if(page <= totalPage){
        params.set("page", String(value));
        router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b] px-6 py-12 text-white">
      <motion.h1
        className="text-center text-4xl md:text-5xl font-extrabold mb-8 text-cyan-300 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Eyeline Optica Blog
      </motion.h1>

      <div className="max-w-3xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search blogs by title, category or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        
        {allBlog.length > 0 ? (
          allBlog.map((blog) => (
            <BlogCard key={blog._id} {...blog} />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">No blogs found.</p>
        )}
        
      </motion.div>
      {/* Pagination Component */}
    <div className="flex justify-center mt-6">
        <Pagination
        currentPage={page}
        totalPage={totalPage}
        onPageChange={handleNextPage}
        />
    </div>
    </div>
  );
}
