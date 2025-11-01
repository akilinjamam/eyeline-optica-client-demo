/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetail from "@/component/BlogDetail";
import {  TBlog,  TData,  } from "@/ts-definition/types";
import { notFound } from "next/navigation";

async function getSingleBlog(id: string) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}blog/get-blog-by-id/${id}`
  );

  if (!response.ok) return null;
  return response.json();
}

type ParamsPromise = Promise<{ id: string }>;

export default async function page({
  params,
}: {
  params: ParamsPromise;
}) {
  const { id } = await params;
  const blog = (await getSingleBlog(id)) as TData<TBlog>;
  
  if (!blog?.data) return notFound();
  
  const singleBlog = blog?.data as any;
  
  return <BlogDetail blog={singleBlog} />
}
