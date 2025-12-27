/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {  useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { TBlog } from "@/ts-definition/types";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";


export default function BlogPage({allBlog, page, totalPage, allCategories}: {allBlog:TBlog[], page:number, totalPage:number, allCategories:TBlog[]}) {
  
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
  
  const handleCategory = (value:string) => {
    const params = new URLSearchParams(searchParams);
    if(value === "All"){
      params.delete("category")
    }else{
      params.set("category", value);
    }
    router.push(`?${params.toString()}`);
  }

  const blogCategory = [...new Set(allCategories.map((item:TBlog) => item.category))];
  const allBlogCategory = ["All", ...blogCategory] 

  return (
    <div className="min-h-screen  px-6 py-12 text-black bg-slate-50">
      <motion.h1
        className="text-center text-4xl md:text-5xl font-extrabold mb-8 text-cyan-300 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Patient Care
      </motion.h1>

      <div className="max-w-3xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search blogs by title, category or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/10 border border-gray-500 text-black placeholder-gray-400 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
      </div>
      {/* search from category */}
      <div className="flex items-center max-w-3xl mx-auto">
        {
          allBlogCategory?.map((item:string, index:number) => <p className="bg-gray-500 rounded-full px-3 py-1 ml-3 cursor-pointer text-white" key={index} onClick={() => handleCategory(item)}>{item}</p> )
        }
      </div>
      <br />

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
